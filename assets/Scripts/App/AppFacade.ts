import ChangeWorldCmd from "./Controller/ChangeWorldCmd";
import ChangeWorldProxy from "./Model/Proxy/ChangeWorldProxy";
import IFacade from "../Core/PureMVC/interface/IFacade";
import { PureFacade } from "../Core/PureMVC/PureFacade";
import AppMediator from "./AppMediator";
import { EnumCommand } from "./Enum/EnumCommand";
import AppDataProxy from "./Model/Proxy/AppDataProxy";
import InitAppCmd from "./Controller/InitAppCmd";
import AppLocalDataProxy from "./Model/Proxy/AppLocalDataProxy";
import CheckHotUpdateCmd from "./Controller/CheckUpdateCmd";
import CheckHotUpdateProxy from "./Model/Proxy/CheckHotUpdateProxy";
import IProxy from "../Core/PureMVC/interface/IProxy";
import IMediator from "../Core/PureMVC/interface/IMediator";

export default class AppFacade extends  PureFacade implements IFacade {
    private static _instance: AppFacade;
    /** 是否打印日志 */
    public isShowLog:boolean = false;

    constructor(){
        super();
        this.model = null;
        this.view = null;
        this.controller = null;
    }

    public static getInstance(): AppFacade {
        (!this._instance) && (this._instance = new AppFacade());
        return this._instance
    }
    public initializeModel(){
        super.initializeModel();
        this.registerProxy(new AppDataProxy());
        this.registerProxy(new AppLocalDataProxy());
        this.registerProxy(new ChangeWorldProxy());
        this.registerProxy(new CheckHotUpdateProxy());
    }

    public initializeController(){
        super.initializeController();
        this.registerCommand(EnumCommand.ChangeWorld, ChangeWorldCmd);
        this.registerCommand(EnumCommand.InitApp, InitAppCmd);
        this.registerCommand(EnumCommand.CheckAssetsUpdate, CheckHotUpdateCmd);
    }

    public initializeView(){
        super.initializeView();
    }
    
    public getAndCreateMediator(mediator:AppMediator):AppMediator{
        let cacheMediator = <AppMediator>this.retrieveMediator(mediator.getMediatorName());
        if(!cacheMediator){
            this.registerMediator(mediator)
            cacheMediator = mediator;
        } 
        return cacheMediator;
    }

    public sendNotification(name: string, body?: any, type?: string): void {
        this.isShowLog && (
            console.log(`sendNotification name:${name} body:`, body, "type:" + type)
        )
        super.sendNotification(name, body, type);
    }

    public registerCommand(notificationName: string, commandClassRef: Function): void {
        this.isShowLog && (
            console.log(`registerCommand notificationName:${notificationName}`)
        )
        super.registerCommand(notificationName, commandClassRef);
    }

    public removeCommand(notificationName: string): void {
        this.isShowLog && (
            console.log(`removeCommand notificationName:${notificationName}`)
        )
        super.removeCommand(notificationName);
    }
    public registerProxy(proxy: IProxy): void {
        this.isShowLog && (
            console.log(`registerProxy proxy:${proxy}`)
        )
        super.registerProxy(proxy);
    }
    public retrieveProxy(proxyName: string): IProxy {
        this.isShowLog && (
            console.log(`retrieveProxy proxyName:${proxyName}`)
        )
        return super.retrieveProxy(proxyName);
    }
    public removeProxy(proxyName: string): IProxy {
        this.isShowLog && (
            console.log(`removeProxy proxyName:${proxyName}`)
        )
       return super.removeProxy(proxyName);
    }

    public registerMediator(mediator: IMediator): void {
        this.isShowLog && (
            console.log(`registerMediator mediator:${mediator}`)
        )
        super.registerMediator(mediator);
    }
    public retrieveMediator(mediatorName: string): AppMediator {
        this.isShowLog && (
            console.log(`retrieveMediator mediatorName:${mediatorName}`)
        )
       return super.retrieveMediator(mediatorName) as AppMediator;
    }
    public removeMediator(mediatorName: string): IMediator {
        this.isShowLog && (
            console.log(`removeMediator mediatorName:${mediatorName}`)
        )
        return super.removeMediator(mediatorName);
    }
}