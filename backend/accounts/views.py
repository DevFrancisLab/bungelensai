from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def set_refresh_cookie(response: Response, refresh_token: str):
    # Set HttpOnly secure cookie for refresh token. Secure flag enabled when not in DEBUG.
    secure = not settings.DEBUG
    # Set cookie for 14 days (match your SimpleJWT refresh lifetime if desired)
    max_age = 14 * 24 * 60 * 60
    response.set_cookie(
        key='refreshToken',
        value=refresh_token,
        httponly=True,
        secure=secure,
        samesite='Lax',
        max_age=max_age,
        path='/',
    )


def clear_refresh_cookie(response: Response):
    response.delete_cookie('refreshToken', path='/')


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        tokens = get_tokens_for_user(user)
        user_data = UserSerializer(user).data

        resp = Response({'user': user_data, 'access': tokens['access']}, status=status.HTTP_201_CREATED)
        set_refresh_cookie(resp, tokens['refresh'])
        return resp


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        # Pass request in context to support authentication backends that expect it
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            # Log serializer errors to help debugging in development
            try:
                import logging
                logging.getLogger('django.request').warning('Login serializer errors: %s', serializer.errors)
            except Exception:
                print('Login serializer errors:', serializer.errors)
            serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        tokens = get_tokens_for_user(user)
        resp = Response({'access': tokens['access']}, status=status.HTTP_200_OK)
        set_refresh_cookie(resp, tokens['refresh'])
        return resp


class RefreshView(APIView):
    """Refresh access token using HttpOnly refresh cookie."""
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refreshToken')
        if not refresh_token:
            return Response({'detail': 'No refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            token = RefreshToken(refresh_token)
            user_id = token.payload.get('user_id')
            user = User.objects.get(pk=user_id)
        except Exception:
            return Response({'detail': 'Invalid refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Optionally rotate refresh token: issue new refresh + access
        tokens = get_tokens_for_user(user)
        resp = Response({'access': tokens['access']}, status=status.HTTP_200_OK)
        set_refresh_cookie(resp, tokens['refresh'])
        return resp


class LogoutView(APIView):
    """Log out by clearing the refresh cookie."""
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        resp = Response({'detail': 'Logged out'}, status=status.HTTP_200_OK)
        clear_refresh_cookie(resp)
        return resp



class ProfileView(APIView):
    """Return the authenticated user's basic profile."""
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

