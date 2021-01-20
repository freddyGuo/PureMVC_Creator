import IWorld from "../../Core/World/IWorld";

export default class WorldData {
    public worldMap:Map<string, IWorld>;
    public curWorld:IWorld;
    constructor(){
        this.worldMap = new Map();
    }
}