import Global from "../../App/Global";

export default class UIBase extends cc.Component {
    /**
     * get the cc.node by the path of  this node
     * @param path 
     */
    findChild(path: string) {
        return cc.find(path, this.node);
    }
    /**
     * Play multiple animations continuously
     * @param animCmpt animation component
     * @param animList animation name
     * @param callback callback function 
     * @param speed animation speed
     */
    async playAnimList(animCmpt: cc.Animation, animList: [string], callback:Function = null, speed:number = 1){
        try {
            for(let i=0; i<animList.length; i++){
                await this.playAnimation(animCmpt, animList[i], speed);
            }
            callback && callback();
        } catch (error) {
            Global.logger.error("UIBase.playAnimList")
        }
    }

    /**
     * play target animation
     * @param animCmpt  animation component
     * @param animName  animation name
     * @param speed  1
     */
    playAnimation(animCmpt: cc.Animation, animName, speed: number = 1){
        return new Promise<void>((resolved, reject)=>{
            try {
                let animState = animCmpt.play(animName) as cc.AnimationState;
                animState.speed = speed;
                let _callFunc = () => {
                    animCmpt.off('finished', _callFunc, this)
                    resolved();
                }
                animCmpt.on('finished', _callFunc, this);
            } catch (error) {
                Global.logger.error("UIBase.playeAnimation Error:", error);
                reject(error);
            }
        })
    }

    setScripteEnabled(sprite:cc.Sprite, isEnable:boolean = true){
        sprite["_sgNode"].setState(isEnable ? 0 : 1);
    }

  
}