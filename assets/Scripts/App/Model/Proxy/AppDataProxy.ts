import { cccExtensionClass } from "../../../Lib/CCC";
import AppProxy from "../../AppProxy";
import AppDataModel from "../AppDataModel";
@cccExtensionClass
export default class AppDataProxy extends AppProxy {
    private gameData:AppDataModel;
    onActive(): void {
        this.gameData = new AppDataModel();
    }
    onDestroy(): void {
        
    }

    getWorldData(){
        return this.gameData.worldData;
    }

    getAudioData(){
        return this.gameData.audioData;
    }

    getPathData(){
        return this.gameData.pathCfg;
    }

    getLanguageData(){
        return this.gameData.languageData;
    }

    setLanguageData(data){
        this.gameData.languageData = data;
    }

    getAppCfgData(){
        return this.gameData.appCfgData;
    }
    
}