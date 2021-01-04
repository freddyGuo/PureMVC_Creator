import AppMediator from "../../../../../Scripts/App/View/AppMediator";
import { EnumEvents } from "../../../../../Scripts/App/Enum/EnumEvents";
import { EnumUI, EnumUILevel } from "../../../../../Scripts/App/Enum/EnumUI";
import { EnumWorld } from "../../../../../Scripts/App/Enum/EnumWorld";
import Global from "../../../../../Scripts/App/Global";
import IWorld from "../../../../../Scripts/Core/World/IWorld";
import LoginMediator from "../View/LoginMediator";
import LoginUI from "../View/LoginUI";

export default class LoginWorld implements IWorld {
    mediatorList: AppMediator;
    async start() {
        let loginMediator = Global.facade.getAndCreateMediator(new LoginMediator());
        await Global.uiMgr.showUI(EnumUI.Login, EnumUILevel.Base, [loginMediator]);
    }
    onDestroy() {
        Global.uiMgr.destroyUI(EnumUI.Login);
    }
    getWorldName(): string {
        return EnumWorld.Login;
    }
    initUI() {
        Global.uiMgr.registerUI(EnumUI.Login, LoginUI);
    }
    initProxy() {
        
    }
    initCommand() {
        
    }
    
}