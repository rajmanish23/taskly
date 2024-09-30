from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.


# This declared the CREATE API
class CreateUserView(generics.CreateAPIView):
  # gives list of all users in the database to check if new user already exists
  queryset = User.objects.all() 

  serializer_class = UserSerializer

  # allows anyone to use this API since we want anyone to create an account
  permission_classes = [AllowAny] 


# This is for GET API
class GetUserView(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]