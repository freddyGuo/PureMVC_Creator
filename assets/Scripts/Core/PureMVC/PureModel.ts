import IModel from "./interface/IModel";
import IProxy from "./interface/IProxy";

export class PureModel implements IModel {
    public proxyMap: Object;
    static SINGLETON_MSG: string = "Model singleton already constructed!";
    private static instance: IModel;
    static getInstance(): IModel{
        if(!PureModel.instance) {
            PureModel.instance = new PureModel();
        }
        return PureModel.instance;
    };
    constructor(){
        this.proxyMap = null;
        if(PureModel.instance) {
            throw Error(PureModel.SINGLETON_MSG);
        }
        PureModel.instance = this;
        this.proxyMap = {
        };
        this.initializeModel();
    }
    public initializeModel(){

    }
    registerProxy(proxy: IProxy): void {
        let name:string = proxy.getProxyName()
        if(this.proxyMap[name]){
            console.error(name  + " is  alealy exit, please checkout it")
        }
        this.proxyMap[name] = proxy;
        proxy.onRegister();
    }
    removeProxy(proxyName: string): IProxy {
        var proxy = this.proxyMap[proxyName];
        if(proxy) {
            delete this.proxyMap[proxyName];
            proxy.onRemove();
        }
        return proxy;
    }
    retrieveProxy(proxyName: string): IProxy {
        return this.proxyMap[proxyName] || null;
    }
    hasProxy(proxyName: string): boolean {
        return this.proxyMap[proxyName] != null;
    }
    
}