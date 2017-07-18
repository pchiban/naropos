export class Licence {

    constructor(
        public id: Number,
        public applicationId: String,
        public expirationDate: String,
        public serialId: String,
        public active: Boolean) {

    };

    public static fromJSON(json: string): Licence {
        let obj = JSON.parse(json);

        // adapt
        let id: Number = obj.id !== null ? obj.id : null;
        let applicationId: String = obj.applicationId !== null ? obj.applicationId : null;
        let expirationDate: String = obj.expirationDate !== null ? obj.expirationDate : null;
        let serialId: String = obj.serialId !== null ? obj.serialId : null;
        let active: Boolean = obj.active !== null ? obj.active : null;

        return new Licence(id, applicationId, expirationDate, serialId, active);
    }
}