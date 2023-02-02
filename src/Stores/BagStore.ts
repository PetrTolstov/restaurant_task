import { makeAutoObservable } from "mobx";
class BagStore {
    constructor() {
        makeAutoObservable(this);
    }

    bagData: { bag: any } = {
        bag: {},
    };

    clearBag(){
        this.bagData.bag = {}
    }

    setBagData(id: string) {
        if (this.bagData.bag[id]) {
            this.bagData.bag[id]++;
        } else {
            this.bagData.bag[id] = 1;
        }
    }
    get getAmountBagData() {
        const keys = Object.keys(this.bagData.bag);

        let amount = 0;

        for (let key of keys) {
            if (this.bagData.bag[key]) {
                amount += this.bagData.bag[key];
            }
        }

        return amount;
    }

}

export default new BagStore();
