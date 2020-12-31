import ICommand from "./interface/ICommand";
import IController from "./interface/IController";
import INotification from "./interface/INotification";
import IView from "./interface/IView";
import { PureObserver } from "./PureObserver";
import { PureView } from "./PureView";

export class PureController implements IController {
    public view: IView;
    public commandMap: Object;
    private static instance: IController;
    static SINGLETON_MSG: string = "Controller singleton already constructed!";
    static getInstance(): IController{
        if(!PureController.instance) {
            PureController.instance = new PureController();
        }
        return PureController.instance; 
    };
    constructor(){
        this.view = null;
        this.commandMap = null;
        if(PureController.instance) {
            throw Error(PureController.SINGLETON_MSG);
        }
        PureController.instance = this;
        this.commandMap = {
        };
        this.initializeController();
    }
    public initializeController(){
        this.view = PureView.getInstance();
    }
    executeCommand(notification: INotification): void {
        var commandClassRef = this.commandMap[notification.getName()];
        if(commandClassRef) {
            var command = <ICommand>new commandClassRef();
            command.execute(notification);
        }
    }
    registerCommand(notificationName: string, commandClassRef: Function): void {
        if(!this.commandMap[notificationName]) {
            this.view.registerObserver(notificationName, new PureObserver(this.executeCommand, this));
        }
        this.commandMap[notificationName] = commandClassRef;
    }
    hasCommand(notificationName: string): boolean {
        return this.commandMap[notificationName] != null;
    }
    removeCommand(notificationName: string): void {
        if(this.hasCommand(notificationName)) {
            this.view.removeObserver(notificationName, this);
            delete this.commandMap[notificationName];
        }
    }
    
}