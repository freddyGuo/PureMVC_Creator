import Global from "../App/Global";

interface  TimerManagerInfo {
    name    : string;
    func    : Function;
    interval: number;
    repeat  : number;
    delay   : number;
    curtime : number;
    count   : number;
}
/**
 * 时间事件管理器
 */
export default class TimerManager extends cc._BaseNode{
    private _time: number = 0;
    private timer: cc.Scheduler;
    private ccCmpt:cc.Component;
    private frameCount:number;
    private scheduleMap: Map<string, TimerManagerInfo> = new Map();

    public init():void{
        this._time = new Date().getTime(); 
        this.timer = cc.director.getScheduler();
        this.setScheduleUpdate(this);
    }

    update(dt){
        this._time += dt * 1000;
        this.frameCount += 1;
        // this.serverTime += dt;
        let removeList = [];
        this.scheduleMap.forEach((v, key) => {
            let obj = v;
            if (obj) {
                obj.curtime += dt;
                if ((obj.count == 0 && obj.curtime >= obj.delay + obj.interval) || obj.curtime >= obj.interval) {
                    obj.count += 1;
                    obj.curtime = 0;
                    obj.func && obj.func();
                    if (obj.repeat > 0 && obj.count >= obj.repeat) {
                        removeList.push(key);
                    }
                }
                if (obj.repeat > 0 && obj.count >= obj.repeat) {
                    removeList.push(key);
                }
            }
        });
        removeList.forEach(key => {
            this.scheduleMap.delete(key);
        });
    }

    /**
     * Set timer method that can be cancelled
     * @param name timer func name 
     * @param func 
     * @param interval The time period of the call, in seconds
     * @param repeat The number of repetitions, 0 means repeating consistently
     * @param delay How long to delay execution, in seconds
     */
    setSchedule(name: string, func: Function, interval: number, repeat: number = 0, delay: number = 0) {
        if (!this.scheduleMap.get(name)) {
            let obj:TimerManagerInfo = {
                name    : name,
                func    : func,
                interval: interval,
                repeat  : repeat,
                delay   : delay,
                curtime : 0,
                count   : 0,
            }
            this.scheduleMap.set(name, obj);
        }else {
            Global.logger.error("TimmerMannager.setSchedule faile: aleady set the name", name);
        } 
    }

    /**
     * cancel timer func
     * @param func 
     * @param target 
     */
    unSchedule(name: string) {
        this.scheduleMap.delete(name);
    }

     /**
     * The update timer is triggered every frame, and the triggered function is the update function on the target. 
     * The lower the priority value, the earlier the timer is triggered.
     * @param target 
     */
    setScheduleUpdate(target: any, priority: number = 0, paused: boolean = false) {
        this.timer.scheduleUpdate(target, priority, paused, undefined);
    }

    /**
    * Cancel the update timer of the specified object.
    * @param target 
    */
    unscheduleUpdate(target: any) {
        this.timer.unscheduleUpdate(target);
    }


}