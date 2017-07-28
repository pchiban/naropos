
export class User {

    constructor(public id: Number, public userName: String, public active: Boolean) {

    }

    public static fromJSON(json: string): User {
        let obj = JSON.parse(json);

        // adapt
        let id: Number = obj.id !== null ? obj.id : null;
        let userName: String = obj.userName !== null ? obj.userName : null;
        let active: Boolean = obj.active !== null ? obj.active : null;;

        return new User(id, userName, active);
    }
}