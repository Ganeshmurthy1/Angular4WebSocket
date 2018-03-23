import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './core/data.service';
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
  message : any = {};
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.dataService.getQuotes()
        .subscribe(quote => {
          this.stockQuote = quote;
        });
  }

  sendMessage(mess){
    console.log("mess",mess);
    
    this.message.text = mess;
    this.dataService.MessageSubmit(this.message).subscribe(response => {

    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
