import AppFacade from "../../App/AppFacade";
import AppMediator from "../../App/AppMediator";
import { EnumUILevel } from "../../App/Enum/EnumUI";
import Global from "../../App/Global";
import UIBase from "./UIBase";

class UIInfo {
    /** ui path alse ui name */
    name: string = "";
    /** the ui base class of  bind  */
    uiClass: any;       
    resPath: string;      
    mediatorMap:Map<string, AppMediator>= new Map();
    cleanScheduleName:string = "";
    cleanTime:number = 2;
}
export default class UIMananger {
    private uiInfoDict: { [name: string]: UIInfo; } = {};
    private uiLayerMap:Map<string, UIBase> = new Map();
    private layerNodeList:Map<EnumUILevel, cc.Node> = new Map();

    private setUIParent(level:EnumUILevel, node:cc.Node){
        let parentNode = this.layerNodeList.get(level);
        if(parentNode && node){
            try {
                node.parent = parentNode;
            } catch (error) {
               console.log(error); 
            }
        }else{
            Global.logger.error("current UI Level not registed " + level);
        }
    }

    private getUI<T extends UIBase>(name: string): T {
        return this.uiLayerMap.get(name) as T;
    }

    private getUIInfo(name: string) {
        return this.uiInfoDict[name];
    }

    private updateMediatorList(name: string, newMediatorList:AppMediator[] = []){
        let uiInfo = this.getUIInfo(name);
        let ui = this.getUI(name);
        //Update the new mediator list
        newMediatorList.forEach(mediator=>{
            let name = mediator.getMediatorName() 
            if(!uiInfo.mediatorMap.get(name)){
                mediator.setViewComponent(ui);
                uiInfo.mediatorMap.set(name, mediator);
            }
            mediator.onResume();
        })
        
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
    public loadPrefab(path:string){
        return new Promise((resolved, reject)=>{
            cc.loader.loadRes(path, cc.Prefab, (err, prefab:cc.Prefab)=>{
                if(err){
                    Global.logger.error("loadPrefab err:", err)
                    reject(err)
                }else{
                    resolved(prefab)
                }
            })
        })
    }
    /**
     * Display a UI layer, please remember to register the UI before
     * @param name 
     * @param level 
     * @param newMediatorList 
     */
    public async showUI(name: string, level:EnumUILevel, mediatorList:AppMediator[] = [] = []){
        let uiInfo = this.getUIInfo(name);
        let newMediatorList = mediatorList.filter(mediator=>mediator != null);
        if(mediatorList.length != newMediatorList.length){
            Global.logger.info("error mediatorList", mediatorList);
            Global.logger.error("uiManager showUI faile, has mediator someone on register");
        }
        if(!uiInfo){
            Global.logger.error("uiManager showUI faile,uiInfo is null, this ui not registered")
            return 
        }
        Global.timerMgr.unSchedule(uiInfo.cleanScheduleName);
        let ui = this.getUI(name);
        if(ui){
            ui.node.active = true;
            this.updateMediatorList(name, newMediatorList);
        }else{
            try {
               let resounce = await this.loadPrefab(uiInfo.resPath) as cc.Prefab;
               let layer:cc.Node = cc.instantiate(resounce)
               !layer.getComponent(uiInfo.uiClass) && (layer.addComponent(uiInfo.uiClass));
               this.setUIParent(level, layer);
               ui = layer.getComponent(uiInfo.uiClass);
               this.uiLayerMap.set(name, ui);
               ui.node.active = true;
               this.updateMediatorList(name, newMediatorList);
            } catch (error) {
                Global.logger.error("UIManager showUI Error: " + error);
            }
        }
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
        uiInfo.mediatorMap.forEach(mediator=>Global.facade.removeMediator(mediator.getMediatorName()));
        uiInfo.mediatorMap.clear();
        if(ui && ui.node){
            ui.node.destroy();
        }
        this.uiLayerMap.delete(name);
        Global.timerMgr.unSchedule(uiInfo.cleanScheduleName);
    }
    /**
     * Hide the UI and immediately start the destruction countdown
     * The purpose of delayed destruction is to prevent frequent creation of a page when frequently clicked
     * @param name 
     */
    public hideUI(name: string){
        let uiInfo = this.getUIInfo(name);
        let ui = this.getUI(name);
        ui && ui.node && (ui.node.active = false);
        Global.timerMgr.unSchedule(uiInfo.cleanScheduleName);
        uiInfo.mediatorMap.forEach(mediator=>mediator.onPaused());
        //Start destruction countdown 
        Global.timerMgr.setSchedule(uiInfo.cleanScheduleName, ()=>{
            this.destroyUI(name);
        },uiInfo.cleanTime, 1, uiInfo.cleanTime);
    }
    /**
     * destroy all UI
     */
    clean(){
        this.uiLayerMap.forEach((info, name)=>{
            this.destroyUI(name)
        })
    }
}