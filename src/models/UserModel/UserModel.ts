export class User {
    _id: String;
    email: String;
    password: String;
    constructor(id: String, email: String, password: String) {
        this._id = id;
        this.email = email;
        this.password = password;
    }
}
