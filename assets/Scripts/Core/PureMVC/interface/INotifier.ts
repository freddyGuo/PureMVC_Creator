export default interface INotifier {
	sendNotification( name:string, body?:any, type?:string ):void;
} 