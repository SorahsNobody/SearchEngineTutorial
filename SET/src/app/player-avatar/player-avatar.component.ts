import { Component, OnInit } from '@angular/core';
import { avatar } from 'src/environments/environment';

@Component({
  selector: 'app-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.css']
})
export class PlayerAvatarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(avatar.init){
      document.getElementById("avatar-hat")!.style.visibility="hidden";
      document.getElementById("avatar-glasses")!.style.visibility="hidden";
      document.getElementById("avatar-nose")!.style.visibility="hidden";
    }
  }
  hI =avatar.hatIndex;
  gI =avatar.glassesIndex;
  nI =avatar.noseIndex;
  numHats = avatar.hats.length;
  numGlasses = avatar.glasses.length;
  numNoses = avatar.noses.length;
  hatImage: any = avatar.hats[this.hI];
  glassesImage: any = avatar.glasses[this.gI];
  noseImage: any = avatar.noses[this.nI];
  bodyImage: any = avatar.key;

  changeHat(index:number){
    var hat = document.getElementById("avatar-hat");
    if(index==-1)
      this.hI++;
    else
      this.hI=index
    if(this.hI>this.numHats)
      this.hI=0;
    if(this.hI==this.numHats)
      hat!.style.visibility="hidden";
    else{
      this.hatImage=avatar.hats[this.hI];
      hat!.style.visibility="visible";
    }
  }
  changeGlasses(index:number){
    var glasses = document.getElementById("avatar-glasses");
    if(index==-1)
      this.gI++;
    else
      this.gI=index;
    if(this.gI>this.numGlasses)
      this.gI=0;
    //need to resize
    if(this.gI!=0){
      glasses!.style.height="30px";
      glasses!.style.top="35px";
    }
    else{
      glasses!.style.height="60px";
      glasses!.style.top="20px"
    }
    if(this.gI==this.numGlasses)
      glasses!.style.visibility="hidden";
    else{
      this.glassesImage=avatar.glasses[this.gI];
      glasses!.style.visibility="visible";
    }
  }
  changeNose(index:number){
    var nose = document.getElementById("avatar-nose");
    if(index==-1)
      this.nI++;
    else
      this.nI=index;
    if(this.nI>this.numNoses)
      this.nI=0;
    //need to resize and reposition for nose/glasses combo
    if(this.nI==2){
      nose!.style.width="60px";
      nose!.style.height="40px";
      nose!.style.left="20px";
      nose!.style.top="35px";
    }
    else{
      nose!.style.width="20px";
      nose!.style.height="20px";
      nose!.style.left="40px";
      nose!.style.top="50px";
    }
    if(this.nI==this.numNoses)
      nose!.style.visibility="hidden";
    else{
      this.noseImage=avatar.noses[this.nI];
      nose!.style.visibility="visible";
    }
  }
}
