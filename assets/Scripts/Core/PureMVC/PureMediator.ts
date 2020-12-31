import IMediator from "./interface/IMediator";
import INotification from "./interface/INotification";
import INotifier from "./interface/INotifier";
import { PureNotifier } from "./PureNotifier";

export class PureMediator extends PureNotifier implements IMediator, INotifier {
    public mediatorName: string;
    public viewComponent: any;
    static NAME: string = "Mediator";
    constructor (mediatorName?: string, viewComponent?: any){
        super();
        if (typeof mediatorName === "undefined") { mediatorName = null; }
        if (typeof viewComponent === "undefined") { viewComponent = null; }
        this.mediatorName = null;
        this.viewComponent = null;
        this.mediatorName = (mediatorName != null) ? mediatorName : PureMediator.NAME;
        this.viewComponent = viewComponent;
    }
    getMediatorName(): string {
        return this.mediatorName;
    }
    getViewComponent() {
        return this.viewComponent;
    }
    setViewComponent(viewComponent: any): void {
        this.viewComponent = viewComponent;
    }
    listNotificationInterests(): string[] {
        return new Array();
    }
    handleNotification(notification: INotification): void {
        
    }
    onRegister(): void {
        
    }
    onRemove(): void {
        
    }

}