from django.urls import path

from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreateView.as_view(), name="task-list-create"),
    path(
        "tasks/<int:pk>/",
        views.TaskRetrieveUpdateDeleteView.as_view(),
        name="task-single-retrieve",
    ),
    path("tags/", views.TagListCreateView.as_view(), name="tag-list-create"),
]
