import AppMediator from "../../App/View/AppMediator";

export default  interface IWorld {
    mediatorList:AppMediator;
    start();    
    onDestroy();
    getWorldName():string;
    /** Register UI level and path */
    initUI();
    /** Register Proxy  */
    initProxy();
    /** Register Proxy  */
    initCommand();
   
}