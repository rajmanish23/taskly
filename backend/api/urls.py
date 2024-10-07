from django.urls import path

from . import views

urlpatterns = [
    path("tasks/all/", views.TaskListCreateView.as_view(), name="task-list-create"),
    path(
        "tasks/<int:pk>/",
        views.TaskRetrieveUpdateDeleteView.as_view(),
        name="task-single-retrieve",
    ),
    path("tasks/today/", views.TaskTodayListView.as_view(), name="task-list-today"),
    path("tasks/upcoming/", views.TaskUpcomingListView.as_view(), name="task-list-upcoming"),
    path("tags/", views.TagListCreateView.as_view(), name="tag-list-create"),
    path(
        "tags/<int:pk>/",
        views.TagRetrieveUpdateDeleteView.as_view(),
        name="tag-single-retrieve",
    ),
]
