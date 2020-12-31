/**
 * copyright (c) 2020 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * 
 * The current game contains enumerated types in multiple languages
 * @author freddyGuo<https://github.com/freddyGuo>
 */
export enum EnumLan {
    /** Simplified Chinese */
    zh = "zh",
    /** English */
    en = "en",
}

/**
 * Please use fonts with the right to use according to your personal situation
 */
export const LanLabelFont: {[index: string] : string} = {
    [EnumLan.zh] : "Client/Common/Fonts/founder_black",
    [EnumLan.zh] : "Client/Common/Fonts/Calibri_1",
}

