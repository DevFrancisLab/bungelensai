from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """Minimal serializer for registering a new user.

    - `email` is required and must be unique.
    - `password` is write-only and will be hashed via `create_user`.
    """
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('email', 'password')

    def validate_email(self, value):
        # normalize and ensure uniqueness (case-insensitive)
        email = value.lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError('A user with that email already exists.')
        return email

    def create(self, validated_data):
        # Use the custom manager to create and hash password correctly
        return User.objects.create_user(email=validated_data['email'], password=validated_data['password'])


class LoginSerializer(serializers.Serializer):
    """Serializer for user login. Returns/validates credentials only."""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            # Try authenticating robustly:
            # 1) Prefer passing `request` if available (some backends need it)
            # 2) Try authenticating using both `username=` and the user model's USERNAME_FIELD as kwargs
            request = None
            try:
                request = self.context.get('request') if hasattr(self, 'context') else None
            except Exception:
                request = None

            user = None
            # First attempt: pass username= (works with ModelBackend and USERNAME_FIELD)
            try:
                if request is not None:
                    user = authenticate(request=request, username=email, password=password)
                else:
                    user = authenticate(username=email, password=password)
            except Exception:
                user = None

            # Second attempt: pass the USERNAME_FIELD explicitly (e.g., email=...)
            if not user:
                UserModel = get_user_model()
                username_field = getattr(UserModel, 'USERNAME_FIELD', 'username')
                try:
                    auth_kwargs = {username_field: email, 'password': password}
                    if request is not None:
                        user = authenticate(request=request, **auth_kwargs)
                    else:
                        user = authenticate(**auth_kwargs)
                except Exception:
                    user = None
            if not user:
                raise serializers.ValidationError('Unable to log in with provided credentials.', code='authorization')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.', code='authorization')
            attrs['user'] = user
            return attrs
        raise serializers.ValidationError('Must include "email" and "password".')


class UserSerializer(serializers.ModelSerializer):
    """Simple read-only serializer for the user object."""

    class Meta:
        model = User
        fields = ('id', 'email')
        read_only_fields = ('id', 'email')
