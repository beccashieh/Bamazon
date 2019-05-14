var inquirer = require("inquirer");
var mysql = require("mysql");
var config = require("./config");
var Table = require('cli-table2');

var table = new Table({
    style: { head: ["blue", "bgWhite"]},
    head: ['ID', 'Name', 'Department', 'Price', 'In Stock'],
    colWidths: [10, 20, 20, 15, 15]
});


var connection = mysql.createConnection({
    host: "gtcbcmysql.cotq4aag83ga.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "beccashieh",
    password: "Blahblah4624!",
    database: "bamazon_DB"
});

connection.connect(function(err){
    if (err) throw err;
    listProducts();
});

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

function start(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        inquirer
        .prompt([
        {
            name: "choice",
            type: "rawlist",
            choices: function(){
                var choiceArray = [];
                for (var i = 0; i < results.length; i++){
                    choiceArray.push(results[i].item_name);
                }
                return choiceArray;
            },
            message: "Which item would you like to buy? Enter the item ID."
        },
        {
            name: "units",
            type: "input",
            message: "How many units of this item would you like to buy?"
        }
        ])
        .then(function(answer){
            var chosenItem;
            for (var i =0; i < results.length; i++){
                if (results[i].item_name === answer.choice){
                    chosenItem = results[i];
                }
            }
            if (chosenItem.stock_quantity < parseInt(answer.units)){
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stock_quantity - answer.units
                        },
                        {
                            id: chosenItem.id
                        }
                    ],
                    function(error){
                        if (error) throw err;
                        console.log("You have successfully ordered your item(s).");
                        start();
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
