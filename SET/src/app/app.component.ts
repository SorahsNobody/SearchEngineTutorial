import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { avatar, player, playerName } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    console.log(sessionStorage.getItem("playerName"));
    if(sessionStorage.getItem("playerName")===null)
      this.router.navigateByUrl("/start");
    else{
      //need to load session storage data then move to main menu
      playerName.key=<string>sessionStorage.getItem("playerName");
      if(sessionStorage.getItem("hat")!==null)
        avatar.hatIndex=Number.parseInt(<string>sessionStorage.getItem("hat"));
      if(sessionStorage.getItem("nose")!==null)
        avatar.noseIndex=Number.parseInt(<string>sessionStorage.getItem("nose"));
      if(sessionStorage.getItem("glasses")!==null)
        avatar.glassesIndex=Number.parseInt(<string>sessionStorage.getItem("glasses"));
      if(sessionStorage.getItem("numQs")!==null)
        player.numberOfQuestions=Number.parseInt(<string>sessionStorage.getItem("numQs"));
      if(sessionStorage.getItem("points")!==null)
        player.totalPoints=Number.parseInt(<string>sessionStorage.getItem("points"));
      if(sessionStorage.getItem("lvl")!==null)
        player.level=Number.parseInt(<string>sessionStorage.getItem("lvl"));
      if(sessionStorage.getItem("exp")!==null)
        player.exp=Number.parseInt(<string>sessionStorage.getItem("exp"));
      this.router.navigateByUrl("/gameMenu");
    }
  }
  title = 'SET';
}
