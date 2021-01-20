import ChangeWorldCmd from "./Controller/ChangeWorldCmd";
import ChangeWorldProxy from "./Model/Proxy/ChangeWorldProxy";
import IFacade from "../Core/PureMVC/interface/IFacade";
import { PureFacade } from "../Core/PureMVC/PureFacade";
import AppMediator from "./View/AppMediator";
import { EnumCommand } from "./Enum/EnumCommand";
import AppDataProxy from "./Model/Proxy/AppDataProxy";
import InitAppCmd from "./Controller/InitAppCmd";
import AppLocalDataProxy from "./Model/Proxy/AppLocalDataProxy";
import CheckHotUpdateCmd from "./Controller/CheckUpdateCmd";
import CheckHotUpdateProxy from "./Model/Proxy/CheckHotUpdateProxy";

export default class AppFacade extends  PureFacade implements IFacade {
    private static _instance: AppFacade;

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
}