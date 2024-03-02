//after building and getting everything working I realized I should have flipped the names of eatery and restaurant.

class Eatery {
    constructor(name, cuisine) { //this will be the name and cuisine for the eatery
        this.name = name;
        this.cuisine = cuisine;
    }
    describe() {
        return `${this.name} serves ${this.cuisine} food.`; 
    }
}

class Restaurant {
    constructor(name) {
        this.name = name;
        this.eaterys = []; //array that holds eaterys in the restaurant
    }
    

    
    addEatery(eatery) {
        if (eatery instanceof Eatery) { //checks if the eatery is an instance of the Eatery class. 
            this.eaterys.push(eatery); //adds a new eatery to eatery
        } else {
            throw new Error(`You can only add an instance of a eatery. Argument is not a eatery: ${eatery}`);
        }
    }
    describe(){
        return `${this.name} has ${this.eaterys.length} eatery's.`; //prints out the name of the restaurant and how many eateries their are.
    }
}

class Menu{  //this is the class that drives the application and it's choices
    constructor(){
        this.restaurants = []; //an array of restaurants
        this.selectedRestaurant = null; //want to kow which restaurant we have selected
    }
   
    start() { //starts the menu application. pops up on page load.
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1': //When entering 1 it will take you to the createRestaurant method. 
                    this.createRestaurant();
                    break;
                case '2': //When entering 2 it will take you to the viewRestaurant method. 
                    this.viewRestaurant();
                    break;
                case '3': //When entering 3 it will take you to the deleteRestaurant method.
                    this.deleteRestaurant();
                    break;
                case '4': //When entering 4 it will take you to the displayRestaurants method.
                    this.displayRestaurants();
                    break;
                default: //if any other value is entered we set it to 0.
                    selection = 0;
            }
            selection = this.showMainMenuOptions(); //keeps looping as long as we don't enter 0 or something other than 1-4.
        }

        alert('Thank you! See ya later.'); //if they enter 0 we give an alert and exit the loop.
    }

    showMainMenuOptions() { //gives a prompt that shows the user what their input options are.Based on the number they enter we will look at the case above and run that method. 
        return prompt(` 
        0) exit
        1) create new restaurant
        2) view restaurant
        3) delete restaurant
        4) display all restaurants
        `);
    }

    showRestaurantMenuOptions(restaurantInfo) { //shows below values on a prompt and displays restaurant info that was passed in.
        return prompt(`
        0) back
        1) create eatery
        2) delete eatery
        -------------------------
        ${restaurantInfo}
        `);
    }

    displayRestaurants() {
        let restaurantString = '';
        for (let i = 0; i < this.restaurants.length; i++) { //list of all the restaurants that exist. 
            restaurantString += i + ') ' + this.restaurants[i].name + '\n'; //grab the current restaurant based on it's index value then creates a new line. 
        }
        alert(restaurantString); // shows all the restaurants in the array
    }

    createRestaurant(){
        let name = prompt('Enter name for new restaurant:');
        this.restaurants.push(new Restaurant(name));  //pushes new name to Restaurant class
    }

    viewRestaurant() { //see the details of the restaurant
        let index = prompt('Enter the index of the restaurant you wish to view:'); 
        if (index > -1 && index < this.restaurants.length) { //the index entered is 0 thru the length of the array.
            this.selectedRestaurant = this.restaurants[index]; //set it to the index enterd by the user. 
            let description = 'Restaurant Name: ' + this.selectedRestaurant.name + '\n';
        
            //add a description of the eaterys that are part of the restaurant
            for (let i = 0; i < this.selectedRestaurant.eaterys.length; i++) {
                description += i + ') ' + this.selectedRestaurant.eaterys[i].name + ' - ' + this.selectedRestaurant.eaterys[i].cuisine + '\n';
            }
            let selection = this.showRestaurantMenuOptions(description);
            switch (selection) { //this is a sub-menu
                case '1':
                    this.createEatery(); //calls createEatery method
                    break;
                case '2':
                    this.deleteEatery(); //calls deleteEatery method
                    
            }
        }
    
    }
    deleteRestaurant() { //this will delete the value that was in the line of which the index was choosen. 
        let index = prompt('Enter the index of the restaurant you wish to delete:');
        if (index > -1 && index < this.restaurants.length) {
            this.restaurants.splice(index, 1); // remove the element at position index. 
        }
    }


    createEatery() {
        let name = prompt('Enter name for new eatery:');
        let cuisine = prompt('Enter cuisine for new eatery:');
        this.selectedRestaurant.eaterys.push(new Eatery(name, cuisine)); //pushes new name amd cuisine to Eatery class
    }

    deleteEatery() {
        let index = prompt('Enter the index of the eatery you wish to delete:');
        if (index > -1 && index < this.selectedRestaurant.eaterys.length) { //the index entered is 0 thru the length of the array.
            this.selectedRestaurant.eaterys.splice(index, 1);// remove the element at position index. 
        }
    }

}

let menu = new Menu();
menu.start();