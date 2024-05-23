import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { player, playerName } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router) { }
  @Input('pName') pName = playerName.key; //Declares that this component has a variable named pName that can be called in the html with playerName

  //@HostListener('document:keydown',['$event'])
  // handleKeyboardEvent(event: KeyboardEvent){
  //   console.log(event.key);
  //   if(event.key=='+'){
  //     player.totalPoints+=500;
  //     player.exp+=500;
  //     this.loadStats();
  //   }
  // }

  ngOnInit(): void {
    this.loadStats();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.loadStats();
  // }

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
