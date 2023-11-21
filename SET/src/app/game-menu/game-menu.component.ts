import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { player, playerName, avatar, environment } from 'src/environments/environment';

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

  storeClick(){
      this.router.navigateByUrl("/customize");
  }

  /** 
   * We want to adjust the play mode based on the difficulty
  */
  playClick(){
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
