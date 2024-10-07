use tasks_app;


-- -- getting a list of tags/groups (/tags)
-- select 
-- 	tag_id as tagId,
--     tag_name as tagName,
--     tag_colour as tagColour
-- from 
-- 	tags where user_id = 1;


-- -- getting a list of tasks along with tags (/all)
-- -- remember to use left join here as there are tasks with no tags
-- select 
-- 	tasks.task_id as taskId,
-- 	tasks.task_name as taskName,
--     tasks.task_description as taskDescription,
--     tasks.created_date as createdDate,
--     tasks.due_date as dueDate,
--     tasks.has_sub_tasks as hasSubTasks,
--     tags.tag_id as tagId,
--     tags.tag_name as tagName,
--     tags.tag_colour as tagColour
-- from 
-- 	(tasks left join tasks_tags
-- 	on tasks.task_id = tasks_tags.task_id)
--     left join tags on tags.tag_id = tasks_tags.tag_id
-- where
-- 	tasks.user_id = 1;


-- -- the actual date part will depend on when the request is made.
-- -- the time part will be same as it is here.
-- -- getting list of tasks for the current date (/today)
-- -- remember to use left join here as there are tasks with no tags
-- select 
-- 	tasks.task_id as taskId,
-- 	tasks.task_name as taskName,
--     tasks.task_description as taskDescription,
--     tasks.created_date as createdDate,
--     tasks.due_date as dueDate,
--     tasks.has_sub_tasks as hasSubTasks,
--     tags.tag_id as tagId,
--     tags.tag_name as tagName,
--     tags.tag_colour as tagColour
-- from 
-- 	(tasks left join tasks_tags
-- 	on tasks.task_id = tasks_tags.task_id)
--     left join tags on tags.tag_id = tasks_tags.tag_id
-- where
-- 	tasks.user_id = 1
--     and due_date >= "2024-09-19 00:00:00"
--     and due_date <= "2024-09-19 23:59:59";
    
    
-- -- getting list of upcoming tasks (/upcoming)
-- -- remember to use left join here as there are tasks with no tags
-- select 
-- 	tasks.task_id as taskId,
-- 	tasks.task_name as taskName,
--     tasks.task_description as taskDescription,
--     tasks.created_date as createdDate,
--     tasks.due_date as dueDate,
--     tasks.has_sub_tasks as hasSubTasks,
--     tags.tag_id as tagId,
--     tags.tag_name as tagName,
--     tags.tag_colour as tagColour
-- from 
-- 	(tasks left join tasks_tags
-- 	on tasks.task_id = tasks_tags.task_id)
--     left join tags on tags.tag_id = tasks_tags.tag_id
-- where
-- 	tasks.user_id = 1
--     and due_date > "2024-09-19 23:59:59";
    
    
-- -- getting a specific task (/tasks/:taskId)
-- -- remember to use left join here as there are tasks with no tags
-- select 
-- 	tasks.task_id as taskId,
-- 	tasks.task_name as taskName,
--     tasks.task_description as taskDescription,
--     tasks.created_date as createdDate,
--     tasks.due_date as dueDate,
--     tasks.has_sub_tasks as hasSubTasks,
--     tags.tag_id as tagId,
--     tags.tag_name as tagName,
--     tags.tag_colour as tagColour
-- from 
-- 	(tasks left join tasks_tags
-- 	on tasks.task_id = tasks_tags.task_id)
--     left join tags on tags.tag_id = tasks_tags.tag_id
-- where
-- 	tasks.user_id = 1
--     and tasks.task_id = 2;


-- -- getting the list of tasks under a tag (/tags/:tagId)
-- -- remember to use inner join here as we only need tasks under a given tag id
-- select 
-- 	tasks.task_id as taskId,
-- 	tasks.task_name as taskName,
--     tasks.task_description as taskDescription,
--     tasks.created_date as createdDate,
--     tasks.due_date as dueDate,
--     tasks.has_sub_tasks as hasSubTasks,
--     tags.tag_id as tagId,
--     tags.tag_name as tagName,
--     tags.tag_colour as tagColour
-- from 
-- 	(tasks inner join tasks_tags
-- 	on tasks.task_id = tasks_tags.task_id)
--     inner join tags on tags.tag_id = tasks_tags.tag_id
-- where
-- 	tasks.user_id = 1
--     and tags.tag_id = 1;


-- -- get the user details (/user)
-- select 
-- 	user_email as email,
--     user_password as password,
--     user_id as userId
-- from users where user_id = 1;