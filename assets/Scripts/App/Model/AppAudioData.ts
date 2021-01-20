export default class AppAudioData {
    /** ID of the background music being played */
    playingBackgroundMusic: number = -1;      
    /**  Sound effects during playback */
    playingSoundList = [];         
    /** Playing music */
    playingMusicList: number[] = [];         
    musicId: number = -1;
}