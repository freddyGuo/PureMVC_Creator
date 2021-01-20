import { EnumGameID } from "../Enum/EnumGameID";

export default class AppHotUpdateData {
    /** Download timeout timer */ 
    public downloadTimeoutTimer = 0;
    /** Download timeout */
    public downloadTimeout = 60;
    /** number of retries */ 
    public downloadRetryTimes = 0;
    /** Number of retries */
    public downloadRetriedTimes = 0;

    /** Total size */
    public totalBytes: number = 0;
    /** The size that has been successfully downloaded */         
    public downloadedBytes: number = 0; 
    /** Number of single file update failures */
    public errorUpdatingTimes: number = 0;

    /** List of games waiting to be updated */
    public updateList:EnumGameID[] = [];
    /** ID of the game currently being updated */
    public curUpdateId:EnumGameID  = -1;
    /** Hot update file name */
    public gameAssetsDir: string;
    /** Hot update local storage path */
    public storagePath: string;

}