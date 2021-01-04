import UIBase from "../../../../../Scripts/Core/UI/UIBase";

export default class LoginUI extends UIBase {
    btnLogin        : cc.Node;
    btnChangeAccount:  cc.Node;
    onLoad(){
        this.btnLogin         = this.findChild("btnLogin");
        this.btnChangeAccount = this.findChild("btnChangeAccount");
    }
}