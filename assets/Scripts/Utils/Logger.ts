/**
 * copyright (c) 2020 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * @author freddyGuo<https://github.com/freddyGuo>
 */
export const enum LoggerLevel { DEBUG, LOG, INFO, WARN, ERROR }
/**
 * Game printing log tool
 */
export default class Logger {
    private date:Date;
    public tag: string = "[Mo]"; //可以设置当前游戏的前缀

    private LEVEL: number = LoggerLevel.DEBUG; //当前Logger等级

    public set logLeveL(lv: LoggerLevel) {
        this.LEVEL = lv;
    }
    public  formatNow() {
        this.date  = new Date(); //后端返回的时间戳是秒
        return this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate() + " " + 
        this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds() + ":" + this.date.getMilliseconds();
    }

    public debug(...params) {
        if (this.LEVEL > LoggerLevel.DEBUG) {
            return;
        }
        console.trace(this.tag + "[" + this.formatNow() + "]" + "[" + this.formatNow() + "] ", ...params);
    }

    public log(...params) {
        if (this.LEVEL > LoggerLevel.LOG) {
            return;
        }
        console.log(this.tag + "[" + this.formatNow() + "]" + "[" + this.formatNow() + "] ", ...params);
    }

    public info(...params) {
        if (this.LEVEL > LoggerLevel.INFO) {
            return;
        }
        console.info(this.tag + "[" + this.formatNow() + "]" + "[" + this.formatNow() + "] ", ...params);
    }

    public warn(...params) {
        if (this.LEVEL > LoggerLevel.WARN) {
            return;
        }
        console.warn(this.tag + "[" + this.formatNow() + "]" + "[" + this.formatNow() + "] ", ...params);
    }

    public error(...params) {
        if (this.LEVEL > LoggerLevel.ERROR) {
            return;
        }
        console.error(this.tag + "[" + this.formatNow() + "]" + "[" + this.formatNow() + "] ", ...params);
    }
}