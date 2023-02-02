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
        return index
    }

    changeMenuData(newValue: Dish){
        let index = this.deleteMenuItem(newValue._id)
        this.menuData.menu?.splice(index, 0, newValue)
    }

    pushDishInMenu(newValue: Dish){
        this.menuData.menu?.push(newValue)
    }

    getDishNameById(id: string){
        let name = ''
        this.menuData.menu?.filter((el, i) => {
            if(el._id === id){
                name = el.name
            }
            return el._id !== id
        })
        return name
    }

    getDishPriceById(id: string){
        let price = 0
        this.menuData.menu?.filter((el, i) => {
            if(el._id === id){
                price = el.price
            }
            return el._id !== id
        })
        return price
    }
}


export default new MenuStore(); 