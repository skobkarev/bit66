import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { catchError, delayWhen, retryWhen, switchAll, tap } from 'rxjs/operators';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
import { Player } from '../common/player';

export const WS_ENDPOINT = "ws://localhost:8080/players2";

@Injectable()
export class WsService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
 
    if (!this.socket$ || this.socket$.closed || cfg.reconnect) {
      this.socket$ = this.getNewWebScket();
      const messages = this.socket$.pipe(cfg.reconnect ? this.reconnect : o => o,
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY))
      this.messagesSubject$.next(messages);
    }
  }



  
  /*public connect(): void {
  
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          complete: () => console.log('[Live component] Connection Closed'),
          error: error => console.log(error +" HERE IS A PROBLEM"),
        }) , catchError(_ => EMPTY));/*

        /*
          liveData$ = this.service.messages$.pipe(
          map(rows => rows.data),
          catchError(error => { throw error }),
          tap({
          error: error => console.log('[Live component] Error:', error),
          complete: () => console.log('[Live component] Connection Closed')
          }
          )
          );
        */
      /*this.messagesSubject$.next(messages);
    }
  }*/
  
  // private getNewWebSocket() {
  //   return webSocket(WS_ENDPOINT);
  // }

  private getNewWebScket() {
    return webSocket({
      url: WS_ENDPOINT,
      closeObserver: {
        next: () => {
          console.log('[WsService]: connection closed');          
          this.connect({ reconnect: true });
        }
      },
      deserializer: ({data}) => data
    });
  }


  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[WsService] Try to reconnect', val)), 
      delayWhen(_ => timer(5000))))); }


  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete(); }
}