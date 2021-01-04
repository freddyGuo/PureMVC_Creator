import { cccExtensionClass } from "../../Lib/CCC";
import AppProxy from "../AppProxy";
import Global from "../Global";
import GameLocalDataModel from "./GameLocalDataModel";

@cccExtensionClass
export default class GameLocalDataProxy extends AppProxy {
    public localData:GameLocalDataModel;
    /**  storage flag of the game */
    private _localTag:string = "MoCreator";
    onActive(): void {
        this.localData = new GameLocalDataModel();
    }

    onDestroy(): void {
        this.saveLocalData();
    }

    

    public saveLocalData(){
        try {
            cc.sys.localStorage.setItem(this._localTag, JSON.stringify(this.localData));
        } catch (error) {
            Global.logger.error("GameLocalDataProxy.saveLocalData Error", error)
        }
    }   

    public initSavedLocalData(){
        try {
            let data = cc.sys.localStorage.getItem(this._localTag);
            if(data){
                let fullData = JSON.parse(data);
                console.log("fullData", fullData)
                for (let key in fullData) {
                    if (Object.prototype.hasOwnProperty.call(fullData, key)) {
                        this.localData[key] =  fullData[key];
                    }
                } 
            }
        } catch (error) {
            Global.logger.error("GameLocalDataProxy.initSavedLocalData Error", error)
        }
    }

    

    
    /**
     * !!!Please call this method carefully, it will refresh the data from the local storage again
     * @param tag 
     */
    public setLocalTag(tag:string){
        if(!tag || tag.trim().length <1){
            Global.logger.error("GameLocalDataProxy.setLocalTag  Error: tag is null " + tag)
        }else {
            this._localTag = tag;
        }
        this.initSavedLocalData();
    }
}