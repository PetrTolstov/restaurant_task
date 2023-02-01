import { makeAutoObservable } from "mobx";
import Dish from "../models/DishModel/DishModel";


class BagStore { 
    constructor() { 
        makeAutoObservable(this)
    }

    bagData: {bag: {id: string, amount: number}[]} = { 
        bag: [],
    }
    setBagData(id: string, amount: number) { 
       

        this.bagData.bag.push({id: id, amount: amount }); 
    }
}
 



export default new BagStore(); 