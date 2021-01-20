import { EnumUI } from "../../../../../Scripts/App/Enum/EnumUI";
import Global from "../../../../../Scripts/App/Global";
import AppMediator from "../../../../../Scripts/App/View/AppMediator";
import UIPopAnim from "../../../../../Scripts/Core/UI/UIPopAnim";
import { cccExtensionClass } from "../../../../../Scripts/Lib/CCC";
import ChangeAccountUI from "./ChangeAccountUI";

@cccExtensionClass
export default class ChangeAccountMediator extends AppMediator {
    viewComponent:ChangeAccountUI;
    uiPopAnim:UIPopAnim = new UIPopAnim();
    onActive(): void {
        this.uiPopAnim.init(this.viewComponent.nodeMain);
        this.uiPopAnim.playShowIn();
        this.addClickEvent(this.viewComponent.btnClose, this.onBtnCloseClicked.bind(this));
    }
    onDestroy(): void {
        
    }

    async onBtnCloseClicked(){
        await this.uiPopAnim.playHideOut(); 
        Global.uiMgr.hideUI(EnumUI.LoginChangeAccount);
    }
    
}