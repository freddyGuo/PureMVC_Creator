import ChangeWorldCmd from "./Controller/ChangeWorldCmd";
import ChangeWorldProxy from "./Model/ChangeWorldProxy";
import IFacade from "../Core/PureMVC/interface/IFacade";
import IMediator from "../Core/PureMVC/interface/IMediator";
import { PureFacade } from "../Core/PureMVC/PureFacade";
import AppMediator from "./View/AppMediator";
import { EnumWorld } from "./Enum/EnumWorld";
import { EnumCommand } from "./Enum/EnumCommand";
import GameDataProxy from "./Model/GameDataProxy";
import InitProxyCmd from "./Controller/InitProxyCmd";
import GameLocalDataProxy from "./Model/GameLocalDataProxy";

export default class AppFacade extends  PureFacade implements IFacade {
    private static _instance: AppFacade;
    public static getInstance(): AppFacade {
        (!this._instance) && (this._instance = new AppFacade());
        return this._instance
    }
    public initializeModel(){
        super.initializeModel();
        this.registerProxy(new ChangeWorldProxy());
        this.registerProxy(new GameDataProxy());
        this.registerProxy(new GameLocalDataProxy());
    }

    public initializeController(){
        super.initializeController();
        this.registerCommand(EnumCommand.ChangeWorld, ChangeWorldCmd);
        this.registerCommand(EnumCommand.InitProxy, InitProxyCmd);
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
    /**
     * After the framework is initialized, start the game
     */
    public start(){
        this.sendNotification(EnumCommand.ChangeWorld, EnumWorld.Launch);
    }
}