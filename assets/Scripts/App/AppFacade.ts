import ChangeWorldCmd from "../../resources/Client/Driver/Scripts/Controller/ChangeWorldCmd";
import ChangeWorldProxy from "../../resources/Client/Driver/Scripts/Model/ChangeWorldProxy";
import IFacade from "../Core/PureMVC/interface/IFacade";
import IMediator from "../Core/PureMVC/interface/IMediator";
import { PureFacade } from "../Core/PureMVC/PureFacade";
import AppMediator from "./AppMediator";
import { EnumEvents } from "./Enum/EnumEvents";
import { EnumWorld } from "./Enum/EnumWorld";

export default class AppFacade extends  PureFacade implements IFacade {
    private static _instance: AppFacade;
    public static getInstance(): AppFacade {
        (!this._instance) && (this._instance = new AppFacade());
        return this._instance
    }
    public initializeModel(){
        super.initializeModel();
        this.registerProxy(new ChangeWorldProxy());
    }

    public initializeController(){
        super.initializeController();
        this.registerCommand(EnumEvents.ChangeWorld, ChangeWorldCmd)
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
        this.sendNotification(EnumEvents.ChangeWorld, EnumWorld.Launch);
    }
}