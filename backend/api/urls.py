from django.urls import path

from . import views

urlpatterns = [
    path("tasks/all/", views.TaskListCreateView.as_view(), name="task-list-create"),
    path("tasks/today/", views.TaskTodayListView.as_view(), name="task-list-today"),
    path(
        "tasks/upcoming/",
        views.TaskUpcomingListView.as_view(),
        name="task-list-upcoming",
    ),
    path("tasks/previous/", views.TaskPreviousListView.as_view(), name="task-list-previous"),
    path(
        "tasks/<slug:pk>/",
        views.TaskRetrieveUpdateDeleteView.as_view(),
        name="task-single-retrieve-update-delete",
    ),
    path(
        "tasks/<slug:p_task>/sub-tasks/",
        views.SubTaskListCreateView.as_view(),
        name="sub-task-list-create",
    ),
    path(
        "tasks/<slug:task_id>/add-tag/",
        views.AddTagsToTaskView.as_view(),
        name="task-add-tags",
    ),
    path(
        "tasks/<slug:task_id>/remove-tag/<slug:tag_id>/",
        views.RemoveTagFromTaskView.as_view(),
        name="task-remove-tag",
    ),
    path(
        "tasks/<slug:p_task>/sub-tasks/<slug:pk>/",
        views.SubTaskRetrieveUpdateDeleteView.as_view(),
        name="sub-task-single-retrieve-update-delete",
    ),
    path("tags/", views.TagListCreateView.as_view(), name="tag-list-create"),
    path(
        "tags/<slug:pk>/",
        views.TagRetrieveUpdateDeleteView.as_view(),
        name="tag-single-retrieve-update-delete",
    ),
]
