# All this is to essentially parse JSON in requests into Django models (objects)
# And also to convert Django models into JSON for responses

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Task, SubTask, Tag


class UserSerializer(serializers.ModelSerializer):
    # extra_kwargs are like kwargs used here
    # password = serializers.CharField(
    #     write_only=True, required=True, validators=[validate_password]
    # )

    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name"]

        # This provides additional functionality
        # Here, making first and last name required
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "password": {
                "write_only": True,
                "required": True,
                "validators": [validate_password],
            },
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class TagSerializer(serializers.ModelSerializer):
    task_set = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ["id", "name", "color_hex", "task_set"]
        extra_kwargs = {"name": {"required": True}, "color_hex": {"required": True}}

    def get_task_set(self, obj):
        return list(obj.task_set.all().values("id", "name", "due_at"))


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ["id", "name", "due_at"]
        extra_kwargs = {"name": {"required": True}, "due_at": {"required": True}}


class TaskSerializer(serializers.ModelSerializer):
    sub_tasks = SubTaskSerializer(many=True, required=False)
    tags = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Task
        fields = ["id", "name", "description", "due_at", "sub_tasks", "tags"]
        extra_kwargs = {
            "name": {"required": True},
            "due_at": {"required": True},
        }

    def get_tags(self, obj):
        return obj.tags.all().values("id", "name", "color_hex")
