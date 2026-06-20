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
            # `authenticate` expects credentials with the USERNAME_FIELD as `username` kwarg
            user = authenticate(username=email, password=password)
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
