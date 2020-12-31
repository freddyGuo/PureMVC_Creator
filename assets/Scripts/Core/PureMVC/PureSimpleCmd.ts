import ICommand from "./interface/ICommand";
import INotification from "./interface/INotification";
import INotifier from "./interface/INotifier";
import { PureNotifier } from "./PureNotifier";

export class PureSimpleCmd extends PureNotifier implements ICommand, INotifier {
    execute(notification: INotification) {
        
    }
}