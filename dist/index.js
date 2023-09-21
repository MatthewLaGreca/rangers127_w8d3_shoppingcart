"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(name, price, description) {
        this.$id = (0, uuid_1.v4)();
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
class User {
    constructor(name, age) {
        this.$id = (0, uuid_1.v4)();
        this.name = name;
        this.age = age;
        this.cart = [];
    }
}
function createUser(name, age) {
    // this function will return an object of type User. 
    // It will autogenerate an UUID for the id. It will require name, 
    // and age to be passed in as arguments. It will also initialize 
    // an empty cart.
    let user = new User(name, age);
    return user;
}
function createItem(name, price, description) {
    // this function will return an object of type Item. It will 
    // autogenerate an UUID for the id. It will require name, price, and 
    // description to be passed in as arguments.
    let item = new Item(name, price, description);
    return item;
}
function addToCart(item, user) {
    // this function will bring an object of Item Type and an User object 
    // and it will add the item to the users cart
    user.cart.push(item);
}
function removeFromCart(itemToRemove, user) {
    // this function will bring an object of Item Type and an User object 
    // and it will remove all the instances of the item to the users cart 
    // (so the cart would have zero of these items left)
    let newCart = [];
    for (let item of user.cart) {
        //This is only adding items to the new cart that aren't the item
        //being removed from the current cart
        if (item !== itemToRemove) {
            newCart.push(item);
        }
    }
    //assigning the newly updated cart to be the current cart of the user
    user.cart = newCart;
}
function removeQuantityFromCart(itemToRemove, user, quantity) {
    // this function will bring an object of Item Type and an User object 
    // and a quantity of the item to remove and it will remove the quantity 
    // amount of instances of the item to the users cart (so if the cart had 
    // 5 red hats and we pass in the red hat item and the number 3 for 
    // the quantitiy we would end up with 2 red hats left in the cart)
    let newCart = [];
    let currentQuantity = 0;
    for (let item of user.cart) {
        if (item === itemToRemove) {
            currentQuantity++;
        }
    }
    let addedToNewCart = 0;
    for (let item of user.cart) {
        //This is only adding items to the new cart that aren't the item
        //being removed from the current cart
        if (item === itemToRemove) {
            if (addedToNewCart < currentQuantity - quantity) {
                addedToNewCart++;
                newCart.push(item);
                // console.log('hi')
            }
        }
        else {
            newCart.push(item);
        }
    }
    //assigning the newly updated cart to be the current cart of the user
    user.cart = newCart;
}
function cartTotal(user) {
    // this function will calculate the total price of all items in our cart 
    // and RETURNS that value
    let total = 0;
    for (let item of user.cart) {
        total += item.price;
    }
    return total;
}
function printCart(user) {
    // this function will take a user and console log the items in the 
    // users cart
    console.log(`Here are the items in ${user.name}'s cart:`);
    for (let item of user.cart) {
        console.log(item);
        console.log(`\n`);
    }
}
let me = createUser('Matt', 39);
let itemsToSell = [
    createItem('YuGiOh Cards', 5.99, 'Konami trying to make money through legal gambling directed towards kids and childish adults'),
    createItem('Super Nintendo Switch', 449.99, "Nintendo's sequel to the ever popular Nintendo Switch; coming to a store near you March 2024"),
    createItem('Outrageous', 2.50, "Matt's favorite Reese's product; for some reason it is only sold in King size now")
];
addToCart(itemsToSell[0], me);
printCart(me);
console.log('The cart total is $' + cartTotal(me));
for (let i = 0; i < 3; i++) {
    addToCart(itemsToSell[i], me);
}
printCart(me);
console.log('The cart total is $' + cartTotal(me));
for (let item of itemsToSell) {
    removeFromCart(item, me);
}
printCart(me);
console.log('The cart total is $' + cartTotal(me));
for (let i = 0; i < 3; i++) {
    addToCart(itemsToSell[2], me);
}
removeQuantityFromCart(itemsToSell[2], me, 2);
printCart(me);
console.log('The cart total is $' + cartTotal(me));
