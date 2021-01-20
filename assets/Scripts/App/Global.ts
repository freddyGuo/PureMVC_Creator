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
import AppFacade from "./AppFacade";
import AudioManager from "./Audio/AudioManager";

export default class Global {
    static loaderMgr:LoaderManager;
    static lanMgr:LanManager; 
    static eventMgr:EventManager;
    static timerMgr:TimerManager;
    static uiMgr: UIMananger;
    static logger:Logger;
    static facade:AppFacade;
    static audioMgr:AudioManager;

    public static create(){
        CC_DEBUG && (window["Global"] = Global);
        this.loaderMgr = new LoaderManager();
        this.lanMgr    = new LanManager();
        this.eventMgr  = new EventManager();
        this.timerMgr  = new TimerManager();
        this.uiMgr     = new UIMananger();
        this.logger    = new Logger();
        this.audioMgr  = new AudioManager();
        this.facade    = AppFacade.getInstance();
        this.facade.initializeFacade();
    }

    public static init(){
        Global.audioMgr.init();
        Global.timerMgr.init();
    }
}