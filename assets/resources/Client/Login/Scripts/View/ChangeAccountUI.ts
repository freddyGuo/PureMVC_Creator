import UIBase from "../../../../../Scripts/Core/UI/UIBase";
export default class ChangeAccountUI extends UIBase {
    nodeMain:cc.Node;
    btnClose:cc.Node;
    onLoad(){
        this.nodeMain = this.findChild("nodeMain");
        this.btnClose = this.findChild("nodeMain/btnClose");
    }

    onDestroy(){

    }
}