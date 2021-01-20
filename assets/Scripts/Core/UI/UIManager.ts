import AppMediator from "../../App/View/AppMediator";
import { EnumUILevel } from "../../App/Enum/EnumUI";
import Global from "../../App/Global";
import UIBase from "./UIBase";

class UIInfo {
    /** ui path alse ui name */
    name: string = "";
    /** the ui base class of  bind  */
    uiClass: any;       
    resPath: string;      
    mediatorList:AppMediator[] = [];
    cleanScheduleName:string = "";
    cleanTime:number = 2;
}
export default class UIMananger {
    private uiInfoDict: { [name: string]: UIInfo; } = {};
    private uiDict: { [name: string]: UIBase; } = {};
    private layerNodeList:Map<EnumUILevel, cc.Node> = new Map();
    
    private setUIParent(level:EnumUILevel, node:cc.Node){
        let parentNode = this.layerNodeList.get(level);
        if(parentNode){
            node.parent = parentNode;
        }else{
            Global.logger.error("current UI Level not registed " + level);
        }
    }

    private getUI<T extends UIBase>(name: string): T {
        return this.uiDict[name] as T;
    }

    private getUIInfo(name: string) {
        return this.uiInfoDict[name];
    }

    public bindUILevel(level:EnumUILevel, node:cc.Node){
        if(!node){
            throw new Error(`bindUILevel faile node is null`);
        }
        this.layerNodeList.set(level, node);
    }
    /**
     * Register UI interface, a Prefab corresponds to uiclass
     * @param path The path of prefab under the resources file
     * @param uiClass Loaded inherited UIBase components
     */
    public registerUI(path:string, uiClass:any){
        let info = this.uiInfoDict[path];
        if(!info){
            info = new UIInfo();
            info.cleanScheduleName = "End_" + path;
        }
        info.name    = path;
        info.resPath = path;
        info.uiClass = uiClass;
        this.uiInfoDict[path] = info;
    }

    
    

    // public showRepeatUI(name: string, zIndex:EnumUILevel){
    //     return new Promise((resolved, reject)=>{
    //         let uiInfo = this.getUIInfo(name); 
    //         Global.loaderMgr.loadRes(uiInfo.resPath, cc.Prefab).then((resounce:cc.Prefab)=>{
    //             let layer:cc.Node = cc.instantiate(resounce)
    //             !layer.getComponent(uiInfo.uiClass) && (layer.addComponent(uiInfo.uiClass));
    //             this.setUIParent(zIndex, layer);
    //             let ui = layer.getComponent(uiInfo.uiClass);
    //             ui.node.active = true;
    //             resolved(ui);
    //         }, reject)
    //     })
    // }

    /**
     * Display a UI layer, please remember to register the UI before
     * @param name 
     * @param level 
     * @param newMediatorList 
     */
    public async showUI(name: string, level:EnumUILevel, newMediatorList:AppMediator[] = []){
        let uiInfo = this.getUIInfo(name);
        if(!uiInfo){
            Global.logger.error("uiManager showUI faile,uiInfo is null, this ui not registered")
            return 
        }
        let ui = this.getUI(name);
        if(ui){
            ui.node.active = true;
            newMediatorList.forEach(med=>med.setViewComponent(ui));
        }else{
            try {
               let resounce =   await Global.loaderMgr.loadRes(uiInfo.resPath, cc.Prefab) as cc.Prefab;
               let layer:cc.Node = cc.instantiate(resounce)
               !layer.getComponent(uiInfo.uiClass) && (layer.addComponent(uiInfo.uiClass));
               this.setUIParent(level, layer);
               ui = layer.getComponent(uiInfo.uiClass);
               this.uiDict[name] = ui;
               ui.node.active = true;
               newMediatorList.forEach(med=>med.setViewComponent(ui));
            } catch (error) {
                Global.logger.error("UIManager showUI Error: " + error);
            }
        }
        //Update the new mediator list
        newMediatorList.forEach(mediator=>{
            if(!uiInfo.mediatorList.find(exMe=>exMe.getMediatorName() == mediator.getMediatorName())){
                uiInfo.mediatorList.push(mediator)
            }
        })
        Global.timerMgr.unSchedule(uiInfo.cleanScheduleName);
        return ui 
    }
    /**
     * Destroy a UI immediately and remove the related mediator
     * @param name 
     */
    public destroyUI(name:string){
        console.log("destroyUI ", name)
        let uiInfo = this.getUIInfo(name);
        let ui = this.getUI(name);
        //Remove the Mediator proxy corresponding to this UI
        uiInfo.mediatorList.forEach(mediator=>Global.facade.removeMediator(mediator.getMediatorName()));
        if(ui && ui.node){
            ui.node.destroy();
        }
        this.uiDict[name] = null;
        Global.timerMgr.unSchedule(uiInfo.cleanScheduleName);
    }
    /**
     * Hide the UI and immediately start the destruction countdown
     * @param name 
     */
    public hideUI(name: string){
        let uiInfo = this.getUIInfo(name);
        let ui = this.getUI(name);
        ui && ui.node && (ui.node.active = false);
        Global.timerMgr.unSchedule(uiInfo.cleanScheduleName);
        //Start destruction countdown
        Global.timerMgr.setSchedule(uiInfo.cleanScheduleName, ()=>{
            this.destroyUI(name);
        },uiInfo.cleanTime, 1, uiInfo.cleanTime);
    }
}