import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { playerName } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  @Input('pName') pName = playerName.key; //Declares that this component has a variable named pName that can be called in the html with playerName

  ngOnInit(): void {
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
}
