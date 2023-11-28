import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { player, playerName, avatar, environment, MusQA, HisQA, SciQA, SupQA, AniQA, SpoQA, DONE } from 'src/environments/environment';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {

  constructor(private router: Router) { }
  @Input('pName') pName = playerName.key; //Declares that this component has a variable named pName that can be called in the html with playerName
  ngOnInit(): void {
    var level = player.level;
    switch(true){
      case(level<=3):
        environment.difficulty=0;
        environment.expansions=true;
        environment.showHints=true;
        environment.spellCheck=true;
        break;
      case(level<=6):
        environment.difficulty=1;
        environment.showHints=false;
        environment.expansions=false;
        environment.spellCheck=true;
        break;
      default:
        environment.difficulty=2;
        environment.showHints=false;
        environment.expansions=false;
        environment.spellCheck=false;
        break;
    }
  }
  image: any = avatar.key;

  statsClick(){
    this.router.navigateByUrl("/stats");
  }

  storeClick(){
      this.router.navigateByUrl("/customize");
  }

  /**
   * We want to adjust the play mode based on the difficulty
  */
  playClick(){
    var qArr = [];
    qArr.push(MusQA);
    qArr.push(HisQA);
    qArr.push(SciQA);
    qArr.push(SupQA);
    qArr.push(AniQA);
    qArr.push(SpoQA);
    for(let i = 0; i<6;i++){
      var qleft = qArr[i].key.find(element => element == 0) == 0;
      if(!qleft)
        DONE.key[i]=1;
    }
    player.numDone=0;
    DONE.key.forEach(e=>{
      player.numDone+=e;
    });
    console.log("NumDone: "+player.numDone);
    if(player.numDone>=5){
      alert("You've attempted all of the questions! Great Job!");
      return;
    }

    switch(environment.difficulty){
      case 1:
        break;
      case 2:
        break;
      default:
        this.router.navigateByUrl('/queryCraft');
        break;
    }
  }
}
