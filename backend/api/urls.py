from django.urls import path

from . import views

urlpatterns = [
    path("tasks/all/", views.TaskListCreateView.as_view(), name="task-list-create"),
    path(
        "tasks/<int:pk>/",
        views.TaskRetrieveUpdateDeleteView.as_view(),
        name="task-single-retrieve-update-delete",
    ),
    path("tasks/today/", views.TaskTodayListView.as_view(), name="task-list-today"),
    path(
        "tasks/upcoming/",
        views.TaskUpcomingListView.as_view(),
        name="task-list-upcoming",
    ),
    path(
        "tasks/<int:p_task>/sub-tasks/",
        views.SubTaskListCreateView.as_view(),
        name="sub-task-list-create",
    ),
    path(
        "tasks/<int:task_id>/add-tag/",
        views.AddTagsToTaskView.as_view(),
        name="task-add-tags",
    ),
    path(
        "tasks/<int:p_task>/sub-tasks/<int:pk>/",
        views.SubTaskRetrieveUpdateDeleteView.as_view(),
        name="sub-task-single-retrieve-update-delete",
    ),
    path("tags/", views.TagListCreateView.as_view(), name="tag-list-create"),
    path(
        "tags/<int:pk>/",
        views.TagRetrieveUpdateDeleteView.as_view(),
        name="tag-single-retrieve-update-delete",
    ),
]
