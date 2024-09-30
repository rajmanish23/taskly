from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.views import CreateUserView, GetUserView

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/user/register/", CreateUserView.as_view(), name="Register"
    ),  # URL for registering user
    path(
        "api/user/get/<int:pk>/", GetUserView.as_view(), name="Get User"
    ),  # URL for getting user details
    # Below URLs are for SimpleJWT so it can generate tokens and refresh tokens
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "api-auth/", include("rest_framework.urls", namespace="rest_framework")
    ),  # this enables auth stuff in the rest_framework ig
]

