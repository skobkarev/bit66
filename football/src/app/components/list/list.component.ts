import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/common/player';
import { WsService } from 'src/app/services/ws.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  players: Player[] = []; 
  teams: string[] = []; 

  constructor(public playerService: PlayerService, public wsService: WsService) {
    this.playerService.followToPlayers().subscribe(data => {
      this.players = data      
    })
  }

  ngOnInit(): void {
    this.playerService.findAllPlayers().subscribe(player => {
      this.players = player  
    });    
  }  

}
