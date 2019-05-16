require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
// var config = require("./config");
var Table = require('cli-table2');


//Sets styling for table appearance
var table = new Table({
    style: { head: ["blue", "bgWhite"]},
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

//Establishes connection and calls function to display the table in the terminal.
connection.connect(function(err){
    if (err) throw err;
    listProducts();
});

//Generates the table 
function listProducts(){
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
}

//Calls the inquirer prompts to ask the user which product they would like to buy and how many.
//Uses data from the table
function start(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        inquirer
        .prompt([
        {
            name: "choice",
            type: "input",
            choices: [],
            message: "Which item would you like to buy? Enter the item ID."
        },
        {
            name: "units",
            type: "input",
            message: "How many units of this item would you like to buy?"
        }
        ])
        //Uses answers to compare if there is sufficient quantity then update with total or restart prompts if stock is insufficient.
        .then(function(answer){
            var chosenItem;
            for (var i =0; i < results.length; i++){
                if (results[i].item_id === parseInt(answer.choice)){
                    chosenItem = results[i];
                }
            }
            if (chosenItem.stock_quantity > parseInt(answer.units)){
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: chosenItem.stock_quantity - answer.units
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function(error){
                        // console.log(error);
                        if (error) throw err;
                        console.log("You have successfully ordered your item(s).");
                        console.log("Your total is $" + (chosenItem.price * answer.units));
                    }
                );
            }
            else {
                console.log("There is an insufficient quantity to fill your order.");
                start();
            }
        });
    })
}
