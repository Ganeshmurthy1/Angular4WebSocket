import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './core/socket.service';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  user:string;
  stockQuote: number;
  sub: Subscription;
  alert:any ={}
  messages : any = [];
  
  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.socket.listen('message',this.onEventTrigger.bind(this) )
    this.socket.listen('alert',this.onAlertTrigger.bind(this) )
  }

  onEventTrigger(message){
    console.log(message)
    this.messages.push(message)
  }

  onAlertTrigger(message){
    this.alert=message
  }
  sendMessage(user, msg){
    console.log("msg",msg);
    this.socket.emit('message',{data : msg, username : user})
    // this.socket.MessageSubmit(this.message)
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
