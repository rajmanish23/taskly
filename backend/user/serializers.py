from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_slug

from .models import User


class UserSerializer(serializers.ModelSerializer):
    # extra_kwargs are like kwargs used here
    # password = serializers.CharField(
    #     write_only=True, required=True, validators=[validate_password]
    # )

    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name"]

        # This provides additional functionality
        # Here, making first and last name required
        extra_kwargs = {
            "email": {"required": True},
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
    new_password = serializers.CharField(required=True, validators=[validate_password])


class UpdateEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, validators=[validate_password])


class UpdateNameSerializer(serializers.Serializer):
    first_name = serializers.CharField(
        required=True, max_length=30, validators=[validate_slug]
    )
    last_name = serializers.CharField(
        required=True, max_length=30, validators=[validate_slug]
    )
    password = serializers.CharField(required=True, validators=[validate_password])
