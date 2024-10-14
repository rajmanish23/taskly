import datetime

from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Task, Tag
from .serializers import (
    # UserSerializer,
    # ChangePasswordSerializer,
    TaskSerializer,
    TagSerializer,
    SubTaskSerializer,
)


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            # .save() creates the object from the JSON data
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class TaskRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)


class TaskTodayListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        date = self.request.query_params.get("date")
        if date is None:
            return Task.objects.none()
        start_datetime = datetime.datetime.strptime(
            (date + "T00:00:00"), "%Y-%m-%dT%H:%M:%S"
        )
        end_datetime = datetime.datetime.strptime(
            (date + "T23:59:59"), "%Y-%m-%dT%H:%M:%S"
        )
        user = self.request.user
        queryset = Task.objects.filter(author=user) & Task.objects.filter(
            due_at__range=(start_datetime, end_datetime)
        )
        return queryset


class TaskUpcomingListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        date = self.request.query_params.get("date")
        if date is None:
            return Task.objects.none()
        filter_datetime = datetime.datetime.strptime(
            (date + "T23:59:59"), "%Y-%m-%dT%H:%M:%S"
        )
        user = self.request.user
        queryset = Task.objects.filter(author=user) & Task.objects.filter(
            due_at__gt=filter_datetime
        )
        return queryset


class TagListCreateView(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tag.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            # .save() creates the object from the JSON data
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class TagRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tag.objects.filter(author=user)


