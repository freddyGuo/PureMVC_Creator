import INotification from "../../Core/PureMVC/interface/INotification";
import AppSimpleCommand from "../AppSimpleCommand";
import { EnumCommand } from "../Enum/EnumCommand";
import { EnumEvents } from "../Enum/EnumEvents";
import { EnumGameID } from "../Enum/EnumGameID";
import { EnumWorld } from "../Enum/EnumWorld";
import Global from "../Global";
import AppDataProxy from "../Model/Proxy/AppDataProxy";
import AppLocalDataProxy from "../Model/Proxy/AppLocalDataProxy";

export default class InitAppCmd extends AppSimpleCommand {
    gameDataProxy:AppDataProxy;
    async doExecute(notification: INotification): Promise<void> {
        Global.facade.removeCommand(EnumCommand.InitApp);
        this.gameDataProxy = <AppDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(AppDataProxy));
        Global.facade.sendNotification(EnumEvents.GameLaunchEvent, 0.2);
        Global.init();        
        let localDataProxy = <AppLocalDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(AppLocalDataProxy));
        localDataProxy.initSavedLocalData();
        await this.doLoad();
        //If there is no need to update, it will automatically enter the login interface
        if(!this.gameDataProxy.getAppCfgData().isOpenHotupdate){
            Global.facade.sendNotification(EnumCommand.ChangeWorld, EnumWorld.Login);
        }else{
            Global.facade.sendNotification(EnumCommand.CheckAssetsUpdate, EnumGameID.Lobby);
        }
    }

    async doLoad(){
        try {
            await this.doLoadGameLan();
            Global.facade.sendNotification(EnumEvents.GameLaunchEvent, 1);
        } catch (error) {
            Global.logger.error("InitAppCmd.doLoad error " + error);
        }
        
    }

    async doLoadGameLan(){
        let path = this.gameDataProxy.getPathData().lanCfgPath;
        let lanJson = await Global.loaderMgr.loadRes(path) 
        console.log("lanJson", lanJson)
        lanJson && this.gameDataProxy.setLanguageData(lanJson['json']);
    }
}