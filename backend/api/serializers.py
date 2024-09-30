# All this is to essentially parse JSON in requests into Django models (objects)
# And also to convert Django models into JSON for responses

from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password', 'first_name', 'last_name']

    # This provides additional functionality
    # Here, we are making password write only. So can't send password in response
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user