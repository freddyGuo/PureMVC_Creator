import { EnumLan } from "../Enum/EnumLan"
/**
 * Daily data in the game
 */
export class AppDailyData {
    dailyKey:string = "";
    loginCount:number = 0;
}

/**
 * Local persistent data in the game
 */
export class AppLocalDataModel {
    /** App background music  Volumn */
    soundVolumn: number  = 0.6;
    /** App sound music  Volumn */
    musicVolumn: number  = 1.0;
    /** App background music  Volumn */
    isVirate   : boolean = true;
    gameLan    : EnumLan = EnumLan.zh;
    dailyData:AppDailyData;
    gameVersionList  = {};
    constructor(){
        this.dailyData = new AppDailyData();
    }

}