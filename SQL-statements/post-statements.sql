use tasks_app;

-- -- do not run these as the data is wrong and it's only a placeholder
-- -- creating a user
-- insert into users (
-- 	user_email, user_password
-- ) values (
-- 	"user email here",
--     "password here"
-- );


-- -- creating a tag
-- insert into tags (
-- 	tag_name,
--     tag_colour,
--     user_id
-- ) values (
-- 	"tag name here",
--     "colour hexcode",
--     "user id here as number"
-- );


-- -- creating a task
-- insert into tasks (
-- 	task_name, 
--     task_description, 
--     created_date, 
--     due_date, 
--     has_sub_tasks,
--     user_id
-- ) values (
-- 	"task name here",
--     "task description here",
--     'date of creation',
--     'due date',
--     "if the task has sub tasks (default is false)",
--     "user id here as number"
-- );


-- -- creating a sub task
-- insert into sub_tasks (
-- 	sub_task_name, 
--     created_date,
--     due_date,
--     parent_task_id,
--     user_id
-- ) values (
-- 	"sub task name here",
--     'date of creation',
--     'due date',
--     "main/parent task id here as number",
--     "user id here as number"
-- );


-- adding relation between a tag and a task when assigning a tag to a task
insert into tasks_tags (
	task_id,
    tag_id
) values (
	"task id here as number", 
    "tag id here as number"
);