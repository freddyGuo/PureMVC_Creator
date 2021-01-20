import AppAudioData from "./AppAudioData";
import AppCfgData from "./AppCfgData";
import AppPathCfg from "./AppPathCfg";
import WorldData from "./WorldData";

export default class AppDataModel {
    worldData    : WorldData;
    audioData    : AppAudioData;
    pathCfg      : AppPathCfg;
    languageData : Object = {};
    appCfgData:AppCfgData;
    constructor(){
        this.worldData     = new WorldData();
        this.audioData     = new AppAudioData();
        this.pathCfg       = new AppPathCfg();
        this.appCfgData    = new AppCfgData();
    }

}