import INotification from "../Core/PureMVC/interface/INotification";
import { PureSimpleCmd } from "../Core/PureMVC/PureSimpleCmd";

export default abstract class AppSimpleCommand extends PureSimpleCmd {
    abstract doExecute(notification: INotification): void;
    execute(notification: INotification): void {
        this.doExecute(notification);
    }
}