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

    /**
     * Bulk loading, with progress bar
     * All URLs must not be repeated
     * [[cc.SpriteAtlas, [Global.pathConfig.lobbyIconAtlasPath]]]
     * @param urlList 
     * @param progressCallback 
     * @param completeCallback 
     * @param addToCache 
     */
    loadTypeResArray(urlList: string[], progressCallback, completeCallback, addToCache = false) {
        let loadList = [];
        let loadResult = [];
        let loadedCount = 0;

        // 计数
        let _complete = (error: Error) => {
            if (completeCallback) {
                completeCallback(error, loadResult);
            }
        }
        let _loadComplete = (error: Error, resource: any[], index) => {
            loadedCount += 1;
            loadResult[index] = resource;
            if(loadedCount == loadList.length){
                _complete(error);
            }
        }

        // asset type = cc.Asset
        // 把数据组织成[assetType, [string]] 的结构
        let typeAssetLoadList = [];
        loadList.push([cc.Asset, typeAssetLoadList]);
        for (let index = 0; index < urlList.length; index++) {
            let urlInfo: any = urlList[index];
            if(typeof(urlInfo) == "string"){
                let url = urlInfo;
                if(!this.getCache(url)){
                    typeAssetLoadList.push(url);
                }
            }else{
                let tempType = urlInfo[0];
                let tempUrlList = urlInfo[1];
                let tempLoadList = [];
                for (const tempUrl of tempUrlList) {
                    if(!this.getCache(tempUrl)){
                        tempLoadList.push(tempUrl);
                    }
                }
                loadList.push([tempType, tempLoadList]);
            }
        }

        // 加载
        if(loadList.length){
            for (let index = 0; index < loadList.length; index++) {
                const loadInfo = loadList[index];
                this.loadResArray(loadInfo[1], loadInfo[0], progressCallback, _loadComplete, index, addToCache);
            }
        }else{
            _complete(undefined);
        }
    }

    /**
     *  
     * @param urlList 
     * @param assetType 
     * @param progressCallback 
     * @param completeCallback 
     * @param args 
     * @param addToCache 
     */
    loadResArray(urlList: string[], assetType: typeof cc.Asset, progressCallback, completeCallback, args, addToCache = false) {
        let urlObjectDict = {};
        let loadList = [];
        // 按照列表先后顺序追加对象
        let _wrapObjects = ()=>{
            let loadObjects = [];
            for (let index = 0; index < urlList.length; index++) {
                let url: string = urlList[index];
                loadObjects.push(urlObjectDict[url]);
            }
            return loadObjects;
        }
        let _complete = (error: Error) => {
            if (completeCallback) {
                completeCallback(error, _wrapObjects(), args);
            }
        }
        let _loadComplete = (error: Error, resource: any[]) => {
            for (let index = 0; index < loadList.length; index++) {
                let url: string = loadList[index];
                urlObjectDict[url] = resource[index];
                if (addToCache) {
                    this.addCache(url, resource[index]);
                }
            }
            _complete(error);
        }
        for (let index = 0; index < urlList.length; index++) {
            let url = urlList[index];
            if(!this.getCache(url)){
                loadList.push(url);
            }else{
                urlObjectDict[url] = this.getCache(url);
            }
        }

        if(loadList.length){
            cc.loader.loadResArray(loadList, assetType, progressCallback, _loadComplete);   
        }else{
            _complete(undefined);
        }
    }


}