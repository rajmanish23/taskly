from django.urls import path

from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreateView.as_view(), name="task-list-create"),
    path("tasks/delete/<int:pk>/", views.TaskDeleteView.as_view(), name="task-delete"),
]
