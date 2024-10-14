from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# from api.views import CreateUserView, GetUserView, UpdatePasswordView, UpdateUserView

# urlpatterns = [
#     # URL for registering user
#     path("api/user/register/", CreateUserView.as_view(), name="register"),
#     # URL for getting user details
#     path("api/user/get/", GetUserView.as_view(), name="get-user"),
#     path("api/user/update/", UpdateUserView.as_view(), name="update-user"),
#     # URL for changing password
#     path(
#         "api/user/change-password/",
#         UpdatePasswordView.as_view(),
#         name="Change-password",
#     ),
# ]
