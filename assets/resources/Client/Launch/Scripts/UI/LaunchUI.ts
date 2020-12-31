import UIBase from "../../../../../Scripts/Core/UI/UIBase"

export default class LaunchUI extends UIBase {
    nodeProgress:cc.ProgressBar;

    onLoad(){
        this.initUI();
    }

    initUI(){
        this.nodeProgress = this.findChild("nodeLoadingProgress").getComponent(cc.ProgressBar);
    }
    
    updateProgress(progress:number){
        this.nodeProgress.progress = progress;
    }
}