import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from 'src/app/common/player';
import { PlayerService } from 'src/app/services/player.service';
import { WsService } from 'src/app/services/ws.service';


@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  insertFormGroup!: FormGroup;
  countries: string[] = ['ITALY', 'RUSSIA', 'USA'];
  genders: string[] = ['MALE', 'FEMALE'];
  teams: string[] = [];  
  today: string;  

  constructor(private formBuilder: FormBuilder,
    private playerService: PlayerService, private wsService: WsService, public datepipe: DatePipe) {
      this.today = this.datepipe.transform(new Date(), 'yyyy-MM-dd')!;      
      console.log(this.today)
      playerService
        .followToPlayers()
        .subscribe((players) => {
          this.teams = players.map(p => p.team)
        })
  }

  ngOnInit(): void {
    this.playerService.findAllPlayers().subscribe(players => {
      this.teams = players.map(p => p.team)
      this.handleTeams(players)
    });
    this.insertFormGroup = this.formBuilder.group({
      player: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        birthDate: [''],
        gender: [''],
        team: [''],
        country: ['']
      })
    });
  }

  onSubmit() {
    console.log("adding new player:")
    console.log(this.insertFormGroup.get('player')?.value)
    this.playerService
      .insertPlayer(this.insertFormGroup.get('player')?.value)
  }

  private handleTeams(localPlayers: Player[]) {
    this.teams = []
    localPlayers.forEach(player => {
      if (this.teams.includes(player.team)) { }
      else {
        this.teams.push(player.team)
      }
    })
  }

}
