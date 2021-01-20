import IWorld from "../../../../../Scripts/Core/World/IWorld";
import { EnumWorld } from "../../../../../Scripts/App/Enum/EnumWorld";
import { EnumUI, EnumUILevel } from "../../../../../Scripts/App/Enum/EnumUI";
import Global from "../../../../../Scripts/App/Global";
import LaunchUI from "../UI/LaunchUI";
import LaunchUIMediator from "../Mediator/LaunchUIMediator";
import AppMediator from "../../../../../Scripts/App/View/AppMediator";
import {EnumEvents } from "../../../../../Scripts/App/Enum/EnumEvents";
import { EnumCommand } from "../../../../../Scripts/App/Enum/EnumCommand";
import { EnumGameID } from "../../../../../Scripts/App/Enum/EnumGameID";

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
        Global.facade.sendNotification(EnumCommand.InitApp);        
        // Global.facade.sendNotification(EnumEvents.GameLaunchEvent, 0.5);   
        // 
    }
    // enterGame(){
    //     Global.facade.sendNotification(EnumCommand.ChangeWorld, EnumWorld.Login);
    // }

}