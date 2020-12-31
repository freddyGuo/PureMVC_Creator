/**
 *
 *
 *                  ___====-_  _-====___
 *            _--^^^#####//      \\#####^^^--_
 *         _-^##########// (    ) \\##########^-_
 *        -############//  |\^^/|  \\############-
 *      _/############//   (@::@)   \\############\_
 *     /#############((     \\//     ))#############\
 *    -###############\\    (oo)    //###############-
 *   -#################\\  / VV \  //#################-
 *  -###################\\/      \//###################-
 * _#/|##########/\######(   /\   )######/\##########|\#_
 * |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
 * `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
 *    `   `  `      `   / | |  | | \   '      '  '   '
 *                     (  | |  | |  )
 *                    __\ | |  | | /__
 *                   (vvv(VVV)(VVV)vvv)
 *                        神兽保佑
 *                       代码无BUG!
 * @author freddy.guo
 */
import { EventManager } from "../Core/Event/EventMananger";
import LoaderManager from "../Core/Loader/LoaderMananger";
import LanManager from "../Core/MultiLan/LanManager";
import TimerManager from "../Core/TimerManager";
import UIMananger from "../Core/UI/UIManager";
import Logger from "../Utils/Logger";
import GlobalConfig from "./Config/GlobalConfig";
import AppFacade from "./AppFacade";
import { EnumEvents } from "./Enum/EnumEvents";
import GameDataManager from "./Data/GameDataManager";

export default class Global {
    static dataMgr:GameDataManager;
    static loaderMgr:LoaderManager;
    static lanMgr:LanManager; 
    static eventMgr:EventManager;
    static timerMgr:TimerManager;
    static uiMgr: UIMananger;
    static globalCfg: GlobalConfig;
    // static worldMgr: WorldManager;
    static logger:Logger;
    static facade:AppFacade;

    public static create(){
        CC_DEBUG && (window["Global"] = Global);
        this.loaderMgr = new LoaderManager();
        this.dataMgr   = new GameDataManager();
        this.lanMgr    = new LanManager();
        this.eventMgr  = new EventManager();
        this.timerMgr  = new TimerManager();
        this.uiMgr     = new UIMananger();
        this.globalCfg = new GlobalConfig();
        // this.worldMgr  = new WorldManager();
        this.logger    = new Logger();
        this.facade    = AppFacade.getInstance();
    }

    public static async init(){
        Global.facade.sendNotification(EnumEvents.GameInitEvent, 0.5);
        this.dataMgr.init();
        await this.lanMgr.init();
        this.timerMgr.init();
    }
}