export default class Dish {
    _id: string;
    name: string;
    price: number;
    description: string;
       mass: number;
       type: "drink"| "dish";
    constructor(id: string, name: string, price: number, description: string, mass: number, type: "drink"| "dish") {
     this._id = id;
     this.name = name;
     this.price = price;
     this.description = description;
           this.mass = mass; 
           this.type = type 
    }
   }