/**
 * Game-related configuration data, such as whether to enable hot updates, etc.
 */
export default class AppCfgData {
    /** Is it a test version */
    readonly isDebug:boolean = false;
    /** Whether to enable automatic game update */
    readonly isOpenHotupdate:boolean = false;
}