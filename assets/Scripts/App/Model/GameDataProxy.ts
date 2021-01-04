import { cccExtensionClass } from "../../Lib/CCC";
import AppProxy from "../AppProxy";
import GameDataModel from "./GameDataModel";
import GameLocalDataModel from "./GameLocalDataModel";
@cccExtensionClass
export default class GameDataProxy extends AppProxy {
    private gameData:GameDataModel;
    onActive(): void {
        this.gameData = new GameDataModel();
    }
    onDestroy(): void {
        
    }
    
}