import INotification from "../../../../../Scripts/Core/PureMVC/interface/INotification";
import AppMediator from "../../../../../Scripts/App/View/AppMediator";
import { EnumEvents } from "../../../../../Scripts/App/Enum/EnumEvents";
import Global from "../../../../../Scripts/App/Global";
import { cccExtensionClass } from "../../../../../Scripts/Lib/CCC";
import LaunchUI from "../UI/LaunchUI";

@cccExtensionClass
export default class LaunchUIMediator extends AppMediator {
    viewComponent : LaunchUI;
    targetProgress: number = 0.4;
    progressSpeed : number = 0.2;
    curProgeress  : number = 0;

    onActive(): void {
        this.viewComponent.nodeProgress.progress = 0;
        this.registerNotification(EnumEvents.GameLaunchEvent, this.onGameInitEvent)    
        Global.timerMgr.setSchedule(this.getMediatorName(), this.update.bind(this), 1/60, -1, 0);
        this.viewComponent.updateProgress(this.curProgeress);
    }


    onDestroy(): void {
        this.viewComponent.unscheduleAllCallbacks();
        Global.timerMgr.unSchedule(this.getMediatorName());
    }

    update(dt:number){
        if(this.curProgeress <= 1){
            this.curProgeress += (this.progressSpeed) * 1/60;
            this.curProgeress >= this.targetProgress && (this.curProgeress = this.targetProgress);
            this.viewComponent.updateProgress(this.curProgeress);
        }
    }
    
    onGameInitEvent(notification: INotification){
        this.targetProgress = <number>notification.getBody();
        this.progressSpeed = (this.targetProgress - this.curProgeress);
        this.viewComponent.nodeProgress.progress = notification.getBody();
    }
}