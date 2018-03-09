import { Message } from "./message.model";

export class Response {

    value: Object;
    messages: Message[];

    constructor() {

    }

    public static fromJSON(json: string): Response {
        let obj = JSON.parse(json);

        // adapt
        let value: Object = obj.value !== null ? obj.value : null;
        let messages: Message[] = obj.messages !== null ? obj.messages : null;

        let response = new Response();
        response.value = value;
        response.messages = messages;

        return response;
    }
}