import INotification from "../../../../../Scripts/Core/PureMVC/interface/INotification";
import { PureSimpleCmd } from "../../../../../Scripts/Core/PureMVC/PureSimpleCmd";
import { EnumWorld } from "../../../../../Scripts/App/Enum/EnumWorld";
import Global from "../../../../../Scripts/App/Global";
import ChangeWorldProxy from "../Model/ChangeWorldProxy";

export default class ChangeWorldCmd extends PureSimpleCmd {
    execute(notification: INotification): void {
        console.log("ChangeWorldCmd ", notification.getName(), notification.getBody());
        let worldName = <EnumWorld>notification.getBody();
        let proxy = <ChangeWorldProxy>Global.facade.retrieveProxy(cc.js.getClassName(ChangeWorldProxy));
        proxy.switchWorld(worldName);
    }
}