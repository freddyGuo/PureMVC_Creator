import IMediator from "./interface/IMediator";
import INotification from "./interface/INotification";
import IObserver from "./interface/IObserver";
import IView from "./interface/IView";
import { PureObserver } from "./PureObserver";

export class PureView implements IView {
    public mediatorMap: Object;
    public observerMap: Object;
    static SINGLETON_MSG: string = "View singleton already constructed!";
    private static instance: IView;
    static getInstance(): IView{
        if(!PureView.instance) {
            PureView.instance = new PureView();
        }
        return PureView.instance;
    };
    constructor(){
        this.mediatorMap = null;
        this.observerMap = null;
        if(PureView.instance) {
            throw Error(PureView.SINGLETON_MSG);
        }
        PureView.instance = this;
        this.mediatorMap = {
        };
        this.observerMap = {
        };
        this.initializeView();
    }

    public initializeView():void{

    }

    public registerObserver(notificationName: string, observer: IObserver): void {
        var observers = this.observerMap[notificationName];
        if(observers) {
            observers.push(observer);
        } else {
            this.observerMap[notificationName] = [
                observer
            ];
        }          
    }
    public removeObserver(notificationName: string, notifyContext: any): void {
        var observers = this.observerMap[notificationName];
        var i = observers.length;
        while(i--) {
            var observer = observers[i];
            if(observer.compareNotifyContext(notifyContext)) {
                observers.splice(i, 1);
                break;
            }
        }
        if(observers.length == 0) {
            delete this.observerMap[notificationName];
        }
    }
    public notifyObservers(notification: INotification): void {
        var notificationName = notification.getName();
        var observersRef = this.observerMap[notificationName];
        if(observersRef) {
            var observers = observersRef.slice(0);
            var len = observers.length;
            for(var i = 0; i < len; i++) {
                var observer = observers[i];
                observer.notifyObserver(notification);
            }
        }
    }
    public registerMediator(mediator: IMediator): void {
       
        var name = mediator.getMediatorName();
        console.log("registerMediator", name)
        if(this.mediatorMap[name]) {
            return;
        }
        this.mediatorMap[name] = mediator;
        var interests = mediator.listNotificationInterests();
        var len = interests.length;
        if(len > 0) {
            var observer = new PureObserver(mediator.handleNotification, mediator);
            for(var i = 0; i < len; i++) {
                this.registerObserver(interests[i], observer);
            }
        }
        mediator.onRegister();
    }
    public retrieveMediator(mediatorName: string): IMediator {
        return this.mediatorMap[mediatorName] || null;
    }
    public removeMediator(mediatorName: string): IMediator {
        var mediator = this.mediatorMap[mediatorName];
        if(!mediator) {
            return null;
        }
        var interests = mediator.listNotificationInterests();
        var i = interests.length;
        while(i--) {
            this.removeObserver(interests[i], mediator);
        }
        delete this.mediatorMap[mediatorName];
        mediator.onRemove();
        return mediator;
    }
    public hasMediator(mediatorName: string): boolean {
        return this.mediatorMap[mediatorName] != null;
    }
    
}
