
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { Player } from "../common/player";
import { WsService } from "./ws.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: Player[] = [];

  playersToFollow: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(this.players); 
  refreshToFollow: Subject<any> = new Subject<any>(); 

  private baseUrl = "http://localhost:8080/players";  

  constructor(private httpClient: HttpClient, private wsService: WsService) { }

  followToPlayers(): Observable<Player[]> {
    return this.playersToFollow.asObservable();
  }  

  insertPlayer(player: Player): void {
    this.httpClient
              .post<Player>(this.baseUrl, player)
              .subscribe(newPerson => {
                const newSubject = [...this.players, newPerson];               
                this.playersToFollow.next(newSubject)
                this.wsService.sendMessage("newCommer")                
              });
  }

  updatePlayer(localPlayer: Player): void {
    console.log(localPlayer)
    this.httpClient
      .put<Player>(this.baseUrl, localPlayer)
      .subscribe(newPerson => {
        for (let i: number = 0; this.players.length; i++) {
          if (newPerson.id === this.players[i].id) {
            this.players[i] = newPerson
            break
          }
        }
        this.playersToFollow.next(this.players)
        this.wsService.sendMessage("changedPlayer")
      });          
  }

  findAllPlayers() {
    console.log("in service findAllPlayers")
    return this.httpClient.get<Player[]>(this.baseUrl)
      .pipe(map(a => this.players = a))
  }

  findById(id: number): Observable<Player> {
    return this.httpClient.get<Player>(`${this.baseUrl}/${id}`)
  }

}





