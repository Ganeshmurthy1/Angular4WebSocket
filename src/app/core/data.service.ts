import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { Http, Headers, Response, HttpModule } from '@angular/http'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Socket } from '../shared/interfaces';
import 'rxjs/add/operator/map';
declare var io : {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {
  constructor(private http: Http){

  }
  socket: Socket;
  observer: Observer<number>;
  getQuotes() : Observable<number> {
    this.socket = socketIo('http://localhost:3000');

    this.socket.on('data', (res) => {
      this.observer.next(res.data);
    });

    return this.createObservable();
  }

  createObservable() : Observable<number> {
      return new Observable<number>(observer => {
        this.observer = observer;
      });
  }
  MessageSubmit(formData){
    const url = 'http://localhost:3000/message';
    return this.http.post(url,formData).map((response: Response, headers: any) => {
      let user = response.json();
       return user;
    });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}
