/**
 * copyright (c) 2020 Freddy Guo. All rights reserved. Licensed under the MIT License 
 * @author freddyGuo<https://github.com/freddyGuo>
 */
export default class StringUtil {
    public static format(text: string, ...args): string {
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            if (element == undefined || element == null) {
                text = StringUtil.replaceAll(text, "{" + index + "}", "");
            } else {
                // text = text.replace("{" + index + "}", element.toString());
                text = StringUtil.replaceAll(text, "{" + index + "}", element.toString());
            }
        }
        return text;
    }
    /**
     * 
    * 
     * @param text 
     * @param searchValue 
     * @param replaceValue 
     */
    public static replaceAll(text: string, searchValue: string, replaceValue: string): string {
        let newText: string = "";
        let index: number = text.indexOf(searchValue);
        let searchValueLength: number = searchValue.length;
        while (index != -1) {
            newText = newText + text.slice(0, index) + replaceValue;
            text = text.slice(index + searchValueLength);
            index = text.indexOf(searchValue);
        }
        newText = newText + text;
        return newText;
    }
}