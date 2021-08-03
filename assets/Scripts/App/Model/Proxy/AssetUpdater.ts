export default class AssetUpdater {
    /** Total size */
    public totalBytes: number = 0;
    /** The size that has been successfully downloaded */         
    public downloadedBytes: number = 0; 
    /** Number of single file update failures */
    public errorUpdatingTimes: number = 0;
    public assetDirPath:string = "";
    public storagePath:string = "";

}