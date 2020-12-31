import INotification from "./interface/INotification";

export class PureNotification implements INotification {
    public name: string;
    public body: any;
    public type: string;

    constructor(name: string, body?: any, type?: string){
        if (typeof body === "undefined") { body = null; }
        if (typeof type === "undefined") { type = null; }
        this.name = null;
        this.body = null;
        this.type = null;
        this.name = name;
        this.body = body;
        this.type = type; 
    }

    getName(): string {
        return this.name;
    }
    setBody(body: any): void {
        this.body = body;
    }
    getBody() {
        return this.body;
    }
    setType(type: string): void {
        this.type = type;
    }
    getType(): string {
        return this.type;
    }
    toString(): string {
        let msg = "Notification Name: " + this.getName();
        msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
        msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
        return msg;
    }
}