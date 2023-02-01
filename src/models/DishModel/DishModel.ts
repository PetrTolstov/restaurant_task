type MealTimeType = "breakfast" | "lunch" | "dinner" | "other" | "drinks"
export default class Dish {
    _id: string;
    name: string;
    price: number;
    description: string;
    mass: number;
    type: "drink" | "dish";
    mealTimeType: MealTimeType;
    constructor(
        id: string,
        name: string,
        price: number,
        description: string,
        mass: number,
        type: "drink" | "dish",
        mealTimeType: MealTimeType
    ) {
        this._id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.mass = mass;
        this.type = type;
        this.mealTimeType = mealTimeType;
    }
}
