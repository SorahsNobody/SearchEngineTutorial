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
    if (avatar.key.includes("base")) {
      avatar.key = "/assets/customize/avatar-h1.png"
    }

    if (avatar.key.includes("s1")) {
      if (avatar.key.includes("n1")) {
        avatar.key = "/assets/customize/avatar-h1-s1-n1.png"
      }
      else if (avatar.key.includes("n2")) {
        avatar.key = "/assets/customize/avatar-h1-s1-n2.png"
      }
      else if (avatar.key.includes("n3")) {
        avatar.key = "/assets/customize/avatar-h1-s1-n3.png"
      }
      else{
        avatar.key = "/assets/customize/avatar-h1-s1.png"
      }
    }
    if (avatar.key.includes("s2")) {
      if (avatar.key.includes("n1")) {
        avatar.key = "/assets/customize/avatar-h1-s2-n1.png"
      }
      else if (avatar.key.includes("n2")) {
        avatar.key = "/assets/customize/avatar-h1-s2-n2.png"
      }
      else if (avatar.key.includes("n3")) {
        avatar.key = "/assets/customize/avatar-h1-s2-n3.png"
      }
      else{
        avatar.key = "/assets/customize/avatar-h1-s2.png"
      }
    }
    if (avatar.key.includes("s3")) {
      if (avatar.key.includes("n1")) {
        avatar.key = "/assets/customize/avatar-h1-s3-n1.png"
      }
      else if (avatar.key.includes("n2")) {
        avatar.key = "/assets/customize/avatar-h1-s3-n2.png"
      }
      else if (avatar.key.includes("n3")) {
        avatar.key = "/assets/customize/avatar-h1-s3-n3.png"
      }
      else{
        avatar.key = "/assets/customize/avatar-h1-s3.png"
      }
    }
    if (avatar.key.includes("n1")) {
      if (avatar.key.includes("s1")) {
        avatar.key = "/assets/customize/avatar-h1-s1-n1.png"
      }
      else if (avatar.key.includes("s2")) {
        avatar.key = "/assets/customize/avatar-h1-s2-n1.png"
      }
      else if (avatar.key.includes("s3")) {
        avatar.key = "/assets/customize/avatar-h1-s3-n1.png"
      }
      else{
        avatar.key = "/assets/customize/avatar-h1-n1.png"
      }
    }
    if (avatar.key.includes("n2")) {
      if (avatar.key.includes("s1")) {
        avatar.key = "/assets/customize/avatar-h1-s1-n2.png"
      }
      else if (avatar.key.includes("s2")) {
        avatar.key = "/assets/customize/avatar-h1-s2-n2.png"
      }
      else if (avatar.key.includes("s3")) {
        avatar.key = "/assets/customize/avatar-h1-s3-n2.png"
      }
      else{
        avatar.key = "/assets/customize/avatar-h1-n2.png"
      }
    }
    if (avatar.key.includes("n1")) {
      if (avatar.key.includes("s1")) {
        avatar.key = "/assets/customize/avatar-h1-s1-n3.png"
      }
      else if (avatar.key.includes("s2")) {
        avatar.key = "/assets/customize/avatar-h1-s2-n3.png"
      }
      else if (avatar.key.includes("s3")) {
        avatar.key = "/assets/customize/avatar-h1-s3-n3.png"
      }
      else{
        avatar.key = "/assets/customize/avatar-h1-n3.png"
      }
    }

    this.image = avatar.key
  }
  onBuys1() {
    avatar.key = "/assets/customize/avatar-s1.png";
    this.image = avatar.key
  }
  onBuyn1() {
    avatar.key = "/assets/customize/avatar-n2.png";
    this.image = avatar.key
  }
  onBuyh2() {
    avatar.key = "/assets/customize/avatar-h1.png";
    this.image = avatar.key
  }
  onBuys2() {
    avatar.key = "/assets/customize/avatar-s2.png";
    this.image = avatar.key
  }
  onBuyn2() {
    avatar.key = "/assets/customize/avatar-n3.png";
    this.image = avatar.key
  }
  onBuyh3() {
    avatar.key = "/assets/customize/avatar-h1.png";
    this.image = avatar.key
  }
  onBuys3() {
    avatar.key = "/assets/customize/avatar-s2.png";
    this.image = avatar.key
  }
  onBuyn3() {
    avatar.key = "/assets/customize/avatar-n3.png";
    this.image = avatar.key
  }

  accesories(a: String) {
    if (a.match("h1"))
    if (avatar.key.includes("n2")) {
      avatar.key = "/assets/customize/avatar-h1-n2.png"
    }
  }

  toCatSelect(): void {
    this.router.navigateByUrl("/categories");
  }
}
