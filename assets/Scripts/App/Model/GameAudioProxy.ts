import { cccExtensionClass } from "../../Lib/CCC";
import AppProxy from "../AppProxy";
import Global from "../Global";
import GameAudioModel from "./GameAudioModel";
import GameLocalDataProxy from "./GameLocalDataProxy";

@cccExtensionClass
export default class GameAudioProxy extends AppProxy {
    localDataProxy:GameLocalDataProxy;
    audioData:GameAudioModel;
    onActive(): void {
        this.audioData = new GameAudioModel();
        this.localDataProxy = <GameLocalDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(GameLocalDataProxy));
        cc.game.on(cc.game.EVENT_HIDE, this._hideToBackGround, this);
        cc.game.on(cc.game.EVENT_SHOW, this._showFromBackGround, this);
    }
    onDestroy(): void {
        cc.game.off(cc.game.EVENT_HIDE, this._hideToBackGround, this);
        cc.game.off(cc.game.EVENT_SHOW, this._showFromBackGround, this);
    }
    private _showFromBackGround(){
        cc.audioEngine.resumeAll();
    }
    private _hideToBackGround(){
        cc.audioEngine.pauseAll();
    }



}