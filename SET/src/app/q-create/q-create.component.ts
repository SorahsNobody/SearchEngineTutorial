import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AniQues, AniKeys, SciKeys, SciQues, SpoQues, SupQues, SpoKeys, SupKeys, chosenCat, searchQuery, resultArray, currQuestion, questionNumber, avatar} from 'src/environments/environment';
import { EventManager } from '@angular/platform-browser';
import { SearchResultsService } from '../search-results.service';
import { SearchResult } from 'src/models/search-result.model';
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
    this.currCat = chosenCat.key;
    var bank = document.getElementById("kwords");
    let keys: string[] = this.getKeys(this.currCat);
    //FOR EACH key word string
    keys.forEach(element => {
      //Create and add a button to the Key Word Bank
      var keyButton = document.createElement("button");
      keyButton.innerHTML = element;
      bank?.appendChild(keyButton);
      this.addEvent(keyButton);
    });
  }
  image: any = avatar.key;
  /**
   * Will return the array of key words for the given category.
   * Key word array is chosen randomly.
   *
   * @param category => the category in which the key words will be retrieved from
   * @returns Array of strings
   */
  getKeys(category:string) {
    //randomly choose 1-5
    var qNum = Math.floor(Math.random() *5);
    questionNumber.key = qNum;
    this.setQuestion(qNum, category);
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
  /**
   * Updates the HTML question text to reflect which question was chosen.
   *
   * @param qNum => The array index value corresponding to the current question.
   */
  setQuestion(qNum: number, category: string): void{
    var q = document.getElementById("question");
    switch(category){
      case 'Animal':
        q!.innerText=AniQues[qNum];
        currQuestion.key=AniQues[qNum];
        break;
      case 'Superhero':
        q!.innerText=SupQues[qNum];
        currQuestion.key=SupQues[qNum];
        break;
      case 'Science':
        q!.innerText=SciQues[qNum];
        currQuestion.key=SciQues[qNum];
        break;
      default:
        q!.innerText=SpoQues[qNum];
        currQuestion.key=SpoQues[qNum];
        break;
    }

  }
  /**
   * Will add an event listener to the given button.
   *
   * @param button
   */
  addEvent(button: HTMLButtonElement): void{
    this.eventManager.addEventListener(button, 'click', ()=>{this.addInput(button)});
  }
  /**
   * When a button with this function is clicked:
   * 1. Clone old button (to get rid of old event listeners)
   * 2. Remove old button from the Key Word Bank
   * 3. Add new 'remove' event listener to Clone
   * 4. Add Clone to the 'input'
   *
   * @param button
   */
  addInput(button: HTMLButtonElement): void {
    var inpt = document.getElementById("queryBox");
    var bank = document.getElementById("kwords");
    var new_button = button.cloneNode(true); //need to clone to remove add event listener
    bank?.removeChild(button);
    this.removeEvent(new_button as HTMLButtonElement);
    inpt?.appendChild(new_button);
  }
  /**
   * Will add an event listener to the given button.
   *
   * @param button
   */
  removeEvent(button: HTMLButtonElement): void {
    this.eventManager.addEventListener(button, 'click', ()=>{this.removeInput(button)});
  }
  /**
   * When a button with this function is clicked:
   * 1. Clone old button (to get rid of old event listeners)
   * 2. Remove old button from 'input'
   * 3. Add new 'add' event listener to Clone
   * 4. Add Clone to the Key Word Bank
   *
   * @param button
   */
  removeInput(button:HTMLButtonElement): void{
    var inpt = document.getElementById("queryBox");
    var bank = document.getElementById("kwords");
    var new_button = button.cloneNode(true); //need to clone to remove event listener
    inpt?.removeChild(button);
    this.addEvent(new_button as HTMLButtonElement);
    bank?.appendChild(new_button);
  }

  /**
   * Everything below this comment is an example of how to utilize the cast search results
   */
  searchResultSubscription: Subscription = new Subscription;
  results: Array<SearchResult> = [];
  isLoadingResults: boolean = true;

  async onEnter(){
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
      await this.exampleGetResults(query);
      this.route.navigateByUrl("searchResults");
    }
    console.log(resultArray.key[0].title+"\n"+resultArray.key[0].snippet);
  }

  async exampleGetResults(query: string){
    var test = await this.searchResultService.getSearchResults(query);
    resultArray.key = test.items;
    return;
  }
}
