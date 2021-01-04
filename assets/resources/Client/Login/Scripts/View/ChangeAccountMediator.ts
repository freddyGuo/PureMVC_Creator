import AppMediator from "../../../../../Scripts/App/View/AppMediator";
import { cccExtensionClass } from "../../../../../Scripts/Lib/CCC";
import ChangeAccountUI from "./ChangeAccountUI";

@cccExtensionClass
export default class ChangeAccountMediator extends AppMediator {
    viewComponent:ChangeAccountUI;
    onActive(): void {
        
    }
    onDestroy(): void {
        
    }
    
}