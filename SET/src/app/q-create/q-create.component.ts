import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { AniKeys, SciKeys, SciQues, SpoKeys, SupKeys, chosenCat } from 'src/environments/environment';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-q-create',
  templateUrl: './q-create.component.html',
  styleUrls: ['./q-create.component.css']
})
export class QCreateComponent implements OnInit {
  constructor(private eventManager: EventManager) {}
  @Input('currCat') currCat = chosenCat.key;
  ngOnInit(): void {
    var bank = document.getElementById("kwords");
    let keys: string[] = this.getKeys(chosenCat.key);
    keys.forEach(element => {
      var keyButton = document.createElement("button");
      keyButton.innerHTML = element;
      bank?.appendChild(keyButton);
      this.addEvent(keyButton);
    });
  }
  getKeys(category:string) {
    //randomly choose 1-5
    var qNum = Math.floor(Math.random() *5);
    this.setQuestion(qNum);
    let rt: string[] = [];
    switch(category){
      case 'Animal':
        rt = AniKeys[qNum];
        break;
      case 'Superhero':
        rt = SupKeys[qNum];
        break;
      case 'Science':
        rt = SciKeys[qNum];
        break;
      default:
        rt = SpoKeys[qNum];
        break;
    }
    return rt;
  }
  setQuestion(qNum: number): void{
    var q = document.getElementById("question");
    q!.innerText=SciQues[qNum];
  }
  addEvent(button: HTMLButtonElement): void{
    this.eventManager.addEventListener(button, 'click', ()=>{this.addInput(button)});
  }
  addInput(button: HTMLButtonElement): void {
    var inpt = document.getElementById("queryBox");
    var bank = document.getElementById("kwords");
    var new_button = button.cloneNode(true); //need to clone to remove add event listener
    bank?.removeChild(button);
    this.removeEvent(new_button as HTMLButtonElement);
    inpt?.appendChild(new_button);
  }
  removeEvent(button: HTMLButtonElement): void {
    this.eventManager.addEventListener(button, 'click', ()=>{this.removeInput(button)});
  }
  removeInput(button:HTMLButtonElement): void{
    var inpt = document.getElementById("queryBox");
    var bank = document.getElementById("kwords");
    var new_button = button.cloneNode(true); //need to clone to remove event listener
    inpt?.removeChild(button);
    this.addEvent(new_button as HTMLButtonElement);
    bank?.appendChild(new_button);
  }
}
