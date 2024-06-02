import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { avatar } from 'src/environments/environment';
import { HeaderChangeService } from '../header-change.service';

@Component({
  selector: 'app-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.css']
})
export class PlayerAvatarComponent implements OnInit, OnChanges {

  constructor(private change: HeaderChangeService) { }
  ngOnChanges(changes: SimpleChanges): void {
      //console.log("changes found!"+changes);
      if(avatar.hatIndex!=-1){
        this.changeHat(avatar.hatIndex);
      }
      if(avatar.noseIndex!=-1){
        this.noseImage=avatar.noses[avatar.noseIndex];
        document.getElementById("avatar-nose")!.style.visibility="visible";
      }
      if(avatar.glassesIndex!=-1){
        this.glassesImage=avatar.glasses[avatar.glassesIndex];
        document.getElementById("avatar-glasses")!.style.visibility="visible";
      }
  }

  ngOnInit(): void {
      this.change.change.subscribe(data=>{
        // console.log("Change registered: " +data);
        if(data)
          this.refreshAvatar();
      });
      this.refreshAvatar();
  }

  refreshAvatar(){
    if(avatar.hatIndex!=-1){
      this.hatImage=avatar.hats[avatar.hatIndex];
      document.getElementById("avatar-hat")!.style.visibility="visible";
    }
    else
      document.getElementById("avatar-hat")!.style.visibility="hidden";
    if(avatar.noseIndex!=-1){
      this.noseImage=avatar.noses[avatar.noseIndex];
      document.getElementById("avatar-nose")!.style.visibility="visible";
    }
    else
      document.getElementById("avatar-nose")!.style.visibility="hidden";
    if(avatar.glassesIndex!=-1){
      this.glassesImage=avatar.glasses[avatar.glassesIndex];
      document.getElementById("avatar-glasses")!.style.visibility="visible";
    }
    else
      document.getElementById("avatar-glasses")!.style.visibility="hidden";
  }

  @Input() parent: string = '';

  gI =avatar.glassesIndex;
  nI =avatar.noseIndex;
  hI =avatar.hatIndex;
  numHats = avatar.hats.length;
  numGlasses = avatar.glasses.length;
  numNoses = avatar.noses.length;
  hatImage: any = avatar.hats[avatar.hatIndex];
  glassesImage: any = avatar.glasses[avatar.glassesIndex];
  noseImage: any = avatar.noses[avatar.noseIndex];
  bodyImage: any = avatar.key;

  changeHat(index:number){
    var hat = document.getElementById("avatar-hat");
    if(index==-1)
      this.hI++;
    else
      this.hI=index;
    if(this.hI>this.numHats)
      this.hI=0
    if(this.hI==6)
      hat!.style.visibility="hidden";
    else{
      this.hatImage=avatar.hats[this.hI];
      hat!.style.visibility="visible";
    }
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
