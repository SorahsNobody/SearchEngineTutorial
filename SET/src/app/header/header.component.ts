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

  constructor(private router: Router, private headerChange: HeaderChangeService) { }
  @Input('pName') pName = playerName.key; //Declares that this component has a variable named pName that can be called in the html with playerName
  customize = environment.customize;

  ngOnInit(): void {
    this.loadStats();
    this.headerChange.change.subscribe(data => {
      console.log("Signal to reload header")
      if(data)
        this.loadStats();
    })
  }

  playClick(){
    this.router.navigateByUrl('/queryCraft');
  }

  menuClick(){
    this.router.navigateByUrl('/gameMenu');
  }

  storeClick(){
    this.router.navigateByUrl('/customize');
  }

  loadStats() {
    (<HTMLHeadingElement>document.getElementById('pLevel')).innerText=player.level.toString();
    (<HTMLProgressElement>document.getElementById("plProgress")).value=((player.exp/1000)*100);
    (<HTMLHeadingElement>document.getElementById('tpPoints')).innerText=player.totalPoints.toString();
  }
}
