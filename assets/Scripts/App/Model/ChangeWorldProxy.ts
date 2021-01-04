import IWorld from "../../Core/World/IWorld";
import AppProxy from "../AppProxy";
import { EnumWorld } from "../Enum/EnumWorld";
import Global from "../Global";
import LaunchWorld from "../../../resources/Client/Launch/Scripts/Proxy/LaunchWorld";
import LoginWorld from "../../../resources/Client/Login/Scripts/Model/LoginWorld";
import { cccExtensionClass } from "../../Lib/CCC";

@cccExtensionClass
export default class ChangeWorldProxy extends AppProxy {
    private worldMap:Map<string, IWorld>;
    private curWorld:IWorld;
    /**
     * Determine whether the world can be successfully switched
     * @param worldName 
     */
    private checkWorld(worldName:string):boolean{
        let isOk = true;
        let world = this.worldMap.get(worldName);
        if(!world){
            Global.logger.error(`WorldManager.switchWorld faile: ${worldName} not register`)
            isOk = false
        }else if(this.curWorld == world) {
            Global.logger.error(`WorldManager.switchWorld faile: ${worldName} is using`)
        }
        return isOk;
    }

    public onActive(): void {
        this.worldMap = new Map();
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
        this.worldMap.set(name, world);
    }

    public async switchWorld(worldName:string){
        if(!this.checkWorld(worldName)){
            return
        }
        let oldWorld = this.curWorld;
        this.curWorld = this.worldMap.get(worldName);        
        this.curWorld.initUI();
        this.curWorld.initCommand();
        this.curWorld.initProxy();
        await this.curWorld.start();
        oldWorld && oldWorld.onDestroy();
    }

    

}