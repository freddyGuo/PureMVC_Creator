import { LanLabelFont } from "../../App/Enum/EnumLan";
import Global from "../../App/Global";

const {ccclass, property, executeInEditMode, menu} = cc._decorator;
@ccclass
@executeInEditMode
@menu("MultiLan/LanLabel")
export default class LanLabel extends cc.Label {
    @property({serializable:true})
    private _lanStr:string | { key: string, isLan: boolean }[] = "";

    @property({ type: cc.String })
    get lanString() {
        return this._lanStr;
    }

    set lanString(value: string | { key: string, isLan: boolean }[]) {
        this._lanStr = value;
        this.string = Global.lanMgr.getLanStr(value);
    }

    start(){
        let fontUrl = LanLabelFont[Global.lanMgr.curLan];
        if(this.font && fontUrl){
            Global.loaderMgr.loadRes(fontUrl, cc.Font).then((res:cc.Font)=>{
                this.font = res;
            }, ()=>{})
        }
        Global.lanMgr.addLanLabel(this);
    }




    onDestroy(){
        Global.lanMgr.removeLanLabel(this);
    }


    
}