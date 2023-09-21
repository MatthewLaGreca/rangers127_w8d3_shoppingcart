import {v4 as uuidV4} from 'uuid'

class Item {
    readonly $id:string;
    name:string;
    price:number;
    description:String;

    constructor(name:string, price:number, description:string){
        this.$id = uuidV4()
        this.name = name
        this.price = price
        this.description = description
    }
}

class User {
    readonly $id:string;
    name:string;
    age:number;
    cart:Item[]

    constructor(name:string, age:number){
        this.$id = uuidV4()
        this.name = name
        this.age = age
        this.cart = []
    }
}

function createUser(name:string,age:number):User{
    // this function will return an object of type User. 
    // It will autogenerate an UUID for the id. It will require name, 
    // and age to be passed in as arguments. It will also initialize 
    // an empty cart.
    let user = new User(name,age)
    return user
}

function createItem(name:string, price:number, description:string):Item{
    // this function will return an object of type Item. It will 
    // autogenerate an UUID for the id. It will require name, price, and 
    // description to be passed in as arguments.
    let item = new Item(name,price,description)
    return item
}

function addToCart(item:Item, user:User):void{
    // this function will bring an object of Item Type and an User object 
    // and it will add the item to the users cart
    user.cart.push(item)
}

function removeFromCart(itemToRemove:Item, user:User):void{
    // this function will bring an object of Item Type and an User object 
    // and it will remove all the instances of the item to the users cart 
    // (so the cart would have zero of these items left)
    let newCart:Item[] = []
    for (let item of user.cart){
        //This is only adding items to the new cart that aren't the item
        //being removed from the current cart
        if (item !== itemToRemove) {
            newCart.push(item)
        }
    }
    //assigning the newly updated cart to be the current cart of the user
    user.cart = newCart
}

function removeQuantityFromCart(itemToRemove:Item, user:User, quantity:number):void{
    // this function will bring an object of Item Type and an User object 
    // and a quantity of the item to remove and it will remove the quantity 
    // amount of instances of the item to the users cart (so if the cart had 
    // 5 red hats and we pass in the red hat item and the number 3 for 
    // the quantitiy we would end up with 2 red hats left in the cart)
    let newCart:Item[] = []
    let currentQuantity:number = 0
    for (let item of user.cart){
        if (item === itemToRemove) {
            currentQuantity++
        }
    }
    let addedToNewCart:number = 0
    for (let item of user.cart){
        //This is only adding items to the new cart that aren't the item
        //being removed from the current cart
        if (item === itemToRemove) {
            if (addedToNewCart < currentQuantity - quantity){
                addedToNewCart++
                newCart.push(item)
                // console.log('hi')
            }
        } else {
            newCart.push(item)
        }
    }
    //assigning the newly updated cart to be the current cart of the user
    user.cart = newCart
}

function cartTotal(user:User):number{
    // this function will calculate the total price of all items in our cart 
    // and RETURNS that value
    let total:number = 0
    for (let item of user.cart){
        total += item.price
    }
    return total
}

function printCart(user:User):void{
    // this function will take a user and console log the items in the 
    // users cart
        console.log(`Here are the items in ${user.name}'s cart:`)
        for (let item of user.cart){
            console.log(item)
            console.log(`\n`)
        }

    
}


let me:User = createUser('Matt', 39)
let itemsToSell:Item[] = [
    createItem('YuGiOh Cards', 5.99, 'Konami trying to make money through legal gambling directed towards kids and childish adults'), 
    createItem('Super Nintendo Switch', 449.99, "Nintendo's sequel to the ever popular Nintendo Switch; coming to a store near you March 2024"), 
    createItem('Outrageous', 2.50, "Matt's favorite Reese's product; for some reason it is only sold in King size whenever he is able to find it")
]

addToCart(itemsToSell[0], me)
printCart(me)
console.log('The cart total is $' + cartTotal(me))

for (let i = 0; i<3; i++){
    addToCart(itemsToSell[i], me)
}
printCart(me)
console.log('The cart total is $' + cartTotal(me))

for (let item of itemsToSell){
    removeFromCart(item, me)
}
printCart(me)
console.log('The cart total is $' + cartTotal(me))

for (let i = 0; i<3; i++){
    addToCart(itemsToSell[2], me)
}
removeQuantityFromCart(itemsToSell[2], me, 2)
printCart(me)
console.log('The cart total is $' + cartTotal(me))