import INotification from "../../Core/PureMVC/interface/INotification";
import { PureSimpleCmd } from "../../Core/PureMVC/PureSimpleCmd";
import { EnumWorld } from "../Enum/EnumWorld";
import Global from "../Global";
import ChangeWorldProxy from "../Model/ChangeWorldProxy";

export default class ChangeWorldCmd extends PureSimpleCmd {
    execute(notification: INotification): void {
        console.log("ChangeWorldCmd ", notification.getName(), notification.getBody());
        let worldName = <EnumWorld>notification.getBody();
        let proxy = <ChangeWorldProxy>Global.facade.retrieveProxy(cc.js.getClassName(ChangeWorldProxy));
        proxy.switchWorld(worldName);

    }
}