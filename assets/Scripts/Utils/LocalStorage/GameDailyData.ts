/**
 * copyright (c) 2020 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * @author freddyGuo<https://github.com/freddyGuo>
 */
import { EnumLocalStorage } from "../../App/Enum/EnumLocalStorage";
import Global from "../../App/Global";


/**
 * Daily data of the game, restarting after one day will restore the data of the day before 
 * yesterday to the default state
 */
export class GameDailyData {
    /**  storage day data flag of the game */
    private _dayTag:string = "";
    private _loginCount:number = 0;


    /** Number of logins per day */
    get loginCount(){
        return this._loginCount;
    }
    set loginCount(count:number){
        this._loginCount = count;
        this.save();
    }

    init(){
        try {
            let date = new Date();
            this._dayTag = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
            let oldData = JSON.parse(Global.dataMgr.localDB.getString(EnumLocalStorage.DailyData, "{}"))
            if(oldData._dayTag == this._dayTag){
                for(let k in oldData){
                    this[k] = oldData[k];
                }
            }else {
                this.save();
            }
        } catch (error) {
            Global.logger.error("GameDailyData.init faile:" + error);
        }
    }
    
    public save(){
        try {
            Global.dataMgr.localDB.setData(EnumLocalStorage.DailyData, JSON.stringify(this));
        } catch (error) {
            Global.logger.error("GameDailyData.persistent faile:" + error); 
        }
        
    }
}
