import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {score, avatar, unlocks, player, tutorialParts} from 'src/environments/environment';
import { DbadapterService } from '../dbadapter.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {
  constructor(private router: Router, private dbmanage: DbadapterService) { }
  // @HostListener('document:keydown',['$event'])
  // handleKeyboardEvent(event: KeyboardEvent){
  //   console.log(event.key);
  //   if(event.key=='+')
  //     player.totalPoints+=500;
  //   document.getElementById("point-count")!.innerText = "Score: " + player.totalPoints.toString();
  // }
  toResult(): void {
    this.router.navigateByUrl("/results");
  }

  async onEnter(){
    this.router.navigateByUrl("/searchResults");
  }

  logItemUnlock(item: string): void {
    this.dbmanage.postEvent(6,"unlocked item", item);
  }

  ngOnInit(): void {
    document.getElementById("point-count")!.innerText = "Score: " + player.totalPoints.toString();
    if(tutorialParts.currPart>=9){
      tutorialParts.currPart=-1;
      var audio = new Audio("assets/audio/10.m4a");
      audio.play();
    }
    this.hatIndex=avatar.hatIndex;
    this.noseIndex=avatar.noseIndex;
    this.glassesIndex=avatar.glassesIndex;
    this.pointsStorage();
  }

  image: any = avatar.key;
  hatIndex: number = -1;
  noseIndex: number = -1;
  glassesIndex: number = -1;

  generalBuy(hng: string, index: number, price: number){
    var unlockedString="";
    var valid=false;
    var bought=false;
    switch (hng) {
      //IF trying to unlock a hat item
      case "h":
        unlockedString="h"+index;
        if(unlocks.key.includes(unlockedString)){
          this.generalSwitch(hng, index);
          valid=true;
        }
        else if(player.totalPoints>=price){
          bought=true;
          this.generalSwitch(hng, index);
          player.totalPoints-=price;
          unlocks.key=unlocks.key+unlockedString;
          valid=true;
        }
        break;
      //IF trying to unlock a nose item
      case "n":
        unlockedString="n"+index;
        if(unlocks.key.includes(unlockedString)){
          this.generalSwitch(hng, index);
          valid=true;
        }
        else if(player.totalPoints>=price){
          bought=true;
          this.generalSwitch(hng, index);
          player.totalPoints-=price;
          unlocks.key=unlocks.key+unlockedString;
          valid=true;
        }
        break;
      //IF trying to unlock a glasses item
      case "g":
        unlockedString="g"+index;
        if(unlocks.key.includes(unlockedString)){
          this.generalSwitch(hng, index);
          valid=true;
        }
        else if(player.totalPoints>=price){
          bought=true;
          this.generalSwitch(hng, index);
          player.totalPoints-=price;
          unlocks.key=unlocks.key+unlockedString;
          valid=true;
        }
        break;
    }
    if(valid)
      this.ngOnInit();
    if(bought)
      this.logItemUnlock(unlockedString);
  }

  generalSwitch(hng: string, index: number){
    switch (hng) {
      case "h":
        avatar.hatIndex=index;
        this.hatIndex=index;
        break;
      case "n":
        avatar.noseIndex=index;
        this.noseIndex=index;
        break;
      case "g":
        avatar.glassesIndex=index;
        this.glassesIndex=index;
        break;
    }
  }
  pointsStorage(){
    sessionStorage.setItem("points", player.totalPoints.toString());
  }
  toCatSelect(): void {
    this.router.navigateByUrl("/gameMenu");
  }
}
