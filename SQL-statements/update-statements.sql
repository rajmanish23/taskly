use tasks_app;


-- -- updating user password
-- update users
-- set user_password = "new password"
-- where user_id = "existing user id";

-- -- updating user email
-- update users
-- set user_email = "new email"
-- where user_id = "existing user id";


-- -- updating task details

-- -- the backend logic will first get existing details,
-- -- then the new details given by user will be inserted here.
-- -- rest will be old details again.
-- update tasks
-- set 
-- 	task_name = "new task name",
-- 	task_description = "new task description",
--     due_date = "new due date",
--     has_sub_tasks = "if it has sub tasks"
-- where task_id = "specific task id";

-- -- same logic with sub tasks
-- update sub_tasks
-- set
-- 	sub_task_name = "new sub task name",
--     due_date = "new due date"
-- where sub_task_id = "specific sub task id";


-- more or less the same logic with updating tags too
update tags
set
	tag_name = "new tag name",
    tag_colour = "new tag colour"
where tag_id = "specific tag id";


-- no need to update the tasks-tags junction table
-- as changing tags or tasks here
-- essentially means removing a tag from a task.
-- so using DELETE will be better.