import { PureProxy } from "../Core/PureMVC/PureProxy";

export default abstract class AppProxy extends PureProxy {
    abstract onActive():void;
    abstract onDestroy():void;
    onRegister() {
        this.onActive();
    }
    onRemove() {
        this.onRemove();
    }
    
}