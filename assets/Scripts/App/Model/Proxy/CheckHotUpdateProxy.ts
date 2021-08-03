import { cccExtensionClass } from "../../../Lib/CCC";
import AppProxy from "../../AppProxy";
import { EnumGameID } from "../../Enum/EnumGameID";
import Global from "../../Global";
import AppHotUpdateData from "../AppHotUpateData";
import AppDataProxy from "./AppDataProxy";
import AppLocalDataProxy from "./AppLocalDataProxy";

@cccExtensionClass
export default class CheckHotUpdateProxy extends AppProxy{
    private gameDataProxy:AppDataProxy;
    private localDataProxy:AppLocalDataProxy;
    private updateData:AppHotUpdateData;
    onActive(): void {
        this.updateData = new AppHotUpdateData();
        this.setData(this.updateData);
        this.init();
        this.gameDataProxy  = <AppDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(AppDataProxy));
        this.localDataProxy = <AppLocalDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(AppLocalDataProxy))
    }
    getData():AppHotUpdateData {
        return this.updateData;
    }
    onDestroy(): void {
        
    }

    init(){
        
    }

    startUpdate(gameId:EnumGameID){
        if(this.updateData.updateList.findIndex(id=>id== gameId) != -1){
            this.updateData.updateList.push(gameId);
            (this.updateData.curUpdateId == -1) && this.doUpdateGame();
        }        
    }

    doUpdateGame(){
        if(this.updateData.updateList.length < 1){
            this.updateData.curUpdateId = -1;
            return 
        }
        let gameId = this.updateData.updateList.shift()
        this.updateData.curUpdateId = gameId;
        this.resetUpdateData();
        
    }

    resetUpdateData(){
        this.updateData.totalBytes = 0;
        this.updateData.downloadedBytes = 0;
    }
}