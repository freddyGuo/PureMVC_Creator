import Global from "../Global";
import GameAudioModel from "../Model/GameAudioModel";
import GameLocalDataProxy from "../Model/GameLocalDataProxy";

export default class AudioManager {
    localDataProxy:GameLocalDataProxy;
    audioData:GameAudioModel;
    init(){
        cc.game.on(cc.game.EVENT_HIDE, this._hideToBackGround, this);
        cc.game.on(cc.game.EVENT_SHOW, this._showFromBackGround, this);
    }

    private _showFromBackGround(){
        cc.audioEngine.resumeAll();
    }
    private _hideToBackGround(){
        cc.audioEngine.pauseAll();
    }

    public getMusicVolumn(){
        return this.localDataProxy.localData.musicVolumn;
    }
    
    public setMusicVolumn(volumn:number){
        volumn < 0 && (volumn = 0);
        volumn > 1 && (volumn = 1);
        this.localDataProxy.localData.musicVolumn = volumn;
        this.localDataProxy.saveLocalData();
    }

    public getSoundVolumn(){
        return this.localDataProxy.localData.soundVolumn;
    }

    public soundVolumn(volumn:number){
        volumn < 0 && (volumn = 0);
        volumn > 1 && (volumn = 1);
        this.localDataProxy.localData.soundVolumn = volumn;
        this.localDataProxy.saveLocalData();
    }
    
    public setVirate(isVirate: boolean) {
       this.localDataProxy.localData.isVirate = isVirate;
       this.localDataProxy.saveLocalData();
    }
    /**
     * play game background music
     * @param path 
     */
    public async playMusic(path: string) {
        try {
            let clip = await Global.loaderMgr.loadRes(path, cc.AudioClip) as cc.AudioClip;
            let musicId: number = cc.audioEngine.play(clip, false, this.getSoundVolumn());
            this.audioData.musicId = musicId;
        } catch (error) {
            Global.logger.error(`load music failed ${error}`); 
        }
    }

    public stopMusic(){
        cc.audioEngine.stopAll();
        this.audioData.musicId = -1;
    }

    public resumeMusic(){
        this.audioData.musicId != -1 && cc.audioEngine.resume(this.audioData.musicId)
    }

    public pauseMusic(){
        this.audioData.musicId != -1 && cc.audioEngine.pause(this.audioData.musicId)
    }

    public async playSound(path: string, callback: Function = undefined){
        if (path != "" && this.getSoundVolumn() > 0) {
            try {
                let clip: cc.AudioClip = await Global.loaderMgr.loadRes(path) as cc.AudioClip;
                let audioId: number = cc.audioEngine.play(clip, false, this.getSoundVolumn());
                var finish = () => {
                    let index = this.audioData.playingSoundList.findIndex(id=> audioId == audioId);
                    if (index != -1) {
                        this.audioData.playingSoundList.splice(index, 1);
                    }
                    if (callback != undefined) {
                        callback();
                    }
                };
                cc.audioEngine.setFinishCallback(audioId, finish.bind(this, audioId));
                this.audioData.playingSoundList.push({ audioId: audioId, path: path });
            } catch (error) {
                Global.logger.error(`load sound failed ${error}`);
            }
        }
    }

}