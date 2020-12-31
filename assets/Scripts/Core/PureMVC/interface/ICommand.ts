import INotification from "./INotification";
import INotifier from "./INotifier";

export default interface ICommand extends INotifier {
    execute( notification:INotification ):void;
}