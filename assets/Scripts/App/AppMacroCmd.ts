import INotification from "../Core/PureMVC/interface/INotification";
import { PureMacroCmd } from "../Core/PureMVC/PureMacroCmd";

export default abstract class AppMacroCmd extends PureMacroCmd {
    abstract doExecute(notification: INotification): void;
    execute(notification: INotification): void {
        this.doExecute(notification);
    }
}