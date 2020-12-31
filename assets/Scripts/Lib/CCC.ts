
/**
 * Assign the class name to the class
 * 
 * Note: Cocos Creator provides a function like cc.js.getClassName,
 * But unfortunately, when the code is confused, the class decorated by ccclass can get the class name through this method, 
 * but the custom class can't get it. The custom class is often confused with "t".
 * Reference address https://blog.csdn.net/RICKShaozhiheng/article/details/87922938
 * @author freddy.guo December 25, 2020 15:20:27
 * @param target
 */
export function cccExtensionClass(target: any) {
    let script = cc['_RF'].peek().script;
    cc.js.setClassName(script, target);
    // console.log("_getClassByName_", cc.js.getClassByName(target));
}
