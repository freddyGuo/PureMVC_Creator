import INotification from "./INotification";

export default interface IController {
    executeCommand( notification:INotification ):void;
    registerCommand( notificationName:string, commandClassRef:Function ):void;
    hasCommand( notificationName:string ):boolean;
    removeCommand( notificationName:string ):void;
}