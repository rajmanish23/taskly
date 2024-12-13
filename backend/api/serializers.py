# All this is to essentially parse JSON in requests into Django models (objects)
# And also to convert Django models into JSON for responses

# from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Task, SubTask, Tag


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ["s_id", "name", "due_at", "completed_at"]
        extra_kwargs = {"name": {"required": True}}

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)


class TaskSerializer(serializers.ModelSerializer):
    sub_tasks = SubTaskSerializer(many=True, required=False)
    tags = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Task
        fields = [
            "s_id",
            "name",
            "description",
            "due_at",
            "sub_tasks",
            "tags",
            "deleted_at",
            "completed_at",
        ]
        extra_kwargs = {
            "name": {"required": True},
            "due_at": {"required": True},
        }

    def get_tags(self, obj):
        return obj.tags.all().values("s_id", "name", "color_hex")


class TagListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["s_id", "name", "color_hex", "deleted_at"]
        extra_kwargs = {"name": {"required": True}, "color_hex": {"required": True}}


class TagWithTaskListSerializer(serializers.ModelSerializer):
    task_set = TaskSerializer(many=True, required=False)

    class Meta:
        model = Tag
        fields = ["s_id", "name", "color_hex", "task_set", "deleted_at"]
        extra_kwargs = {"name": {"required": True}, "color_hex": {"required": True}}


class AddTagSerializer(serializers.Serializer):
    tag_ids = serializers.ListField(child=serializers.CharField(), required=True)
