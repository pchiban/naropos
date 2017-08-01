import { Role } from './../shared/refdata/role.model';

export class User {

    constructor(
        public id: Number,
        public userName: String,
        public password: String,
        public active: Boolean,
        public roles: Role[]) {

    }

    public static fromJSON(json: string): User {
        let obj = JSON.parse(json);

        // adapt
        let id: Number = obj.id !== null ? obj.id : null;
        let userName: String = obj.userName !== null ? obj.userName : null;
        let password: String = obj.password !== null ? obj.password : null;
        let active: Boolean = obj.active !== null ? obj.active : null;
        let roles: Role[] = obj.roles !== null ? obj.roles : null;

        return new User(id, userName, password, active, roles);
    }
}