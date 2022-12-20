import { Component } from '@angular/core';
import { Player } from './common/player';
import { PlayerService } from './services/player.service';
import { WsService } from './services/ws.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'football';

  constructor(private wsService: WsService, private playersService: PlayerService) {    
    this.wsService.messages$.subscribe(data => {           
      let incommingData : any = data
      try {        
        let localPlayers : Player[] = JSON.parse(incommingData)        
        this.playersService.playersToFollow.next(localPlayers)
        console.log(localPlayers) 
      } catch (e) {
        console.log(e)
        console.log(incommingData)
      }      
    })
    this.wsService.connect()      
  }

}
