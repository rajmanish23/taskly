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
    path(
        "tasks/previous/",
        views.TaskPreviousListView.as_view(),
        name="task-list-previous",
    ),
    path(
        "tasks/completed/",
        views.TaskCompletedListView.as_view(),
        name="task-list-completed",
    ),
    path(
        "tasks/deleted/", views.TaskDeletedListView.as_view(), name="task-list-deleted"
    ),
    path(
        "tasks/<slug:pk>/",
        views.TaskRetrieveUpdateDeleteView.as_view(),
        name="task-single-retrieve-update-delete",
    ),
    path(
        "tasks/<slug:pk>/mark-delete/",
        views.TaskMarkDelete.as_view(),
        name="task-mark-delete",
    ),
    path(
        "tasks/<slug:pk>/mark-complete/",
        views.TaskMarkComplete.as_view(),
        name="task-single-retrieve-update-delete",
    ),
    path(
        "tasks/<slug:p_task>/sub-tasks/",
        views.SubTaskListCreateView.as_view(),
        name="sub-task-list-create",
    ),
    path(
        "tasks/<slug:p_task>/sub-tasks/<slug:pk>/",
        views.SubTaskRetrieveUpdateDeleteView.as_view(),
        name="sub-task-single-retrieve-update-delete",
    ),
    # TODO: Implement view for marking sub tasks as completed
    path(
        "tasks/<slug:p_task>/sub-tasks/<slug:pk>/mark-complete/",
        views.SubTaskRetrieveUpdateDeleteView.as_view(),
        name="sub-task-single-retrieve-update-delete",
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
    path("tags/", views.TagListCreateView.as_view(), name="tag-list-create"),
    path(
        "tags/<slug:pk>/",
        views.TagRetrieveUpdateDeleteView.as_view(),
        name="tag-single-retrieve-update-delete",
    ),
    # TODO: Implement view for marking tags as deleted.
    path(
        "tags/<slug:pk>/mark-delete/",
        views.TagRetrieveUpdateDeleteView.as_view(),
        name="tag-single-retrieve-update-delete",
    ),
]
