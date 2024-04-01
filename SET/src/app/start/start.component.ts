import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { playerName, avatar, AniQA, SpoQA, SciQA, SupQA, HisQA, MusQA, player} from 'src/environments/environment';
import { DbadapterService } from '../dbadapter.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  constructor(private router: Router, private dbmanage: DbadapterService) { }

  image: any = avatar.key;

  ngOnInit(): void {
    this.dbmanage.getSessions().subscribe(data =>{
      console.log(data);
    });
    AniQA.key = [0,0,0,0,0];
    SpoQA.key = [0,0,0,0,0];
    SciQA.key = [0,0,0,0,0];
    SupQA.key = [0,0,0,0,0];
    MusQA.key = [0,0,0,0,0,0];
    HisQA.key = [0,0,0,0,0,0];
  }
  toCatSelect(): void {
    var pName = (<HTMLInputElement>document.getElementById('name')).value
    //IF the player has given some kind of name
    if(pName){
      sessionStorage.setItem("playerName", pName);
      //player.name=pName;
      playerName.key = pName;
      this.router.navigateByUrl("/queryCraft");
    }
  }
}
