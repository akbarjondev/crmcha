--ajwa
create database ajwa;

create extension "pgcrypto";

create table products(
	product_id serial not null primary key,
	product_name varchar(50) not null,
	product_price int not null,
	product_image varchar(255),
	product_info text,
	product_status int default 1
);

alter table products alter column product_image set data type varchar(255);
-- alter table products add column product_status int default 1;

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
	sale_status int default 0,
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

--create update user location function
create function write_location() returns trigger language PLPGSQL as $$ begin

	update sales set location_id = new.location_id where client_id = new.client_id and sale_status = 1;

	return new;

end;
$$;

--insert into locations (client_id, latitude, longitude) values(16, 65.235456, 78.568125) returning client_id, location_id;

--add trigger function
create trigger write_user_location
before insert on locations
for each row
execute procedure write_location();

create table owners(
	owner_id serial not null primary key,
	owner_fullname varchar(70),
	owner_username varchar(32) not null,
	owner_password varchar(70) not null,
	owner_date timestamp with time zone default current_timestamp
);
