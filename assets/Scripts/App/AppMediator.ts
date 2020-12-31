import { PureMediator } from "../Core/PureMVC/PureMediator";
import { PureObserver } from "../Core/PureMVC/PureObserver";
import UIBase from "../Core/UI/UIBase";
import Global from "./Global";

export default  abstract class AppMediator extends PureMediator {
    private _notificationMap:Map<string, Function>;
    abstract onActive():void;
    abstract onDestroy():void;
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
}