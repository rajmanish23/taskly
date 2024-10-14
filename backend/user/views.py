from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import User
from .serializers import (
    UserSerializer,
    ChangePasswordSerializer,
    UpdateEmailSerializer,
    UpdateNameSerializer
)


# This declared the CREATE API for USER
class CreateUserView(generics.CreateAPIView):
    # gives list of all users in the database to check if new user already exists
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # allows anyone to use this API since we want anyone to create an account
    permission_classes = [AllowAny]


# This is for GET API for USER
class GetUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        email = request.user.get_email()
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset.get(email=email))
        return Response(serializer.data)


# Change password for USER
class UpdatePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user_obj = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            if not user_obj.check_password(old_password):
                return Response(
                    {"old password": "Wrong password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user_obj.set_password(serializer.data.get("new_password"))
            user_obj.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UpdateEmailSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.data.get("password")
            if not user.check_password(password):
                return Response(
                    {"password": "Wrong password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            new_email = serializer.data.get("new_email")
            user.email = new_email
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateNameView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UpdateNameSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.data.get("password")
            if not user.check_password(password):
                return Response(
                    {"password": "Wrong password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            first_name = serializer.data.get("first_name")
            last_name = serializer.data.get("last_name")
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
