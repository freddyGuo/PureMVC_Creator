import { EnumCommand } from "../../../../Scripts/App/Enum/EnumCommand";
import { EnumEvents } from "../../../../Scripts/App/Enum/EnumEvents";
import { EnumUILevel } from "../../../../Scripts/App/Enum/EnumUI";
import { EnumWorld } from "../../../../Scripts/App/Enum/EnumWorld";
import Global from "../../../../Scripts/App/Global";
import { cccExtensionClass } from "../../../../Scripts/Lib/CCC";
import AdapterHelper from "../../../../Scripts/Utils/UI/AdapterHelper";

const {ccclass} = cc._decorator;

@cccExtensionClass
@ccclass
export default class Driver extends cc.Component {
    onLoad () {
        AdapterHelper.fixApdater();
        Global.create();
        Global.uiMgr.bindUILevel(EnumUILevel.Base, cc.find("nodeBase", this.node));
        Global.uiMgr.bindUILevel(EnumUILevel.Normal, cc.find("nodeNormal", this.node));
        Global.uiMgr.bindUILevel(EnumUILevel.Middle, cc.find("nodeMiddle", this.node));
        Global.uiMgr.bindUILevel(EnumUILevel.Queen, cc.find("nodeQueen", this.node));
        Global.uiMgr.bindUILevel(EnumUILevel.Top, cc.find("nodeTop", this.node));
    }

    start () {
        Global.facade.sendNotification(EnumCommand.ChangeWorld, EnumWorld.Launch);
    }
}
