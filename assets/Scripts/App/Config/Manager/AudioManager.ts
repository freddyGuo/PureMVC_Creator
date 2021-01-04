import { EnumLocalStorage } from "../../Enum/EnumLocalStorage";
import Global from "../../Global";

export default class AudioManager {
    private playingBackgroundMusic: number = -1;      // 播放中的背景音乐ID
    private playingSoundList = [];         // 播放中的音效
    private playingMusicList: number[] = [];         // 播放中的音乐

    private _musicVolumn: number = 0.6;                // 音乐音量
    private _soundVolumn: number = 0.9;                // 音效音量
    private isVirate: boolean = false;              // ？

    init(){
        this._musicVolumn = Global.dataMgr.localDB.getNumber(EnumLocalStorage.MusicVolumn, 0.6);
        this._soundVolumn = Global.dataMgr.localDB.getNumber(EnumLocalStorage.SoundVolumn, 0.9);
        // 
        // this.isVirate = LocalStorage.getBool(EnumLocalStorageKey.MUSIC_VIRATE);
        // cc.game.on(cc.game.EVENT_HIDE, this._hideToBackGround, this);
        // cc.game.on(cc.game.EVENT_SHOW, this._showFromBackGround, this);  
    }

    get musicVolumn(){
        return this._musicVolumn;
    }
    
    set musicVolumn(volumn:number){
        volumn < 0 && (volumn = 0);
        volumn > 1 && (volumn = 1);
        this._musicVolumn = volumn;
        Global.dataMgr.localDB.setData(EnumLocalStorage.MusicVolumn, this._musicVolumn);
    }

    get soundVolumn(){
        return this._soundVolumn;
    }

    set soundVolumn(volumn:number){
        volumn < 0 && (volumn = 0);
        volumn > 1 && (volumn = 1);
        this._soundVolumn = volumn;
        Global.dataMgr.localDB.setData(EnumLocalStorage.MusicVolumn, this._soundVolumn);
    }
    
}