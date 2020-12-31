import INotifier from "./interface/INotifier";
import IProxy from "./interface/IProxy";
import { PureNotifier } from "./PureNotifier";

export class PureProxy extends PureNotifier implements IProxy, INotifier {
    public data: any;
    static NAME: string = "Proxy";
    constructor (proxyName?: string, data?: any){
        super();
        if (typeof proxyName === "undefined") { proxyName = null; }
        if (typeof data === "undefined") { data = null; }
        this.data = null;
        if(data != null) {
            this.setData(data);
        }
    };
    getProxyName(): string {
        return cc.js.getClassName(this);
    }
    setData(data: any): void {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    onRegister(){
        
    }
    onRemove(){

    }
    
}