require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table2');

//Sets styling for table appearance
var table = new Table({
    style: { head: ["red", "bgWhite"]},
    head: ['ID', 'Name', 'Department', 'Price', 'In Stock'],
    colWidths: [10, 20, 20, 15, 15]
});

//Contains env variables for the database on AWS
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

//Begins connection to server
connection.connect(function(err){
    if (err) throw err;
    start();
});

//Asks user which command they would like to do and runs corresponding function based on answer.
function start(){
    inquirer
    .prompt([
        {
            name: "commands",
            type: "list",
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
            message: 'What would you like to do?'
        }
    ])
    .then(function(answer){
        switch(answer.commands) {
            case "View Products for Sale":
            viewProducts();
            break;
            case "View Low Inventory":
            viewInventory();
            break;
            case "Add to Inventory":
            addInventory();
            break;
            case "Add New Product":
            addProduct();
            break;
            case "Exit":
            connection.end();
        }
    })
};

//Pulls table from server
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        for (var i = 0; i < results.length; i++){
            table.push(
                [
                    results[i].item_id,
                    results[i].product_name,
                    results[i].department_name,
                    results[i].price,
                    results[i].stock_quantity
                ]);
        }
        console.log(table.toString());
        start();
    })
};

//Shows products with an inventory of less than 5.
function viewInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            table.push(
                [
                    res[i].item_id,
                    res[i].product_name,
                    res[i].department_name,
                    res[i].price,
                    res[i].stock_quantity
                ]);
        }
        console.log(table.toString());
        start();           
        })
    };


//Displays table and allows user to add to the stock quantity
function addInventory(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        for (var i = 0; i < results.length; i++){
            table.push(
                [
                    results[i].item_id,
                    results[i].product_name,
                    results[i].department_name,
                    results[i].price,
                    results[i].stock_quantity
                ]);
        }
        console.log(table.toString());
        inquirer
        .prompt([
            {
                name: 'choice',
                choices: [],
                type: 'input',
                message: 'Enter the id of the product of which you would like to increase inventory.'
            },
            {
                name: 'units',
                type: 'input',
                message: 'How many units would you like to add to the inventory of this item?'
            }
        ])
        .then(function(answer){
            var chosenItem;
            for (var i = 0; i < results.length; i++){
                if (results[i].item_id === parseInt(answer.choice)){
                    chosenItem = results[i];
                }
            }
            connection.query(
                "UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: parseInt(answer.units) + chosenItem.stock_quantity
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ],
                function (error){
                    if (error) throw err;
                    console.log("You have successfully added to your inventory.");
                    start();
                }
                );
        })
    })
};


//Allows user to add a new product to the table
function addProduct(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the product you would like to add?'
            },
            {
                name: 'department',
                type: 'input',
                message: 'What department does this item belong in?'
            },
            {
                name: 'price',
                type: 'input',
                message: 'How much does this item cost?'
            },
            {
                name: 'units',
                type: 'input',
                message: 'How many units would you like to add to the inventory for this product?'
            }
        ])
        .then (function(answer){
            connection.query(
                "INSERT INTO products (product_name, department_name, price, stock_quantity)",
                "VALUES (answer.name, answer.department, answer.price, answer.units)"
            )
            console.log(`You have successfully added ${answer.name} to your product list.`);
            start();
        })
    }
    )
};


