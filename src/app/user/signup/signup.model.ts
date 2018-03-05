

export class SignupInfo {

    constructor(private email:String){

    }

    public static fromJSON(json: string): SignupInfo {
        let obj = JSON.parse(json);

        // adapt
        let email:String = obj.email !== null ? obj.email : null;;

        return new SignupInfo(email);
    }
}