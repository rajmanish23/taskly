use tasks_app;

-- each table get's their own delete statement
-- in the backend logic, i'll call them whenever necessary

-- -- deleting user
-- delete from users
-- where user_id = "given user id";

-- deleting a task
delete from tasks
where task_id = "given task id";

-- deleting a sub task
delete from sub_tasks
where sub_task_id = "given sub task id";

-- deleting a tag
delete from tags
where tag_id = "given tag id";

-- removing a tag from a task
-- which means have to remove link in the junction table
delete from tasks_tags
where
	tag_id = "given tag id"
    and task_id = "given task id";