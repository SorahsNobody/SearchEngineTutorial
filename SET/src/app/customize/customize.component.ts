import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {score, avatar} from 'src/environments/environment';

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

  image: any = avatar.key;

  onBuyh1() {
    var str = avatar.key;
    var split = str.split("-", );
    split[1] = "h1";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }
  onBuyh2() {
    var str = avatar.key;
    var split = str.split("-", );
    split[1] = "h2";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }
  onBuyh3() {
    var str = avatar.key;
    var split = str.split("-", );
    split[1] = "h3";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }

  onBuys1() {
    var str = avatar.key;
    var split = str.split("-", );
    split[2] = "s1";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }
  onBuys2() {
    var str = avatar.key;
    var split = str.split("-", );
    split[2] = "s2";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }
  onBuys3() {
    var str = avatar.key;
    var split = str.split("-", );
    split[2] = "s3";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }

  onBuyn1() {
    var str = avatar.key;
    var split = str.split("-", );
    split[3] = "n1";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }
  onBuyn2() {
    var str = avatar.key;
    var split = str.split("-", );
    split[3] = "n2";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }
  onBuyn3() {
    var str = avatar.key;
    var split = str.split("-", );
    split[3] = "n3";
    str = split.join("-");
    avatar.key = str;
    this.image = avatar.key
  }

  toCatSelect(): void {
    this.router.navigateByUrl("/categories");
  }
}
