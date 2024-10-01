from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_at = models.DateTimeField(blank=False, null=False)
    has_sub_tasks = models.BooleanField(default=False)
    # related_name gives a name from User obj to get this Task data. So it will be user.tasks here
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self) -> str:
        return self.name