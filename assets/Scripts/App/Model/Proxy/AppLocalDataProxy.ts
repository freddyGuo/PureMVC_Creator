/**
 * copyright (c) 2020-2030 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * @author freddyGuo<https://github.com/freddyGuo>
 */
import { cccExtensionClass } from "../../../Lib/CCC";
import AppProxy from "../../AppProxy";
import Global from "../../Global";
import {AppDailyData, AppLocalDataModel} from "../AppLocalDataModel";

@cccExtensionClass
export default class AppLocalDataProxy extends AppProxy {
    public localData:AppLocalDataModel;
    /**  storage flag of the game */
    private _localTag:string = "MoCreator";
    onActive(): void {
        this.localData = new AppLocalDataModel();
    }

    onDestroy(): void {
        this.saveLocalData();
    }

    public saveLocalData(){
        try {
            cc.sys.localStorage.setItem(this._localTag, JSON.stringify(this.localData));
        } catch (error) {
            Global.logger.error("AppLocalDataProxy.saveLocalData Error", error)
        }
    }   
    /**
     * Get the persistent data stored in the local database and refresh
     */
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
                    this.checkDailyData();
                } 
            }
        } catch (error) {
            Global.logger.error("AppLocalDataProxy.initSavedLocalData Error", error)
        }
    }
    /**
     * Check whether the daily data in the game is out of date
     */
    checkDailyData(){
        let date = new Date();
        let dayTag = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
        if(dayTag !== this.localData.dailyData.dailyKey){
            this.localData.dailyData = new AppDailyData();
            this.localData.dailyData.dailyKey = dayTag;
            this.saveLocalData();
        }
    }

    
    /**
     * !!!Please call this method carefully, it will refresh the data from the local storage again
     * @param tag 
     */
    public setLocalTag(tag:string){
        if(!tag || tag.trim().length <1){
            Global.logger.error("AppLocalDataProxy.setLocalTag  Error: tag is null " + tag)
        }else {
            this._localTag = tag;
        }
        this.initSavedLocalData();
    }
}