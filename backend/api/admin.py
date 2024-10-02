from django.contrib import admin
from .models import SubTask, Tag, Task

admin.site.register(Task)
admin.site.register(SubTask)
admin.site.register(Tag)
