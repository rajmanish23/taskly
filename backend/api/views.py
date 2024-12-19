import datetime

from django.utils.timezone import make_aware
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from sqids import Sqids
import os
from dotenv import load_dotenv

from .models import Task, Tag, SubTask
from .serializers import (
    TagWithTaskListSerializer,
    TaskSerializer,
    TagListSerializer,
    SubTaskSerializer,
    AddTagSerializer,
)

load_dotenv()
sqids = Sqids(
    min_length=16,
    alphabet=os.getenv("SQIDS_ALPHABET"),
    blocklist=os.getenv("SQIDS_BLOCKLIST"),
)


class PingerView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(status=status.HTTP_204_NO_CONTENT)


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

    def get_object(self):
        s_id = self.kwargs["pk"]
        self.kwargs["pk"] = sqids.decode(s_id)[0]
        return super().get_object()


class TaskMarkDelete(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        task_id = sqids.decode(pk)[0]
        task = None
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response(
                {"detail": "Task not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if task.deleted_at is not None:
            return Response(
                {"detail": "Task is already marked as deleted"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        task.deleted_at = make_aware(datetime.datetime.now())
        task.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskMarkComplete(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        task_id = sqids.decode(pk)[0]
        task = None
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response(
                {"detail": "Task not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if task.completed_at is not None:
            return Response(
                {"detail": "Task is already marked as completed"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        task.completed_at = make_aware(datetime.datetime.now())
        task.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class SubTaskListCreateView(generics.ListCreateAPIView):
    serializer_class = SubTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        s_p_task = self.kwargs["p_task"]
        p_task = sqids.decode(s_p_task)[0]
        return SubTask.objects.filter(parent_task=p_task)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        s_p_task = self.kwargs["p_task"]
        p_task = sqids.decode(s_p_task)[0]
        task = None
        try:
            task = Task.objects.get(id=p_task)
        except Task.DoesNotExist:
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
        s_p_task = self.kwargs["p_task"]
        p_task = sqids.decode(s_p_task)[0]
        return SubTask.objects.filter(parent_task=p_task)

    def get_object(self):
        s_id = self.kwargs["pk"]
        self.kwargs["pk"] = sqids.decode(s_id)[0]
        return super().get_object()


class SubTaskMarkComplete(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, p_task, pk):
        sub_task_id = sqids.decode(pk)[0]
        sub_task = None
        try:
            sub_task = SubTask.objects.get(id=sub_task_id)
        except SubTask.DoesNotExist:
            return Response(
                {"detail": "Sub Task not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if sub_task.completed_at is not None:
            return Response(
                {"detail": "Sub Task is already marked as deleted"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        sub_task.completed_at = make_aware(datetime.datetime.now())
        sub_task.save()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )


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
        start_datetime = make_aware(start_datetime)
        end_datetime = make_aware(end_datetime)
        user = self.request.user
        queryset = Task.objects.filter(
            author=user,
            due_at__range=(start_datetime, end_datetime),
            deleted_at__isnull=True,
            completed_at__isnull=True,
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
        filter_datetime = make_aware(filter_datetime)
        user = self.request.user
        queryset = Task.objects.filter(
            author=user,
            due_at__gt=filter_datetime,
            deleted_at__isnull=True,
            completed_at__isnull=True,
        )
        return queryset


class TaskPreviousListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        date = self.request.query_params.get("date")
        if date is None:
            return Task.objects.none()
        filter_datetime = datetime.datetime.strptime(
            (date + "T00:00:00"), "%Y-%m-%dT%H:%M:%S"
        )
        filter_datetime = make_aware(filter_datetime)
        user = self.request.user
        queryset = Task.objects.filter(
            author=user,
            due_at__lt=filter_datetime,
            deleted_at__isnull=True,
            completed_at__isnull=True,
        )
        return queryset


class TaskCompletedListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(
            author=user,
            completed_at__isnull=False,
            deleted_at__isnull=True,
        )


class TaskDeletedListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user, deleted_at__isnull=False)


class TagListCreateView(generics.ListCreateAPIView):
    serializer_class = TagListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tag.objects.filter(author=user, deleted_at__isnull=True)

    def perform_create(self, serializer):
        if serializer.is_valid():
            # .save() creates the object from the JSON data
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class TagRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TagWithTaskListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tag.objects.filter(author=user)

    def get_object(self):
        s_id = self.kwargs["pk"]
        self.kwargs["pk"] = sqids.decode(s_id)[0]
        return super().get_object()


class TagMarkDelete(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        tag_id = sqids.decode(pk)[0]
        tag = None
        try:
            tag = Tag.objects.get(id=tag_id)
        except Tag.DoesNotExist:
            return Response(
                {"detail": "Tag not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if tag.deleted_at is not None:
            return Response(
                {"detail": "Tag is already marked as deleted"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tag.deleted_at = make_aware(datetime.datetime.now())
        tag.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class AddTagsToTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, task_id):
        serializer = AddTagSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        task_id = sqids.decode(task_id)[0]

        tag_ids = serializer.data.get("tag_ids")
        task = None
        tags = []
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response(
                {"detail": "Task not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            for tag_id in tag_ids:
                tag_id = sqids.decode(tag_id)[0]
                tagObj = Tag.objects.get(id=tag_id)
                tags.append(tagObj)
        except Tag.DoesNotExist:
            return Response(
                {"detail": "Tag not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        task.tags.set(tags)
        return Response(status=status.HTTP_204_NO_CONTENT)


class RemoveTagFromTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, task_id, tag_id):
        task_id = sqids.decode(task_id)[0]
        tag_id = sqids.decode(tag_id)[0]

        task = None
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response(
                {"detail": "Task not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            tagObj = Tag.objects.get(id=tag_id)
        except Tag.DoesNotExist:
            return Response(
                {"detail": "Tag not found or invalid ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        task.tags.remove(tagObj)
        return Response(status=status.HTTP_204_NO_CONTENT)
