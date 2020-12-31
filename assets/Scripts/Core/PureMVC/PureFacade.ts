import { PureController } from "./PureController";
import IController from "./interface/IController";
import IFacade from "./interface/IFacade";
import IMediator from "./interface/IMediator";
import IModel from "./interface/IModel";
import INotification from "./interface/INotification";
import IProxy from "./interface/IProxy";
import IView from "./interface/IView";
import { PureModel } from "./PureModel";
import { PureNotification } from "./PureNotification";
import { PureView } from "./PureView";

export class PureFacade implements IFacade {
    public model: IModel;
    public view: IView;
    public controller: IController;
    static SINGLETON_MSG: string = "Facade singleton already constructed!";
    private static instance: PureFacade;
    static getInstance(): PureFacade{
        if(!PureFacade.instance) {
            PureFacade.instance = new PureFacade();
        }
        return PureFacade.instance;
    };

    constructor (){
        this.model = null;
        this.view = null;
        this.controller = null;
        if(PureFacade.instance) {
            throw Error(PureFacade.SINGLETON_MSG);
        }
        PureFacade.instance = this;
        this.initializeFacade();
    }

    public initializeFacade(){
        this.initializeModel();
        this.initializeController();
        this.initializeView();  
    }
    public initializeModel(){
        if(!this.model) {
            this.model = PureModel.getInstance();
        }
    }

    public initializeController(){
        if(!this.controller) {
            this.controller = PureController.getInstance();
        }
    }

    public initializeView(){
        if(!this.view) {
            this.view = PureView.getInstance();
        }
    }

    registerCommand(notificationName: string, commandClassRef: Function): void {
        this.controller.registerCommand(notificationName, commandClassRef);
    }
    removeCommand(notificationName: string): void {
        this.controller.removeCommand(notificationName);
    }
    hasCommand(notificationName: string): boolean {
        return this.controller.hasCommand(notificationName);
    }
    registerProxy(proxy: IProxy): void {
        this.model.registerProxy(proxy);
    }
    retrieveProxy(proxyName: string): IProxy {
        return this.model.retrieveProxy(proxyName);
    }
    removeProxy(proxyName: string): IProxy {
        var proxy:IProxy;
        if(this.model) {
            proxy = this.model.removeProxy(proxyName);
        }
        return proxy;
    }
    hasProxy(proxyName: string): boolean {
        return this.model.hasProxy(proxyName);
    }
    registerMediator(mediator: IMediator): void {
        if(this.view) {
            this.view.registerMediator(mediator);
        }
    }
    retrieveMediator(mediatorName: string): IMediator {
        return this.view.retrieveMediator(mediatorName);
    }
    removeMediator(mediatorName: string): IMediator {
        var mediator:IMediator;
        if(this.view) {
            mediator = this.view.removeMediator(mediatorName);
        }
        return mediator;
    }
    hasMediator(mediatorName: string): boolean {
        return this.view.hasMediator(mediatorName);
    }
    notifyObservers(notification: INotification): void {
        if(this.view) {
            this.view.notifyObservers(notification);
        }
    }
    sendNotification(name: string, body?: any, type?: string): void {
        console.log("____sendNotification_____", name, body)
        if (typeof body === "undefined") { body = null; }
        if (typeof type === "undefined") { type = null; }
        this.notifyObservers(new PureNotification(name, body, type));        
    }
    
}