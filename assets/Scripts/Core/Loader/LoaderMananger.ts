import Global from "../../App/Global";

export default class LoaderManager {
    /** Cache container for loading game  */
    private _cacheResMap: Map<string, Object> = new Map(); 
    public getCache(url: string): Object {
        return this._cacheResMap.get(url);
    }

    public addCache(url: string, loadRes:Object){
        this._cacheResMap.set(url, loadRes);
    }
     /**
     * load game resource 
     * @param url 
     */
    public loadRes(url: string, type:any=null, ) {
        return new Promise((resolve, reject)=>{
            if (this.getCache(url)) {
                resolve(this.getCache(url));
            }else{
                if(type){
                    cc.loader.loadRes(url, type,(error, result)=>{
                        if(error){
                            Global.logger.error("LoaderManager.LoadRes error ", error);
                            reject(error)
                        }else {
                            this.addCache(url, result);
                            resolve(result);
                        }
                    })
                }else {
                    cc.loader.loadRes(url, (error, result)=>{
                        if(error){
                            Global.logger.error("LoaderManager.LoadRes error ", error);
                            reject(error)
                        }else {
                            this.addCache(url, result);
                            resolve(result);
                        }
                    })
                }
                
            }
        })
    }

}