import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/common/player';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  insertFormGroup!: FormGroup;
  currentPlayer!: Player;

  countries: string[] = ['ITALY', 'RUSSIA', 'USA'];
  genders: string[] = ['MALE', 'FEMALE'];
  teams: string[] = [];
  today: string;

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService, private route: ActivatedRoute, public datepipe: DatePipe) {
      this.today = this.datepipe.transform(new Date(), 'yyyy-MM-dd')!;
      playerService
        .followToPlayers()
        .subscribe((players) => {
        this.teams = players.map(p => p.team)
      })
  }


  ngOnInit(): void {   
    this.findById(+this.route.snapshot.paramMap.get("id")!)   
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
    console.log(this.insertFormGroup.get('player')?.value)
    this.currentPlayer.id = +this.route.snapshot.paramMap.get("id")!
    this.playerService
      .updatePlayer(this.currentPlayer)      
  }

  findById(id: number) {    
    this.playerService.findById(id)
      .subscribe(data => {
        this.currentPlayer = data;
        this.currentPlayer.birthDate = new Date(data.birthDate.toDateString())
      })
  }

}
