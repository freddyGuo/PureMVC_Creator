/**
 * copyright (c) 2020 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * 
 * Game Multilingual Manager
 * @description Get and set the current language of the game
 * @description Broadcast the news that the game language changes
 * @author freddyGuo<https://github.com/freddyGuo>
 */

import { EnumLan } from "../../App/Enum/EnumLan";
import { EnumLocalStorage } from "../../App/Enum/EnumLocalStorage";
import Global from "../../App/Global";
import StringUtil from "../../Utils/StringUtil";
import LanLabel from "./LanLabel";
export default class LanManager {
    /** Current game language  */
    private _curLan:EnumLan = EnumLan.zh; 
    /** the Language.json path under resources folder */
    private _lanCfgPath = "Config/Language";
    private _languageData: Object = {};
    private _LanLaberList:LanLabel[] = [];
    /**
     * Get Current game language
     */
    get curLan():EnumLan{
        return this._curLan;
    }
    /**
     * Set Current game language
    */
    set curLan(lan:EnumLan){
        if(lan == null || lan == undefined){
            throw new Error("LanManager curLan can not set as null or undefined");
        }
        if(this._curLan == lan){
            return
        }

        this._curLan = lan;
        Global.dataMgr.localDB.setData(EnumLocalStorage.GameLanguage, lan);
        this.resetLanbel();
        this.resetSprite();
        this.resetEditBox();
    }

    private resetLanbel(){

    }
    private resetSprite(){

    }
    private resetEditBox(){

    }

    public addLanLabel(lanLaber:LanLabel){
        this._LanLaberList.push(lanLaber)
    }

    public removeLanLabel(lanLaber:LanLabel){
        let index = this._LanLaberList.indexOf(lanLaber);
        index !== -1 && (this._LanLaberList.splice(index, 1));
    }

    public addLanSprite(){

    }

    public removeLanSprite(){

    }

    public addLanEditBox(){

    }

    public removeLanEditBox(){

    }

    
    /**
     * load language.json and cache it
     */
    public async init(){
        let lanJson = await Global.loaderMgr.loadRes(this._lanCfgPath)
        this._languageData = lanJson["json"];
        this.curLan = Global.dataMgr.localDB.getString(EnumLocalStorage.GameLanguage, this._curLan) as EnumLan;
    }

    /**
    * 获取文字
    */
   public getLanStr(opt: string | { key: string, isLan: boolean }[]): string {
       if (typeof opt === "string") {
           return this.translate(opt);
       }
       let endStr = "";
       for (let one of opt) {
           if (one.isLan) {
               endStr += this.translate(one.key);
           } else {
               endStr += one.key;
           }
       }
       return endStr;
   }

    /**
     * Get the content in the currently set language according to the key
     * If replacement text is passed in, it will try to replace
     * @param key 
     * @param args 
     */
    public translate(key: string, ...args) {
        let lan = this._languageData[key];
        if (lan && lan[this.curLan]){
            let text: string = lan[this.curLan];
            args.length > 0 && (text = StringUtil.format(text, args));
            return text;
        }
        return "";
    }

    
}