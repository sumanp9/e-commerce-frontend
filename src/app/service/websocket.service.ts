import { Injectable } from '@angular/core';
import { Observable, Subject  } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket; 
  readonly uri: string = 'http://localhost:8080';
  private destroy$ = new Subject<void>();

  constructor() {
    this.socket = io(this.uri, {
      withCredentials: true,
    });
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }

  ngOnDestroy() {
    this.socket.disconnect();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
