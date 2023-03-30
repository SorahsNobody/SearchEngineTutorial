import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {score} from 'src/environments/environment';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {
  constructor(private router: Router) { }

  toResult(): void {
    this.router.navigateByUrl("/results");
  }

  async onEnter(){
    this.router.navigateByUrl("/searchResults");
  }
 
  ngOnInit(): void {
    document.getElementById("point-count")!.innerText = "Score: " + score.key.toString();
  }

  image: any = "/assets/customize/avatar-base.png";

  onBuyh1() {
    this.image = "/assets/customize/avatar-h1.png";
  }
  onBuys1() {
    this.image = "/assets/customize/avatar-s2.png";
  }
  onBuyn1() {
    this.image = "/assets/customize/avatar-n2.png";
  }
  onBuyh2() {
    this.image = "/assets/customize/avatar-h1.png";
  }
  onBuys2() {
    this.image = "/assets/customize/avatar-s2.png";
  }
  onBuyn2() {
    this.image = "/assets/customize/avatar-n3.png";
  }
  onBuyh3() {
    this.image = "/assets/customize/avatar-h1.png";
  }
  onBuys3() {
    this.image = "/assets/customize/avatar-s2.png";
  }
  onBuyn3() {
    this.image = "/assets/customize/avatar-n3.png";
  }
}
