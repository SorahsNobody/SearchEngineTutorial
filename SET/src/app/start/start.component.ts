import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { playerName, avatar} from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  constructor(private router: Router) { }

  image: any = avatar.key;

  ngOnInit(): void {
  }

  toInstruct(): void {
    this.router.navigateByUrl("/instructions");
  }

  toCatSelect(): void {
    var pName = (<HTMLInputElement>document.getElementById('name')).value
    //IF the player has given some kind of name
    if(pName){
      playerName.key = pName;
      this.router.navigateByUrl("/categories");
    }
  }
}
