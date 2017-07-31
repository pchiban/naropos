export class Role {

    constructor(public id: Number, public name: String) {

    }

    public static fromJSON(json: string): Role {
        let obj = JSON.parse(json);

        // adapt
        let id: Number = obj.id !== null ? obj.id : null;
        let name: String = obj.name !== null ? obj.name : null;

        return new Role(id, name);
    }
}