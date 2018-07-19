import { Role } from './../shared/refdata/role.model';

export class User {

    constructor(
        public id: Number,
        public name: String,
        public password: String,
        public active: Boolean,
        public roleList: Role[]) {

    }

    public static fromJSON(json: string): User {
        let obj = JSON.parse(json);

        // adapt
        let id: Number = obj.id !== null ? obj.id : null;
        let name: String = obj.name !== null ? obj.name : null;
        let password: String = obj.password !== null ? obj.password : null;
        let active: Boolean = obj.active !== null ? obj.active : null;
        let roleList: Role[] = obj.roleList !== null ? obj.roleList : null;

        return new User(id, name, password, active, roleList);
    }
}