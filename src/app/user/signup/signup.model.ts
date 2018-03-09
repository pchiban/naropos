

export class SignupInfo {

    email: String
    token: String;
    password: String;
    confirmationUrl: String;

    constructor() {

    }

    public static fromJSON(json: string): SignupInfo {
        let obj = JSON.parse(json);

        // adapt
        let email: String = obj.email !== null ? obj.email : null;
        let token: String = obj.token !== null ? obj.token : null;
        let password: String = obj.password !== null ? obj.password : null;
        let confirmationUrl: String = obj.confirmationUrl !== null ? obj.confirmationUrl : null;

        let info = new SignupInfo();
        info.email = email;
        info.token = token;
        info.password = password;
        info.confirmationUrl = confirmationUrl;

        return info;
    }
}