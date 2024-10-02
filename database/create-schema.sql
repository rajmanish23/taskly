-- Creating the database and using it.
create database if not exists tasks_app;
use tasks_app;

-- Creating the user table.
create table if not exists users (
	user_email varchar(255) not null,
    user_password varchar(255) not null,   -- Needs to be hashed by API
    user_id int not null auto_increment,   -- Internally stored as integers (numbers) but externally will be UUID type texts
    primary key (user_id)
);

-- Creating the tasks table.
create table if not exists tasks (
	task_id int not null auto_increment,   -- Same technique as user_id
    task_name varchar(255) not null,
    task_description text,                 -- Decided to have a functionality to add a description
    created_date datetime not null,
    due_date datetime not null,
    
    -- task_status varchar(10) not null,      -- "INPROGRESS", "COMPLETED" ("OVERDUE" - not gonna have this status cuz it means i have to constantly check for due dates for every task)
    -- now that i think about it, why do you still need to store the task when it is completed?
    
    has_sub_tasks boolean not null,
    primary key (task_id),
    
    user_id int not null,                           -- To relate the task to the user
    foreign key (user_id) references users(user_id)
);

-- Creating the sub tasks table.
create table if not exists sub_tasks (
	sub_task_id int not null auto_increment,
    sub_task_name varchar(255) not null,   -- Sub tasks are not gonna have details because why would you?
    created_date datetime not null,
    -- due_date datetime not null,         -- Not gonna add due date for sub tasks since these would mainly be made to divide a task.
    
    -- sub_task_status varchar(10) not null,  -- Same statuses as main task status
    -- same here too...
    
    primary key (sub_task_id),
    
    parent_task_id int not null,                    -- To relate to main task
    foreign key (parent_task_id) references tasks(task_id),

    -- I don't think defining this relation is necessary as
    -- each sub task is related, which is then related to the user
    -- so effectively each sub task is pretty much related to the user indirectly
    -- user_id int not null,                           -- To relate to the user
    -- foreign key (user_id) references users(user_id)
);

-- Creating the tags table.
create table if not exists tags (
	tag_id int not null auto_increment,
    tag_name varchar(20) not null,       -- Limited to 20ish characters as I don't want people to enter an entire sentence for this
    tag_colour char(6) not null,
    primary key (tag_id),
    user_id int not null,                           -- To relate to the user
    foreign key (user_id) references users(user_id)
);

-- Junction table to relate tasks and tags (many-to-many)
create table if not exists tasks_tags (
	task_id int,
    tag_id int,
    primary key (task_id, tag_id),
    foreign key (task_id) references tasks(task_id),
    foreign key (tag_id) references tags(tag_id)
);