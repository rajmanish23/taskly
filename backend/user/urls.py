from django.urls import path

from .views import (
    CreateUserView,
    GetUserView,
    UpdatePasswordView,
    UpdateUserView,
    UpdateNameView,
    DeleteUserView,
)

urlpatterns = [
    # URL for registering user
    path("register/", CreateUserView.as_view(), name="register"),
    # URL for getting user details
    path("get/", GetUserView.as_view(), name="get-user"),
    path("update-email/", UpdateUserView.as_view(), name="update-email"),
    # URL for changing name
    path("update-name/", UpdateNameView.as_view(), name="update-name"),
    # URL for changing password
    path(
        "change-password/",
        UpdatePasswordView.as_view(),
        name="Change-password",
    ),
    # URL for deleting user
    path("delete/", DeleteUserView.as_view(), name="delete-user"),
]
