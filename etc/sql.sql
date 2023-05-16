create table users(
id varchar(50) not null,
PW varchar(50) not null,
nickname varchar(50) ,
sPW varchar(50) not null
);
alter table users
add primary key (id)

show tables;
INSERT INTO Users (id, PW,nickname,sPW) VALUES ('ah', '1234','pong','1');
INSERT INTO Users (id, PW,nickname,sPW) VALUES ('ha', '4567','jong','3');
SELECT PW FROM Users WHERE id='ah';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cancer3652!@';
FLUSH PRIVILEGES;
select *from Users;

select `id`, `PW` from `users` where `id` ='ah' and `PW` = '1234'

select `sPW` from users where `id` = 'ah'
ALTER TABLE users MODIFY pw varchar(200)
ALTER TABLE users MODIFY spw varchar(200)
