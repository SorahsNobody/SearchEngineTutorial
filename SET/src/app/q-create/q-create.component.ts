import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AniQues, AniKeys, SciKeys, SciQues, SpoQues, SupQues, SpoKeys, SupKeys, chosenCat, searchQuery, resultArray, currQuestion, questionNumber, avatar, AniQA, SupQA, SciQA, SpoQA, HisQA, HisKeys, MusQA, MusKeys, HisQues, MusQues} from 'src/environments/environment';
import { EventManager } from '@angular/platform-browser';
import { SearchResultsService } from '../search-results.service';
import { SearchResult } from 'src/models/search-result.model';
import { Subscription } from "rxjs";


  var dragSrc: HTMLButtonElement;
  function handleDragStart(this: HTMLButtonElement, e: DragEvent){
    dragSrc = this;
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/html', this.innerHTML);
  }

  function handleDragEnd(this: HTMLButtonElement){
    let items = document.querySelectorAll('button');
    items.forEach(function(item){
      item.classList.remove('over');
    });
  }

  function handleDrop(this: HTMLButtonElement, e: DragEvent){
    e.stopPropagation();
    if(dragSrc !== this){
      dragSrc.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer!.getData('text/html');
    }

    return false;
  }

  function handleDragOver(e: DragEvent){
    e.preventDefault();
    return false;
  }

  function handleDragEnter(this: HTMLButtonElement){
    this.classList.add('over');
  }

  function handleDragLeave(this: HTMLButtonElement){
    this.classList.remove('over');
  }


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
  public keys: string[] = [];
  ngOnInit(): void {
    this.currCat = chosenCat.key;
    this.keys = this.getKeys(this.currCat);
    var bank = document.getElementById("kwords");
    //FOR EACH key word string
    this.keys.forEach(element => {
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
    let rt: string[] = [];
    switch(category){
      // For each case, get a random index from the remaining questions in that category
      case 'Animal':
        this.chooseRandQuestion(AniQA.key);
        rt = AniKeys[questionNumber.key];
        break;
      case 'Superhero':
        this.chooseRandQuestion(SupQA.key);
        rt = SupKeys[questionNumber.key];
        break;
      case 'Science':
        this.chooseRandQuestion(SciQA.key);
        rt = SciKeys[questionNumber.key];
        break;
      case 'History':
        this.chooseRandQuestion(HisQA.key);
        rt = HisKeys[questionNumber.key];
        break;
      case 'Music':
        this.chooseRandQuestion(MusQA.key);
        rt = MusKeys[questionNumber.key];
        break;
      default:
        this.chooseRandQuestion(SpoQA.key);
        rt = SpoKeys[questionNumber.key];
        break;
    }
    // Then set the question and return the key list
    this.setQuestion(questionNumber.key, category);
    return rt;
  }

  chooseRandQuestion(arr: number[]){
    var chosen = false;
    var qleft = arr.find(element => element == 0) == 0;
    while(!chosen && qleft){
      var qNum = Math.floor(Math.random() * 5);
      if(arr[qNum] != 1){
        arr[qNum] = 1;
        chosen = true;
        questionNumber.key = qNum;
      }
    }
    if(!qleft)
      this.toCatSelect();
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
      case 'History':
        q!.innerText=HisQues[qNum];
        currQuestion.key=HisQues[qNum];
        break;
      case 'Music':
        q!.innerText=MusQues[qNum];
        currQuestion.key=MusQues[qNum];
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
    var nb = new_button as HTMLButtonElement;
    nb.draggable = true;
    nb.addEventListener('dragenter', handleDragEnter);
    nb.addEventListener('dragleave', handleDragLeave);
    nb.addEventListener('dragover', handleDragOver);
    nb.addEventListener('dragend', handleDragEnd);
    nb.addEventListener('dragstart', handleDragStart);
    nb.addEventListener('drop', handleDrop);
    this.removeEvent(nb);
    inpt?.appendChild(nb);
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
  }

  async exampleGetResults(query: string){
    var test = await this.searchResultService.getSearchResults(query);
    resultArray.key = test.items;
    return;
  }

  toCatSelect(): void {
    this.route.navigateByUrl("/categories");
  }

  goToqCreate(): void {
    this.route.navigateByUrl("/queryCreate");
  }
}
