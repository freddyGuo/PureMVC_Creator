import { PureFacade } from "./PureFacade";
import IFacade from "./interface/IFacade";
import INotifier from "./interface/INotifier";

export class PureNotifier implements INotifier {
    public facade: IFacade;
    constructor(){
        this.facade = PureFacade.getInstance();
    }
    sendNotification(name: string, body?: any, type?: string): void {
        if (typeof body === "undefined") { body = null; }
        if (typeof type === "undefined") { type = null; }
        this.facade.sendNotification(name, body, type);
    }
    
}