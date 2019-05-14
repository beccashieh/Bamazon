DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(60),
    department_name VARCHAR(60),
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("eye shadow", "Makeup", 4, 250),
("power drill", "Tools", 45, 200),
("Jumanji", "Movies", 10, 50),
("50 inch LED TV", "Electronics", 700, 150),
("Jeggings", "Clothing", 20, 250),
("Sweater", "Clothing", 25, 200),
("Earrings", "Jewelry", 50, 200),
("Bracelet", "Jewelry", 75, 175),
("Baseball hat", "Clothing", 15, 75),
("Iron Man", "Movies", 20, 150);

