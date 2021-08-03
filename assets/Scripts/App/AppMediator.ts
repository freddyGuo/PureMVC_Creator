import INotification from "../Core/PureMVC/interface/INotification";
import { PureMediator } from "../Core/PureMVC/PureMediator";
import { PureObserver } from "../Core/PureMVC/PureObserver";
import UIBase from "../Core/UI/UIBase";
import { EnumAudio } from "./Enum/EnumAudio";
import Global from "./Global";

export default  abstract class AppMediator extends PureMediator {
    private _notificationMap:Map<string, Function>;
    public mediatorName: string;
    public viewComponent: any;
    /** 当创建的时候 */
    abstract onActive():void;
    /** 当销毁的时候 */
    abstract onDestroy():void;
    /** 当重新激活的时候 */
    abstract onResume():void;
    /** 当隐藏的时候 */
    abstract onPaused():void;
    /**
     * set view Component then active mediator
     * Because loading UI Node may be asynchronous, wait until UI Node is loaded before onActive
     * @param ui 
     */
    setViewComponent(ui:UIBase){
        if(this.viewComponent != UIBase){
            super.setViewComponent(ui);
            this.onActive()
        }
    }

    getMediatorName(): string {
        return cc.js.getClassName(this);
    }
    
    
    onRegister(){
        this._notificationMap = new Map();
    }

    onRemove(){
        this._notificationMap.forEach((ab, name:string)=>{
            Global.facade.view.removeObserver(name, this)
        })
        this._notificationMap = undefined;
        this.onDestroy();
    }

    /**
     * Add a new way to register PureObserver, after Mediator is registered, you can also register observer.
     * And when the mediator is removed, it will automatically cancel the monitoring
     * @param name Listening message name
     * @param callback Main message method
     */
    registerNotification(name:string, callback:Function){
        this._notificationMap.set(name, callback);
        Global.facade.view.registerObserver(name, new PureObserver(callback, this))
    }

    handleNotification(notification: INotification){
        super.handleNotification(notification);
    }

    /**
     * Register button click event
     * @param clickeNode 
     * @param callback 
     * @param soundPath sound path
     * @param param 
     * @param time How much time can only be clicked again, the default is 0.2 seconds
     */
    public addClickEvent(clickeNode: cc.Node, callback: Function, soundPath?: string, param?: any, time?: number){
        if (!clickeNode) {
            Global.logger.error("addClickEvent clickedNode is null");
            return
        }
        clickeNode.targetOff(cc.Node.EventType.TOUCH_END);
        let button = clickeNode.getComponent(cc.Button);
        if (!time) {
            time = 0.2
        }
        if (!param) {
            param = null
        }
        if (!soundPath) {
            soundPath = EnumAudio.BtnClick_Sound;
        }
        clickeNode.on(cc.Node.EventType.TOUCH_END, (dt) => {
            let isOkPlaySound = (soundPath && soundPath.trim() != "");
            isOkPlaySound && Global.audioMgr.playSound(soundPath);
            callback && callback(param);
            button && (button.interactable = false);
            clickeNode.getComponent(cc.Component).scheduleOnce(() => {
                button && (button.interactable = true);
            }, time)
        });
    }

    public setScripteEnabled(sprite:cc.Sprite, isEnable:boolean = true){
        sprite["_sgNode"].setState(isEnable ? 0 : 1);
    }
}