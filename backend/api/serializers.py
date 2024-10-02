# All this is to essentially parse JSON in requests into Django models (objects)
# And also to convert Django models into JSON for responses

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Task


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


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "name",
            "description",
            "created_at",
            "due_at",
            "has_sub_tasks",
        ]
        extra_kwargs = {
            "created_at": {"read_only": True},
            "name": {"required": True},
            "due_at": {"required": True},
        }
