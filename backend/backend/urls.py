from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.views import CreateUserView, GetUserView, UpdatePasswordView

urlpatterns = [
    path("admin/", admin.site.urls),
    # URL for registering user
    path("api/user/register/", CreateUserView.as_view(), name="Register"),
    # URL for getting user details
    path("api/user/get/", GetUserView.as_view(), name="Get User"),
    # URL for changing password
    path(
        "api/user/change-password/",
        UpdatePasswordView.as_view(),
        name="Change-password",
    ),
    # Below URLs are for SimpleJWT so it can generate tokens and refresh tokens
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # this enables auth stuff in the rest_framework ig
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/", include("api.urls")),
]
