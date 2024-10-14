from django.urls import path

from .views import CreateUserView, GetUserView, UpdatePasswordView, UpdateUserView

urlpatterns = [
    # URL for registering user
    path("register/", CreateUserView.as_view(), name="register"),
    # URL for getting user details
    path("get/", GetUserView.as_view(), name="get-user"),
    path("update-email/", UpdateUserView.as_view(), name="update-user"),
    # URL for changing password
    path(
        "change-password/",
        UpdatePasswordView.as_view(),
        name="Change-password",
    ),
]
