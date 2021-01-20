import INotification from "../../Core/PureMVC/interface/INotification";
import AppSimpleCommand from "../AppSimpleCommand";
import Global from "../Global";
import CheckHotUpdateProxy from "../Model/Proxy/CheckHotUpdateProxy";

export default class CheckHotUpdateCmd extends AppSimpleCommand {
    doExecute(notification: INotification): void {
        let hotProxy = <CheckHotUpdateProxy>Global.facade.retrieveProxy(cc.js.getClassName(CheckHotUpdateProxy))
        hotProxy.startUpdate(notification.getBody());
    }
    
}