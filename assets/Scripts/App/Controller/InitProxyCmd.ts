import INotification from "../../Core/PureMVC/interface/INotification";
import AppSimpleCommand from "../AppSimpleCommand";
import Global from "../Global";
import GameLocalDataProxy from "../Model/GameLocalDataProxy";

export default class InitProxyCmd extends AppSimpleCommand {
    doExecute(notification: INotification): void {
        let proxy = <GameLocalDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(GameLocalDataProxy));
        proxy.initSavedLocalData();
    }
}