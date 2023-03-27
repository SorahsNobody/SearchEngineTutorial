import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AniKeys, SciKeys, SciQues, SpoKeys, SupKeys, chosenCat, searchQuery } from 'src/environments/environment';
import { EventManager } from '@angular/platform-browser';
import { SearchResultsService } from '../search-results.service';
import { ResultResponse, SearchResult } from 'src/models/search-result.model';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-q-create',
  templateUrl: './q-create.component.html',
  styleUrls: ['./q-create.component.css']
})
export class QCreateComponent implements OnInit {
  constructor(
    private eventManager: EventManager,
    private route: Router,
    private searchResultService: SearchResultsService) {}

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

  searchResultSubscription: Subscription = new Subscription;
  results: Array<SearchResult> = [];
  isLoadingResults: boolean = true;

  onEnter(): void {
    var inpt = document.getElementById("queryBox");
    var query: string = "";
    if(inpt?.hasChildNodes){
      inpt.childNodes.forEach(element => {
        var button = element as HTMLButtonElement;
        query+=button.innerText;
        query+=" ";
      });
      searchQuery.key = query;
      console.log(searchQuery.key);
      this.exampleGetResults(query);
      //this.route.navigateByUrl(""); //TODO: change to result page
    }
    console.log(this.results);
  }

  exampleGetResults(query: string){
    this.searchResultSubscription = this.searchResultService.getSearchResults(
      query
    ).subscribe(
      (resultResponse: ResultResponse) => {
        this.results = resultResponse.items;
        this.isLoadingResults = false;
      }
    );
  }
}
