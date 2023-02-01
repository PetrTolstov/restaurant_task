import { makeAutoObservable } from "mobx";
import Dish from "../models/DishModel/DishModel";


class MenuStore { 
    constructor() { 
        makeAutoObservable(this)
    }

    menuData: {menu: Dish[] | null} = { 
        menu: null,
    }
    setMenuData(newValue: Dish[]) { 
        this.menuData.menu = newValue; 
    }

    deleteMenuItem(id: string){
        let index = 0
        let list = this.menuData.menu?.filter((el, i) => {
            if(el._id === id){
                index = i
            }
            return el._id !== id
        })

        if(list){
            this.menuData.menu = list
        }
        console.log(this.menuData.menu)
        console.log(index)
        return index
    }

    changeMenuData(id: string, newValue: Dish){
        let index = this.deleteMenuItem(id)
        this.menuData.menu?.splice(index, 0, newValue)
    }
}


export default new MenuStore(); 