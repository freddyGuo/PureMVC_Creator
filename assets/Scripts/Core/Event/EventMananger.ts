/**
 * copyright (c) 2020 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * @author freddyGuo<https://github.com/freddyGuo>
 */ 

interface EventManagerInfo {
    func:Function;
    caller:any;
}
/**
 * Event Manager
 * @description add event, send event, remove event
 * 
 */
export class EventManager {
    _eventList:Map<string, EventManagerInfo[]> = new Map();

    /**
     * @name Add Evnent Listener
     * @param name Event Name
     * @param callFunc 
     * @param caller 
     */
    public addListener(name:string, callFunc:Function, caller?:any){
        if(name.trim().length < 1 || !name){
            throw new Error('EventMgr.addListener Error:name is empty');
        }
        if(!callFunc){
            throw new Error('EventMgr.addListener Error:callFunc is null');
        }
        let curEvtList = this._eventList.get(name) || [];
        let exItem = curEvtList.find(item=>{
            return item.func === callFunc && (!item || item.caller == caller)
        });
        if(!exItem){
            curEvtList.push({func:callFunc, caller:caller});
        }
        this._eventList.set(name, curEvtList);
    }
    /**
     * @description Broadcast message event
     * @param name 
     * @param data 
     */
    public disptchListener(name:string, data?:any){
        let curEvtList = this._eventList.get(name) || [];
        //Use slice() to avoid deleting the event when calling the callback
        curEvtList.slice().forEach((eventInfo)=>{
            eventInfo.func && eventInfo.func.call(eventInfo, data, name);
        })
    }
    /**
     * Evnent Listener
     * @param name 
     * @param callFunc 
     * @param caller 
     */
    public removeListener(name:string, callFunc:Function, caller?:any){
        if(name.trim().length < 1 || !name){
            throw new Error('EventMgr.removeListener Error:name is empty');
        }
        if(!callFunc){
            throw new Error('EventMgr.removeListener Error:callFunc is null');
        }
        let curEvtList = this._eventList.get(name) || [];
        for(let i=0; i<curEvtList.length; i++){
            if(curEvtList[i].func == callFunc && caller == curEvtList[i].caller){
                curEvtList.splice(i, 1);
                break;
            }
        }
        this._eventList.set(name, curEvtList);
    }
}