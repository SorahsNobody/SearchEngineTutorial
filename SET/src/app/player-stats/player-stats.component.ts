import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AniQA, HisQA, MusQA, SciQA, SpoQA, SupQA, avatar, player, playerName, score } from 'src/environments/environment';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {
  @Input('pName') pName = playerName.key; //Declares that this component has a variable named pName that can be called in the html with playerName
  image: any = avatar.key;
  constructor(private router: Router) { }

  ngOnInit(): void {
    (<HTMLHeadingElement>document.getElementById('playerName')).innerText+=" "+playerName.key;
    (<HTMLHeadingElement>document.getElementById('pl')).innerText+=" "+player.level;
    (<HTMLProgressElement>document.getElementById("plProgress")).value=((player.exp/1000)*100);
    (<HTMLHeadingElement>document.getElementById('tp')).innerText+=" "+player.totalPoints.toString();
    var totalQs= MusQA.key.length+HisQA.key.length+SpoQA.key.length+SupQA.key.length+SciQA.key.length+AniQA.key.length;
    (<HTMLProgressElement>document.getElementById("qaProgress")).value=((player.numberOfQuestions/totalQs)*100);
  }

  back(){
    this.router.navigateByUrl("/gameMenu");
  }
}
