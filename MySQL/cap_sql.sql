-- capstone project
-- name: nick zajac
-- start date: 8/8/24
-- ShopForHome mysql database


-- database setup
create database ShopForHome;
use ShopForHome;
show tables;



-- users table
create table users(
	id bigint primary key auto_increment,
    username varchar(10) not null,
   password long
);

-- product table
create table products(
	id bigint primary key auto_increment,
    name varchar(20) not null,
    category varchar(20) not null,
    price decimal(6,3) not null,
    image varchar(255),
    stock numeric
);

-- orders table
-- will be used to store orders and also calculate reports
create table orders(
	id bigint primary key auto_increment,
    user_id bigint,
    product_id bigint,
    quantity numeric,
    total_price decimal(8,2),
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id)
);

create table carts(
	id bigint primary key auto_increment,
    user_id bigint,
    product_id bigint,
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id)
);

-- discount table
create table discounts(
	id bigint primary key auto_increment,
    discount decimal(2,2),
    product_id bigint,
	foreign key(product_id) references products(id)
);

-- wishlist table
create table wishlists(
	id bigint primary key auto_increment,
    user_id bigint,
    product_id bigint,
    foreign key(user_id) references users(id),
    foreign key(product_id) references products(id)
);


-- creating user and admin accounts
-- admin account is necessary for function
insert into users values(1, "admin", "admin");


-- testing tables
select * from carts;
select * from products;
select * from orders;
select * from wishlists;
select * from discounts;
select * from users;



drop table wishlists;
drop table orders;
drop table discounts;
drop table carts;
drop table products;
drop table users;
drop tables admins;







