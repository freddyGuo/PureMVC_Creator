import { EnumAudio } from "../../../../../Scripts/App/Enum/EnumAudio";
import { EnumUI, EnumUILevel } from "../../../../../Scripts/App/Enum/EnumUI";
import Global from "../../../../../Scripts/App/Global";
import AppMediator from "../../../../../Scripts/App/AppMediator";
import ChangeAccountMediator from "./ChangeAccountMediator";
import LoginUI from "./LoginUI";

export default class LoginMediator extends AppMediator {
    onResume(): void {
        
    }
    onPaused(): void {
        
    }
    viewComponent:LoginUI;
    onActive(): void {
        this.addClickEvent(this.viewComponent.btnChangeAccount, this.onBtnChangeAccountClicked.bind(this));
        this.addClickEvent(this.viewComponent.btnLogin, this.onBtnChangeAccountClicked.bind(this));
    }

    onBtnChangeAccountClicked(){
        let accountMediator = <ChangeAccountMediator>Global.facade.getAndCreateMediator(new ChangeAccountMediator());
        Global.uiMgr.showUI(EnumUI.LoginChangeAccount, EnumUILevel.Middle, [accountMediator]);
    }

    onBtnLogin(){
        let accountMediator = <ChangeAccountMediator>Global.facade.getAndCreateMediator(new ChangeAccountMediator());
        Global.uiMgr.showUI(EnumUI.LoginChangeAccount, EnumUILevel.Middle, [accountMediator]);
    }    


    onDestroy(): void {
        
    }
    
}