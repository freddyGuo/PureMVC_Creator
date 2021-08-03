import { EnumUI } from "../../../../../Scripts/App/Enum/EnumUI";
import Global from "../../../../../Scripts/App/Global";
import AppMediator from "../../../../../Scripts/App/AppMediator";
import UIPopAnim from "../../../../../Scripts/Core/UI/UIPopAnim";
import { cccExtensionClass } from "../../../../../Scripts/Lib/CCC";
import ChangeAccountUI from "./ChangeAccountUI";

@cccExtensionClass
export default class ChangeAccountMediator extends AppMediator {
    
    viewComponent:ChangeAccountUI;
    uiPopAnim:UIPopAnim = new UIPopAnim();
    onActive(): void {
        console.log("onActive")
        this.uiPopAnim.init(this.viewComponent.nodeMain);
        this.addClickEvent(this.viewComponent.btnClose, this.onBtnCloseClicked.bind(this));
    }

    onResume(): void {
        console.log("__onResume__")
        this.uiPopAnim.playShowIn(); 
    }
    onPaused(): void {
        
    }


    onDestroy(): void {
        
    }

    async onBtnCloseClicked(){
        await this.uiPopAnim.playHideOut(); 
        Global.uiMgr.hideUI(EnumUI.LoginChangeAccount);
    }
    
}