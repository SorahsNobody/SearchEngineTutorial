import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { avatar } from 'src/environments/environment';

@Component({
  selector: 'app-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.css']
})
export class PlayerAvatarComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
      if(this.hat!=-1){
        this.changeHat(this.hat);
      }
      if(this.nose!=-1){
        this.noseImage=avatar.noses[this.nose];
        document.getElementById("avatar-nose")!.style.visibility="visible";
      }
      if(this.glasses!=-1){
        this.glassesImage=avatar.glasses[this.glasses];
        document.getElementById("avatar-glasses")!.style.visibility="visible";
      }
  }

  ngOnInit(): void {
      if(this.hat!=-1){
        this.changeHat(this.hat);
      }
      else
        document.getElementById("avatar-hat")!.style.visibility="hidden";
      if(this.nose!=-1){
        this.noseImage=avatar.noses[this.nose];
        document.getElementById("avatar-nose")!.style.visibility="visible";
      }
      else
        document.getElementById("avatar-nose")!.style.visibility="hidden";
      if(this.glasses!=-1){
        this.glassesImage=avatar.glasses[this.glasses];
        document.getElementById("avatar-glasses")!.style.visibility="visible";
      }
      else
        document.getElementById("avatar-glasses")!.style.visibility="hidden";
  }
  @Input() hat: number = avatar.hatIndex;
  @Input() nose: number = avatar.noseIndex;
  @Input() glasses: number = avatar.glassesIndex;
  @Input() parent: string = '';

  gI =avatar.glassesIndex;
  nI =avatar.noseIndex;
  numHats = avatar.hats.length;
  numGlasses = avatar.glasses.length;
  numNoses = avatar.noses.length;
  hatImage: any = avatar.hats[avatar.hatIndex];
  glassesImage: any = avatar.glasses[avatar.glassesIndex];
  noseImage: any = avatar.noses[avatar.noseIndex];
  bodyImage: any = avatar.key;

  changeHat(index:number){
    avatar.hatIndex=index;
    this.hatImage=avatar.hats[index];
    var hat = document.getElementById("avatar-hat");
    if(hat!.style.visibility=="hidden")
      hat!.style.visibility="visible";
    this.sessionStoreAvatar();
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
    this.sessionStoreAvatar();
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
    this.sessionStoreAvatar();
  }

  sessionStoreAvatar(){
    sessionStorage.setItem("nose", avatar.noseIndex.toString());
    sessionStorage.setItem("hat", avatar.hatIndex.toString());
    sessionStorage.setItem("glasses", avatar.glassesIndex.toString());
  }
}
