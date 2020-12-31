import INotification from "./interface/INotification";
import IObserver from "./interface/IObserver";

export class PureObserver implements IObserver {
    public notify: Function;
    public context: any;
    constructor (notifyMethod: Function, notifyContext: any){
        this.notify = null;
        this.context = null;
        this.setNotifyMethod(notifyMethod);
        this.setNotifyContext(notifyContext);
    }
    private getNotifyMethod(){
        return this.notify;
    }
    public setNotifyMethod(notifyMethod: Function): void{
        this.notify = notifyMethod;
    }
    private getNotifyContext(): any{
        return this.context;
    }
    public setNotifyContext(notifyContext: any): void {
        this.context = notifyContext;
    }
    public notifyObserver(notification: INotification): void{
        this.getNotifyMethod().call(this.getNotifyContext(), notification);
    }
    public compareNotifyContext(object: any): boolean{
        return object == this.context;
    }
}