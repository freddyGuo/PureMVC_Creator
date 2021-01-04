import LocalStorage from "../../Utils/LocalStorage/LocalStorage";

export default class GameDataManager {
    localDB:LocalStorage;
    constructor(){
        this.localDB = new LocalStorage();
    }

    init(){
        
    }
}