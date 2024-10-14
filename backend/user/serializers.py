from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from .models import User


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
