-- inserting a dummy user (hashing will be done while writing the backend)
insert into users (
	user_email, user_password
) values (
	"rajmanish@gmail.com",
    "testpassword"
);
select * from users;

-- inserting some dummy tasks
insert into tasks (
	task_name, 
    task_description, 
    created_date, 
    due_date, 
    has_sub_tasks,
    user_id
) values (
	"Add dummy data into the tables",
    "",
    '2024-09-18 21:06:00',
    '2024-09-20 06:30:00',
    false,
    1
), (
	"Add another dummy data into the tables",
    "This is some dummy description",
    '2024-09-18 21:06:00',
    '2024-09-20 06:30:00',
    true,
    1
);
select * from tasks;

-- inserting a dummy sub task for the 2nd main task that was inserted
insert into sub_tasks (
	sub_task_name, 
    created_date,
    due_date,
    parent_task_id,
    user_id
) values (
	"Dummy sub task for a main task",
    '2024-09-18 21:06:00',
    '2024-09-20 06:30:00',
    2,
    1
);
select * from sub_tasks;

-- inserting a dummy tag
insert into tags (
	tag_name,
    tag_colour,
    user_id
) values (
	"Dummy tasks",
    "e1c0b6",
    1
);
select * from tags;

-- adding a relation between the tag and the first task
insert into tasks_tags (
	task_id,
    tag_id
) values (
	1, 1
);
select * from tasks_tags;