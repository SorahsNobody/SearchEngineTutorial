import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {score, avatar, unlocks} from 'src/environments/environment';

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
    if (unlocks.key.includes("h1")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[1] = "h1";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 500) {
      score.key -= 500
      var str = avatar.key;
      var split = str.split("-", );
      split[1] = "h1";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
      unlocks.key = unlocks.key + "h1"
    }
  }
  onBuyh2() {
    if (unlocks.key.includes("h2")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[1] = "h2";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 1000) {
      score.key -= 1000
      unlocks.key = unlocks.key + "h2"
      var str = avatar.key;
      var split = str.split("-", );
      split[1] = "h2";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
  }
  onBuyh3() {
    if (unlocks.key.includes("h3")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[1] = "h3";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 1500) {
      score.key -= 1500
      unlocks.key = unlocks.key + "h3"
      var str = avatar.key;
      var split = str.split("-", );
      split[1] = "h3";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }

  }

  onBuys1() {
    if (unlocks.key.includes("s1")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[2] = "s1";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 500) {
      score.key -= 500
      unlocks.key = unlocks.key + "s1"
      this.ngOnInit();
    }
  }
  onBuys2() {
    if (unlocks.key.includes("s2")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[2] = "s2";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 1000) {
      score.key -= 1000
      unlocks.key = unlocks.key + "s2"
      var str = avatar.key;
      var split = str.split("-", );
      split[2] = "s2";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }

  }
  onBuys3() {
    if (unlocks.key.includes("s3")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[2] = "s3";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 1500) {
      score.key -= 1500
      unlocks.key = unlocks.key + "s3"
      var str = avatar.key;
      var split = str.split("-", );
      split[2] = "s3";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
  }

  onBuyn1() {
    if (unlocks.key.includes("n1")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[3] = "n1";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 500) {
      score.key -= 500
      unlocks.key = unlocks.key + "n1"
      var str = avatar.key;
      var split = str.split("-", );
      split[3] = "n1";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
  }
  onBuyn2() {
    if (unlocks.key.includes("n2")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[3] = "n2";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 1000) {
      score.key -= 1000
      unlocks.key = unlocks.key + "n2"
      var str = avatar.key;
      var split = str.split("-", );
      split[3] = "n2";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
  }
  onBuyn3() {
    if (unlocks.key.includes("n3")) {
      var str = avatar.key;
      var split = str.split("-", );
      split[3] = "n3";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
    else if(score.key >= 1500) {
      score.key -= 1500
      unlocks.key = unlocks.key + "n3"
      var str = avatar.key;
      var split = str.split("-", );
      split[3] = "n3";
      str = split.join("-");
      avatar.key = str;
      this.image = avatar.key
      this.ngOnInit();
    }
  }

  toCatSelect(): void {
    this.router.navigateByUrl("/categories");
  }
}
