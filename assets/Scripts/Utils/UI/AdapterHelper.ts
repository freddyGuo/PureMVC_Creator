const {ccclass, property} = cc._decorator;
/**
 * 屏幕自适应
 */
@ccclass
export default class AdapterHelper{

    public static Design_Width:number = 1920;
    public static Design_Height:number = 1080;

    public static fixApdater(){
        if(cc.sys.isNative){
            let framesize = cc.view.getFrameSize();
            //Device screen ratio
            let ratio: number = framesize.height/framesize.width;
            //The size ratio of game design
            let designRatio: number = AdapterHelper.Design_Height / AdapterHelper.Design_Width;
            //Device screen is wider than design
            if(ratio >= designRatio){
                cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_WIDTH);
                cc.view.setDesignResolutionSize(AdapterHelper.Design_Width, AdapterHelper.Design_Height, cc.ResolutionPolicy.FIXED_WIDTH);
            }else{
                cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_HEIGHT);
                cc.view.setDesignResolutionSize(AdapterHelper.Design_Width, AdapterHelper.Design_Height, cc.ResolutionPolicy.FIXED_HEIGHT);
            }
        }else{
            cc.view.setResolutionPolicy(cc.ResolutionPolicy.SHOW_ALL);
            cc.view.setDesignResolutionSize(AdapterHelper.Design_Width, AdapterHelper.Design_Height, cc.ResolutionPolicy.SHOW_ALL);
        }
    }
}