import ICommand from "./interface/ICommand";
import INotification from "./interface/INotification";
import INotifier from "./interface/INotifier";
import { PureNotifier } from "./PureNotifier";

export class PureMacroCmd extends PureNotifier implements ICommand, INotifier {
    public subCommands: any[];
    constructor(){
        super();
        this.subCommands = [];
        this.initializeMacroCommand();
    }
    public initializeMacroCommand(): void{

    };
    public addSubCommand(commandClassRef: any): void{
        commandClassRef && this.subCommands.push(commandClassRef);
    };
    
    execute(notification: INotification): void {
        var subCommands = this.subCommands.slice(0);
        var len = this.subCommands.length;
        for(var i = 0; i < len; i++) {
            let classRef = subCommands[i]
            let cmd = <ICommand>new classRef();
            cmd.execute(notification);
        }
        this.subCommands.splice(0);
    }
    
}