import UIBase from "./UIBase";

export default class UIPopBase extends UIBase {
    /** Is there a black background frame */
    isShowMask         : boolean = true;       
    /** Whether to close the pop-up window  */
    isHideClick    : boolean = true;
    nodeMain         : cc.Node;                     
    nodeMask         : cc.Node;                     
    nodeBlock        : cc.Node;    
    isPlayingShowAnim: boolean = false;            
    isPlayingHideAnim: boolean = false;            
    onLoad(){
        this.nodeMain = cc.find("mainNode", this.node);
        this.isShowMask && this.initMask();
        this.isHideClick && this.initBlock();
    }

    /**初始化背景黑色模板 */
    initMask() { //TODO 频繁创建可能不好
        return new Promise((resolve, reject) => {
            let viewsize = cc.view.getVisibleSize();
            let texture = new cc.Texture2D;
            let spriteFrame = new cc.SpriteFrame;
            texture.initWithData(new Uint8Array([0, 0, 0]), cc.Texture2D.PixelFormat.RGB888, 1, 1, cc.winSize);
            spriteFrame.setTexture(texture);
            spriteFrame.setRect(cc.rect(0, 0, viewsize.width * 5, viewsize.height * 5));
            //初始化模态
            this.nodeMask = new cc.Node;
            this.nodeMask.name = "maskNode";
            this.nodeMask.zIndex =  -1;
            this.nodeMask.opacity = 170;
            this.nodeMask.setContentSize(cc.size(Math.ceil(viewsize.width), viewsize.height));
            this.nodeMask.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            this.nodeMask.active = this.isShowMask;
            this.nodeMask.parent = this.node;
            resolve();
        });
    }

    /**初始化触摸吞噬曾 */
    initBlock() {
        return new Promise((resolve, reject) => {
            let viewsize = cc.view.getVisibleSize();
            //初始化禁止触摸曾
            this.nodeBlock = new cc.Node();
            this.nodeBlock.name = "blockNode";
            this.nodeBlock.zIndex = -1;
            this.nodeBlock.setContentSize(cc.size(Math.ceil(viewsize.width * 5), Math.ceil(viewsize.height * 5)));
            this.nodeBlock.parent = this.node;
            this.nodeBlock.on(cc.Node.EventType.TOUCH_END, () => {
                this.isHideClick && this.onClickClose();
            })
            resolve();
        });
    }

    //关闭按钮
    onClickClose() {
        this.hideOut();
    }

    /**
     * Play Layer hidden animation
     * @param removenode 
     */
    hideOut(removenode: boolean = true) {
        this.isPlayingShowAnim = false;
        if (this.isPlayingHideAnim) {
            return
        }
        this.isPlayingHideAnim = true;
        this.nodeMain.stopAllActions();
        this.nodeMain.setScale(1.0);

        let scaleTo = cc.scaleTo(0.3, 0.0).easing(cc.easeBackIn());
        let fadeTo = cc.fadeTo(0.3, 0);
        let spwan = cc.spawn(scaleTo, fadeTo);
        let callback = cc.callFunc(() => {
            this.isPlayingHideAnim = false;
            this.onHideOutFinished();
        })
        let seq2 = cc.sequence(spwan, callback);
        this.nodeMain.runAction(seq2);
        let action2 = cc.fadeTo(0.2, 0);
        if (this.nodeMask) {
            this.nodeMask.runAction(action2)
        }
    }

    /**
     * Play Layer to enter the animation
     */
    showIn() {
        this.isPlayingHideAnim = false;
        if (this.isPlayingShowAnim) {
            return
        }
        this.isPlayingShowAnim = true;
        this.nodeMain.stopAllActions();
        this.nodeMain.setScale(0.0);
        this.nodeMain.opacity = 0;
        let action2 = cc.fadeTo(0.15, 150);
        let fadeto = cc.fadeTo(0.2, 255);
        let scaleTo = cc.scaleTo(0.35, 1.0).easing(cc.easeBackOut());
        let spwan = cc.spawn(scaleTo, fadeto);
        let callfunc = cc.callFunc(() => {
            this.onShowInFinished();
            this.isPlayingShowAnim = false;
        })
        let seq = cc.sequence(spwan, callfunc)
        this.nodeMain.runAction(seq);
        if (this.nodeMask) {
            this.nodeMask.runAction(action2)
        }
    }
    /**
     * enter animation finished
     */
    onShowInFinished() {
        
    }
    /**
     * hidden animation finished
     */
    onHideOutFinished() {
        
    }
    
}