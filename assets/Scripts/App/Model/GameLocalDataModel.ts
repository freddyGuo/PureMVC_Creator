import { EnumLan } from "../Enum/EnumLan";

/**
 * 
 */
export default class GameLocalDataModel {
    /** App background music  Volumn */
    soundVolumn:number = 0.6;
    /** App sound music  Volumn */
    musicVolumn:number = 1.0;
    /** App background music  Volumn */
    isVirate:boolean   = true;
    gameLan:EnumLan = EnumLan.zh;
}