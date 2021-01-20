/**
 * copyright (c) 2020-2030 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * @author freddyGuo<https://github.com/freddyGuo>
 */
import {EnumLocalStorage } from "../../App/Enum/EnumLocalStorage";
import Global from "../../App/Global";

/**
 * 
 * Store gamified and persistent local data
 */
export default class LocalStorage {
    /**  storage flag of the game */
    private _localTag:string = "MoCreator";
    
    /**
     * Set the storage flag of the game, for example, different game versions can have different flags, 
     * so you don’t need to clear the data every time
     */
    public set dbTag(tag:string){
        if(!tag){
            throw new Error("tag is null");
        }
        this._localTag = tag;
    }
    public get dbTag(){
        return this._localTag;
    }

    public setData(key:EnumLocalStorage, value:number|string|boolean){
        try {
            cc.sys.localStorage.setItem(this.dbTag + key, value.toString());
        } catch (error) {
            Global.logger.error("LocalStorage.setInt Error", error)
        }
    }

    public getNumber(key:EnumLocalStorage, defaultValue:number):number{
        let value:number = defaultValue;
        try {
            value = Number(cc.sys.localStorage.getItem(this.dbTag + key));
            value == null && (value = defaultValue);
        } catch (error) {
            Global.logger.error("LocalStorage.getInt Error", error)
        }
        return value
      
    }

    public getBoolean(key:EnumLocalStorage, defaultValue:boolean):boolean{
        let value:string = defaultValue ? "1" : "0";
        try {
            let saveValue = (cc.sys.localStorage.getItem(this.dbTag + key));
            if(saveValue != null){
                value = saveValue;
            }
        } catch (error) {
            Global.logger.error("LocalStorage.getFloat Error", error)
        }
        return value == "1";
    }

    public getString(key:EnumLocalStorage, defaultValue:string):string{
        let value = defaultValue;
        try {
            value = cc.sys.localStorage.getItem(this.dbTag + key);
            value == null && (value = defaultValue);
        } catch (error) {
            Global.logger.error("LocalStorage.getFloat Error", error)
        }
        return value
    }
}