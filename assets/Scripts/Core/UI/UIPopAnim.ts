export default class UIPopAnim {
    private nodeMain         : cc.Node;
    private nodeMask         : cc.Node;
    private isCreateMask     : boolean = true;
    /** hide anim playing tag */
    private isPlayingHideAnim: boolean = false;
    /** enter anim playing tag */
    private isPlayingShowAnim:boolean = false;
    private onShowInFinished:Function;
    private onHideOutFinished:Function;

    private async startCreateMask(){
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
        this.nodeMask.active = true;
        this.nodeMask.parent = this.nodeMain;
        this.nodeMask.addComponent(cc.BlockInputEvents);
    }
    /**
     * @param node main Node 
     * @param isCreateMask  
     */
    async init(node, hideFinishCallback:Function=null, showInCallback:Function= null, isCreateMask = true){
        this.nodeMain = node;
        this.isCreateMask = isCreateMask;
        this.onShowInFinished = showInCallback;
        this.onHideOutFinished = hideFinishCallback;
        if(this.isCreateMask){
            await this.startCreateMask();
        }
    }

    /**
     * Play Layer to enter the animation
     */
    public playShowIn() {
        return new Promise((resolved, reject)=>{
            this.isPlayingHideAnim = false;
            if (this.isPlayingShowAnim) {
                resolved()
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
                this.onShowInFinished && this.onShowInFinished();
                this.isPlayingShowAnim = false;
                resolved();
            })
            let seq = cc.sequence(spwan, callfunc)
            this.nodeMain.runAction(seq);
            if (this.nodeMask) {
                this.nodeMask.runAction(action2)
            }
        })
       
    }

    /**
     * Play Layer hidden animation
     */
    public playHideOut() {
        return new Promise((resolved, reject)=>{
            this.isPlayingShowAnim = false;
            if (this.isPlayingHideAnim) {
                resolved();
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
                this.onHideOutFinished && this.onHideOutFinished();
                resolved();
            })
            let seq2 = cc.sequence(spwan, callback);
            this.nodeMain.runAction(seq2);
            let action2 = cc.fadeTo(0.2, 0);
            if (this.nodeMask) {
                this.nodeMask.runAction(action2)
            }
        })
        
    } 
}