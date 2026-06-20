from django.urls import path
from .views import RegisterView, LoginView, ProfileView, RefreshView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth-register'),
    path('login/', LoginView.as_view(), name='auth-login'),
    # Custom refresh view that reads HttpOnly cookie
    path('token/refresh/', RefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='auth-logout'),
    path('profile/', ProfileView.as_view(), name='auth-profile'),
]
