--ajwa
create database ajwa;

create extension "pgcrypto";

create table products(
	product_id serial not null primary key,
	product_name varchar(50) not null,
	product_price int not null,
	product_image varchar(60),
	product_info text
);

create table reserves(
	reserve_id serial not null primary key,
	reserve_date timestamp with time zone default current_timestamp,
	reserve_product_count int,
	product_id int not null references products (product_id)
);

create table clients(
	client_id serial not null primary key,
	client_date timestamp with time zone default current_timestamp,
	tg_user_id bigint not null,
	tg_first_name varchar(250),
	tg_last_name varchar(250),
	tg_username varchar(250),
	tg_phone varchar(15)
);

create table sales(
	sale_id serial not null primary key,
	sale_date timestamp with time zone default current_timestamp,
	sale_completed boolean default false,
	sale_product_count int,
	product_id int not null references products (product_id),
	client_id int not null references clients (client_id),
	location_id int
);

create table locations(
	location_id serial not null primary key,
	location_date timestamp with time zone default current_timestamp,
	client_id int not null references clients (client_id),
	latitude varchar(60),
	longitude varchar(60)
);

create table owners(
	owner_id serial not null primary key,
	owner_fullname varchar(70),
	owner_username varchar(32) not null,
	owner_password varchar(70) not null,
	owner_date timestamp with time zone default current_timestamp
);
