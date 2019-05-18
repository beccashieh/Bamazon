# Bamazon

Bamazon is a command line app that allows the user to view existing product in inventory and do various tasks depending on which file you are running. 

* In bamazonCustomer.js, the user has the ability to select an item and enter a quantity they would like to order. They will receive a success message along with their total. The item quantities are updated in the database once the order has been placed. 

![bamazonCustomer](https://user-images.githubusercontent.com/47259793/57933810-30250d80-788c-11e9-978d-d617dfa39e9d.gif)

* In bamazonManager.js, the user has the ability to view the inventory, view low inventory (products with quantities less than 5), add to inventory, and add a new product. 

- **View Inventory**:

![viewProducts](https://user-images.githubusercontent.com/47259793/57933876-59de3480-788c-11e9-948f-84c87c871a3e.gif)

- **View Low Inventory**:

![lowInventory](https://user-images.githubusercontent.com/47259793/57933901-6b274100-788c-11e9-99f9-e8f467c3681f.gif)

- **Add to Inventory**:

![addInventory](https://user-images.githubusercontent.com/47259793/57933935-7e3a1100-788c-11e9-8f16-039d7f142a23.gif)

- **Add a New Product**:

![addProduct](https://user-images.githubusercontent.com/47259793/57933972-927e0e00-788c-11e9-97df-b2f6ae0efd9d.gif)

## Getting Started

From the command line, type one of the following commands:

```
node bamazonCustomer.js
node bamazonManager.js

```

## Github link
Github repo: https://github.com/beccashieh/Bamazon

## Prerequisites

If you would like to run this program on your own machine, you will need to supply your own .env file containing your database information. You will also need to run the following commands in your terminal :

```
npm install
npm install inquirer
npm install mysql

```

## Technologies Used

- Node.js
- Javascript
- AWS
- MySQL
- Inquirer


## Authors

**Rebecca Shieh** 
