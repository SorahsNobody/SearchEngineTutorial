import { Component, EventEmitter, HostListener, Output} from '@angular/core';
import { Router } from '@angular/router';
import {AniQA, MusQA, SupQA, HisQA, avatar, unlocks, player, tutorialParts, environment} from 'src/environments/environment';
import { DbadapterService } from '../dbadapter.service';
import { HeaderChangeService } from '../header-change.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {
  constructor(private router: Router, private dbmanage: DbadapterService, private headerChange: HeaderChangeService) {
    environment.customize=true;
   }
  @HostListener('document:keydown',['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    console.log(event.key);
    if(event.key=='+')
      player.totalPoints+=500;
    document.getElementById("point-count")!.innerText = "Score: " + player.totalPoints.toString();
  }
  toResult(): void {
    this.router.navigateByUrl("/results");
  }

  async onEnter(){
    this.router.navigateByUrl("/searchResults");
  }

  logItemUnlock(item: string): void {
    if(environment.dbAccess)
      this.dbmanage.postEvent(6,"unlocked item", item).subscribe((data)=>{
    });
  }

  ngOnInit(): void {
    this.headerChange.signalChange(true);
    document.getElementById("point-count")!.innerText = "Score: " + player.totalPoints.toString();
    if(tutorialParts.currPart>=9){
      tutorialParts.currPart=-1;
      var audio = new Audio("assets/audio/Recording_13.m4a");
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
        //trying to unlock the crown
        if(index==7){
          //find will return true if there is still a question available for that category
          if(player.numDone<5){
            break;
          }
        }
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
  /** For removing the current customization */
  takeOffGeneral(hng: string){
    switch (hng) {
      case "h":
        console.log("removing hat");
        avatar.hatIndex=6;
        this.hatIndex=6;
        break;
      case "n":
        avatar.noseIndex=6;
        this.noseIndex=6;
        break;
      case "g":
        avatar.glassesIndex=6;
        this.glassesIndex=6;
        break;
    }
    this.ngOnInit();
  }
}
