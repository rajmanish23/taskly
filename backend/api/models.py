from sqids import Sqids
from django.db import models
import os
from dotenv import load_dotenv

from user.models import User

load_dotenv()
sqids = Sqids(
    min_length=16,
    alphabet=os.getenv("SQIDS_ALPHABET"),
    blocklist=os.getenv("SQIDS_BLOCKLIST"),
)

# Here, the "s_id" is the hashed/jumbledified string
# that decodes to the actual id which is an int.
# Added this mainly to allow sharing and stuff since
# it will be visible in URLs on browser from frontend.

# TODO: Migrate

class Task(models.Model):
    s_id = models.CharField(max_length=16, blank=True, null=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_at = models.DateTimeField(blank=False, null=False)

    # related_name gives a name from User obj to get this Task data.
    # So it will be user.tasks here
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self) -> str:
        return self.name

    def save(self, **kwargs):
        super().save(**kwargs)
        self.s_id = sqids.encode([self.id])
        super().save(update_fields=["s_id"])


class SubTask(models.Model):
    s_id = models.CharField(max_length=16, blank=True, null=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # A Sub task may or may not have a due date
    # maybe user want to just have a bunch of sub tasks under one main task
    # and they don't want to give any due dates for each sub tasks
    due_at = models.DateTimeField(blank=True, null=True)

    parent_task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="sub_tasks"
    )

    def __str__(self) -> str:
        return self.name

    def save(self, **kwargs):
        super().save(**kwargs)
        self.s_id = sqids.encode([self.id])
        super().save(update_fields=['s_id'])


class Tag(models.Model):
    s_id = models.CharField(max_length=16, blank=True, null=True)
    name = models.CharField(max_length=20, blank=False, null=False)
    color_hex = models.CharField(max_length=7, blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tags")

    # defines the many-to-many relationship between tags and tasks
    task_set = models.ManyToManyField(Task, blank=True, related_name="tags")

    def __str__(self) -> str:
        return self.name

    def save(self, **kwargs):
        super().save(**kwargs)
        self.s_id = sqids.encode([self.id])
        super().save(update_fields=["s_id"])
