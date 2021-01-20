import IWorld from "../../../Core/World/IWorld";
import AppProxy from "../../AppProxy";
import { EnumWorld } from "../../Enum/EnumWorld";
import Global from "../../Global";
import LaunchWorld from "../../../../resources/Client/Launch/Scripts/Proxy/LaunchWorld";
import LoginWorld from "../../../../resources/Client/Login/Scripts/Model/LoginWorld";
import { cccExtensionClass } from "../../../Lib/CCC";
import AppDataProxy from "./AppDataProxy";

@cccExtensionClass
export default class ChangeWorldProxy extends AppProxy {
    private appDataProxy:AppDataProxy;
    /**
     * Determine whether the world can be successfully switched
     * @param worldName 
     */
    private checkWorld(worldName:string):boolean{
        let isOk = true;
        let worldData = this.appDataProxy.getWorldData();
        let world = worldData.worldMap.get(worldName);
        if(!world){
            Global.logger.error(`WorldManager.switchWorld faile: ${worldName} not register`)
            isOk = false
        }else if(worldData.curWorld == world) {
            Global.logger.error(`WorldManager.switchWorld faile: ${worldName} is using`)
        }
        return isOk;
    }

    public onActive(): void {
        this.appDataProxy = <AppDataProxy>Global.facade.retrieveProxy(cc.js.getClassName(AppDataProxy));
        this.registerWold(EnumWorld.Launch, new LaunchWorld())
        this.registerWold(EnumWorld.Login, new LoginWorld());
    }
    public onDestroy(): void {
    }
    /**
     * Register the world
     * @param name 
     * @param world 
     */
    public registerWold(name:string, world:IWorld){
        let worldData = this.appDataProxy.getWorldData();
        worldData.worldMap.set(name, world);
    }

    public async switchWorld(worldName:string){
        if(!this.checkWorld(worldName)){
            return
        }
        let worldData = this.appDataProxy.getWorldData();
        let oldWorld = worldData.curWorld;
        worldData.curWorld = worldData.worldMap.get(worldName);        
        worldData.curWorld.initUI();
        worldData.curWorld.initCommand();
        worldData.curWorld.initProxy();
        await worldData.curWorld.start();
        oldWorld && oldWorld.onDestroy();
    }

    

}