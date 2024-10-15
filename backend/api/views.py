import datetime

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Task, Tag, SubTask
from .serializers import (
    TaskSerializer,
    TagSerializer,
    SubTaskSerializer,
    AddTagSerializer
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


class SubTaskListCreateView(generics.ListCreateAPIView):
    serializer_class = SubTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        kwargs = self.request.parser_context.get("kwargs")
        p_task = kwargs["p_task"]
        return SubTask.objects.filter(parent_task=p_task)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        kwargs = self.request.parser_context.get("kwargs")
        p_task = kwargs["p_task"]
        task = None
        try:
            task = Task.objects.get(id=p_task)
        except:
            return Response(
                {"detail": "Task not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        self.perform_create(serializer, task)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer, task):
        if serializer.is_valid():
            serializer.save(parent_task=task)
        else:
            print(serializer.errors)


class SubTaskRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SubTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        kwargs = self.request.parser_context.get("kwargs")
        p_task = kwargs["p_task"]
        return SubTask.objects.filter(parent_task=p_task)


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


class AddTagsToTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, task_id):
        serializer = AddTagSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        print(serializer.data)
        tag_ids = serializer.data.get("tag_ids")
        task = None
        tags = []
        try:
            task = Task.objects.get(id=task_id)
        except:
            return Response(
                {"detail": "Task not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        for tag_id in tag_ids:
            tagObj = Tag.objects.get(id=tag_id)
            tags.append(tagObj)
        task.tags.set(tags)
        return Response(status=status.HTTP_204_NO_CONTENT)
