import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment, player, playerName } from 'src/environments/environment';
import { HeaderChangeService } from '../header-change.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router, private headerChange: HeaderChangeService) {}
  @Input('pName') pName = playerName.key; //Declares that this component has a variable named pName that can be called in the html with playerName
  @Input('points') points = player.totalPoints;
  @Input('progress') progress = ((player.exp/1000)*100);
  @Input('playerLevel') playerLevel = player.level;
  @Input('page') page: string = '';
  customize = environment.customize;

  ngOnInit(): void {
    this.loadStats();
    this.headerChange.change.subscribe(data => {
      //console.log("Signal to reload header")
        this.loadStats();
    })
  }

  playClick(){
    this.router.navigateByUrl('/queryCraft');
  }

  toggleButtons(button: string){
    switch (button) {
      //IF the button pressed was the play button
      case 'play':
        //THEN disable the play button and re-enable the store button
        (<HTMLButtonElement>document.getElementsByClassName('play-button')[0])!.disabled=true;
        (<HTMLButtonElement>document.getElementsByClassName('store-button')[0])!.disabled=false;
        break;
      default:
        (<HTMLButtonElement>document.getElementsByClassName('play-button')[0])!.disabled=false;
        (<HTMLButtonElement>document.getElementsByClassName('store-button')[0])!.disabled=true;
        break;
    }

  }

  storeClick(){
    this.router.navigateByUrl('/customize');
  }

  loadStats() {
    console.log('page: '+environment.page );
    this.toggleButtons(environment.page);
    document.getElementById('pLevel')!.innerText=player.level.toString();
    (<HTMLProgressElement>document.getElementById("plProgress")).value=((player.exp/1000)*100);
    document.getElementById('tpPoints')!.innerText=player.totalPoints.toString();
  }
}
