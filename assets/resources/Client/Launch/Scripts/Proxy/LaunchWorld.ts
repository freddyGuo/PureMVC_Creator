import IWorld from "../../../../../Scripts/Core/World/IWorld";
import { EnumWorld } from "../../../../../Scripts/App/Enum/EnumWorld";
import { EnumUI, EnumUILevel } from "../../../../../Scripts/App/Enum/EnumUI";
import Global from "../../../../../Scripts/App/Global";
import LaunchUI from "../UI/LaunchUI";
import LaunchUIMediator from "../Mediator/LaunchUIMediator";
import AppMediator from "../../../../../Scripts/App/AppMediator";
import { EnumEvents } from "../../../../../Scripts/App/Enum/EnumEvents";

export default class LaunchWorld implements IWorld {
    mediatorList: AppMediator;
    onDestroy() {
        Global.uiMgr.destroyUI(EnumUI.Launch)
    }
    
    initUI() {
        Global.uiMgr.registerUI(EnumUI.Launch, LaunchUI);
    }


    initProxy() {
        
    }
    initCommand() {
              
    }
   
    getWorldName(): string {
        return EnumWorld.Launch;
    }


    async start(){
        let LaunchMediator = Global.facade.getAndCreateMediator(new LaunchUIMediator());
        await Global.uiMgr.showUI(EnumUI.Launch, EnumUILevel.Base, [LaunchMediator]);
        await Global.init();
        Global.facade.sendNotification(EnumEvents.GameInitEvent, 1);
        Global.facade.sendNotification(EnumEvents.ChangeWorld, EnumWorld.Login);
    }
}