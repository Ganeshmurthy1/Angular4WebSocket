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
export class SocketService {
  constructor(private http: Http){

  }
  socket: Socket= socketIo('http://localhost:3000');;
  
  public listen(event, callback){
    this.socket.on(event, callback);
  }

  public emit(event, data){
    this.socket.emit(event, data);
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
