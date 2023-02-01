export class User {
    _id?: string;
    email: string;
    password: string;
    constructor( email: string, password: string, id?: string) {
        this._id = id;
        this.email = email;
        this.password = password;
    }
}
