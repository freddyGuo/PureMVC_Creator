import Global from "../Global";
import AppAudioData from "../Model/AppAudioData";
import AppDataProxy from "../Model/Proxy/AppDataProxy";
import AppLocalDataProxy from "../Model/Proxy/AppLocalDataProxy";

export default class AudioManager {
    localDataProxy:AppLocalDataProxy;
    appDataProxy:AppDataProxy;
    init(){
        this.localDataProxy = <AppLocalDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(AppLocalDataProxy));
        this.appDataProxy = <AppDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(AppDataProxy));
        cc.game.on(cc.game.EVENT_HIDE, this._hideToBackGround, this);
        cc.game.on(cc.game.EVENT_SHOW, this._showFromBackGround, this);
    }

    get audioData(){
        return this.appDataProxy.getAudioData();
    }

    private _showFromBackGround(){
        cc.audioEngine.resumeAll();
    }
    private _hideToBackGround(){
        cc.audioEngine.pauseAll();
    }
    /**
     * 获取游戏背景音乐声音大小
     * @returns 数字区间0-1
     */
    public getMusicVolumn(){
        return this.localDataProxy.localData.musicVolumn;
    }
    
    public setMusicVolumn(volumn:number){
        volumn < 0 && (volumn = 0);
        volumn > 1 && (volumn = 1);
        this.localDataProxy.localData.musicVolumn = volumn;
        this.localDataProxy.saveLocalData();
    }
    /**
     * 获取游戏音效声音大小
     * @returns 数字区间0-1
     */
    public getSoundVolumn(){
        return this.localDataProxy.localData.soundVolumn;
    }
    /**
     * 设置游戏声音大小
     * @param volumn 区间0-1
     */
    public soundVolumn(volumn:number){
        volumn < 0 && (volumn = 0);
        volumn > 1 && (volumn = 1);
        this.localDataProxy.localData.soundVolumn = volumn;
        this.localDataProxy.saveLocalData();
    }
    /**
     * 保存游戏是否震动数据
     * @param isVirate boolean 
     */
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
    /**
     * 停止播放游戏背景音乐
     */
    public stopMusic(){
        cc.audioEngine.stopAll();
        this.audioData.musicId = -1;
    }
    /**
     * 恢复播放游戏背景音乐
     */
    public resumeMusic(){
        this.audioData.musicId != -1 && cc.audioEngine.resume(this.audioData.musicId)
    }
    /**
     * 暂停播放游戏背景音乐
     */
    public pauseMusic(){
        this.audioData.musicId != -1 && cc.audioEngine.pause(this.audioData.musicId)
    }
    /**
     * 播放游戏音效
     * @param path Resources文件下内的资源路径
     * @param callback 播放完毕的回调函数
     */
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
    /**
     * 停止播放所有游戏音效
     */
    public stopAllSound(){
        this.audioData.playingSoundList.forEach(id=>{
            cc.audioEngine.stop(id);
        })
        this.audioData.playingSoundList = [];
    }

}