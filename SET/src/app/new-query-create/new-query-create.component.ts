import { Component, OnInit, Input } from '@angular/core';
import { AniKeys, AniQA, AniQues, DONE, HisKeys, HisQA, HisQues, MusKeys, MusQA, MusQues, SciKeys, SciQA, SciQues, SpoKeys, SpoQA, SpoQues, SupKeys, SupQA, SupQues, avatar, currQuestion, environment, questionNumber } from 'src/environments/environment';
import { SearchResultsService } from '../search-results.service';
import { misspelledWords, stopWordsUsed, player, Hints } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const regex = /[  .,\/#!?$%\^&\*;:{}=\-_`~()]/;

interface Span {
  word: string;
  classes: Array<string>;
}

@Component({
  selector: 'app-new-query-create',
  templateUrl: './new-query-create.component.html',
  styleUrls: ['./new-query-create.component.css']
})
export class NewQueryCreateComponent implements OnInit {
  @Input() showSuggestions: boolean=true;
  @Input() word: string="";
  @Input() position: number=0;

  constructor(private srs: SearchResultsService, private router: Router, private snackBar: MatSnackBar) { }
  image: any = avatar.key;
  splitWords: Array<string> = [];
  dictionary: any;
  innerText:string='';
  inputText: string ='';
  tempScore: number = 0;

  ngOnInit(): void {
    this.initQuestion();
    //IF the player has already gone through the tutorial
    if(!environment.tutorial){
      this.tempScore=500; //initialize score for current query
      if(player.level>5){
        (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="hidden";
        //(<HTMLButtonElement>document.getElementsByClassName('check').item(0)).style.visibility="hidden";
      }
      else if(player.level>3){
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Using HINTS cost 50 points!";
        (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="visible";
        //(<HTMLButtonElement>document.getElementsByClassName('check').item(0)).style.visibility="hidden";
      }
      else{
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Using HINTS are free!";
        (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="visible";
        //(<HTMLButtonElement>document.getElementsByClassName('check').item(0)).style.visibility="visible";
      }
    }
    //ELSE the player needs to view the tutorial
    else{
      //Set up example query create
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Using HINTS are free!";
      (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="visible";
      //(<HTMLButtonElement>document.getElementsByClassName('check').item(0)).style.visibility="visible";
    }
  }

  back(){
    this.router.navigateByUrl("/gameMenu");
  }

  hint(){
    this.populateLists();
    if(misspelledWords.content.length>0 || stopWordsUsed.content.length>0){
      var rand = Math.floor(Math.random()*Hints.length);
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText=Hints[rand];
      if(player.level>3)
        this.tempScore-=50;
    }
    else if((<HTMLInputElement>document.getElementById('input')).value.length<=0)
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="You'll want to use keywords to construct a search query.";
    else
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Double check your query before submitting.";
  }

  populateLists(){
    misspelledWords.content = [];
    stopWordsUsed.content = [];
    var words = document.getElementsByTagName('app-query-word');
    for(let i = 0; i<words.length;i++){
      if(words.item(i)?.firstElementChild?.classList.contains('wrapWord'))
        misspelledWords.content.push(words.item(i)!.firstElementChild!.innerHTML);
      else if(words.item(i)?.firstElementChild?.classList.contains('stopWord'))
        stopWordsUsed.content.push(words.item(i)!.firstElementChild!.innerHTML);
    }
  }
  check(){
    this.populateLists();
    if(misspelledWords.content.length>0){
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Looks like you have some misspelled words. Check below for some suggested replacements:\n\nUnknown word: ";
      misspelledWords.content.forEach((word)=>{
        var newP = document.createElement("p");
        newP.innerText=word;
        newP.style.color="red";
        (<HTMLParagraphElement>document.getElementById("feedbackText")).appendChild(newP);
        var newP2 = document.createElement("p");
        var checkString = "\n\nTry one of these:\n";
        this.srs.getSpellSuggestionSentence(word, true).subscribe((e)=>{
          var jiq = this.srs.fixPHPResponse(e);
          console.log(<Array<string>>jiq[word]);
          (<Array<string>>jiq[word]).forEach(sug => {
            checkString+=(sug+"\n");
          });
          newP2.innerText=checkString;
          (<HTMLParagraphElement>document.getElementById("feedbackText")).appendChild(newP2);
        });
      });
    }
    else if(stopWordsUsed.content.length>0){
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="You don't always need words like: "+stopWordsUsed.content[0];
    }
  }


  initQuestion(tutorial=environment.tutorial){
    if(!tutorial){
      var randCat = Math.floor(Math.random()*6);
      var found = false;
      let rt: string[] = [];
      let cat: string = "";
      switch(randCat){
        case 0:
          found=this.chooseRandQuestion(AniQA.key);
          rt = AniKeys[questionNumber.key];
          cat="Animal";
          break;
        case 1:
          found=this.chooseRandQuestion(SupQA.key);
          rt = SupKeys[questionNumber.key];
          cat="Superhero";
          break;
        case 2:
          found=this.chooseRandQuestion(SciQA.key);
          rt = SciKeys[questionNumber.key];
          cat="Science";
          break;
        case 3:
          found=this.chooseRandQuestion(HisQA.key);
          rt = HisKeys[questionNumber.key];
          cat="History";
          break;
        case 4:
          found=this.chooseRandQuestion(MusQA.key);
          rt = MusKeys[questionNumber.key];
          cat="Music";
          break;
        default:
          found=this.chooseRandQuestion(SpoQA.key);
          rt = SpoKeys[questionNumber.key];
          cat="Sports";
          break;
      }
      if(found){
        this.setQuestion(questionNumber.key, cat);
      }
      else
        this.initQuestion();
      //return rt;
    }
    else{
      var q = document.getElementById("que");
      q!.innerText="What do frogs mainly eat?";
    }
  }
  /**
   * Updates the HTML question text to reflect which question was chosen.
   *
   * @param qNum => The array index value corresponding to the current question.
   */
  setQuestion(qNum: number, category: string): void{
    var q = document.getElementById("que");
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

  chooseRandQuestion(arr: number[]): boolean{
    var chosen = false;
    var qleft = arr.find(element => element == 0) == 0;
    while(!chosen && qleft){
      var qNum = Math.floor(Math.random() * arr.length);
      if(arr[qNum] != 1){
        arr[qNum] = 1;
        chosen = true;
        questionNumber.key = qNum;
        return true;
      }
    }
    if(!qleft)
      return false;
    else
      return true;
      //this.router.navigateByUrl('/gameMenu');
  }

  checkForCopy(): boolean{
    var q = document.getElementById("que")!.innerText.toLowerCase();
    var a = this.inputText.toLowerCase();
    if(a==q){
      this.tempScore-=50;
      return true;
    }
    else
      return false;
  }

  clear(){
    (<HTMLInputElement>document.getElementById('input')).value="";
    this.onInput();
  }

  /**
   * Called when the user sumbits their query
   * @returns
   */
  submit(){
    if(!environment.tutorial){
      this.tempScore=500;
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="";
      if(this.inputText.length<=0){
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Please formulate a query to continue.";
        return;
      }
      this.populateLists();
      if(this.checkForCopy()){
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Looks like you're trying to use the question as a search query. Although this might work, keyword queries are shorter. Please try again.";
        return;
      }
      var numWords = this.inputText.split(" ").length;
      if(numWords<=1){
        this.tempScore-=100;
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText=
        "Your query is pretty short, sometimes adding more words can help!";
      }
      else if(numWords>=6){
        this.tempScore-=50;
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText=
        "Your query is pretty long, sometimes using fewer words can help!";
      }
      //update score based on misspellings and stopwords
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
      "\nYou have "+misspelledWords.content.length+" misspelled words. ";
      if(misspelledWords.content.length==0)
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
        " Good Job!";
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
      "\nYou used "+stopWordsUsed.content.length+" stop words. ";
      if(stopWordsUsed.content.length==0)
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
        " Good Job!";
      else
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
        " These words are usually not needed in a search query.";

      this.tempScore-=Math.round((misspelledWords.content.length*100)/numWords);
      this.tempScore-=Math.round((stopWordsUsed.content.length*50)/numWords);

      //update player experience and total points earned
      player.exp+=this.tempScore;
      player.totalPoints+=this.tempScore;
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
      "\nPoints earned for query: "+this.tempScore;
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
      "\nTotal Points earned: "+player.totalPoints;

      player.numberOfQuestions++;
      sessionStorage.setItem("numQs", player.numberOfQuestions.toString());
      sessionStorage.setItem("points", player.totalPoints.toString());
      //Handle player leveling up
      var levelUp = false;
      var numLevel = 0;
      while(player.exp/1000>=1){
        player.exp-=1000;
        player.level+=1;
        levelUp=true;
        numLevel++;
      }
      if(levelUp){
        var luMessage = "You've leveled up"
        if(numLevel==1)
          luMessage+="! Congratulations!"
        else
          luMessage+=" "+numLevel+" times! Great query!";
        this.snackBar.open(luMessage, undefined, {duration:3000, panelClass:['SET-snackbar']});
      }
      sessionStorage.setItem("exp", player.exp.toString());
      sessionStorage.setItem("lvl", player.level.toString());
      //Clear the screen and load another question if there are any left
      this.clear();
      if(this.qLeft())
        this.initQuestion();
      else
        this.router.navigateByUrl('/gameMenu');

      //TODO: Provide feedback, suggestions, synonyms
    }
  }
  qLeft(): boolean{
    var qArr = [];
    qArr.push(MusQA);
    qArr.push(HisQA);
    qArr.push(SciQA);
    qArr.push(SupQA);
    qArr.push(AniQA);
    qArr.push(SpoQA);
    for(let i = 0; i<6;i++){
      var qleft = qArr[i].key.find(element => element == 0) == 0;
      if(!qleft)
        DONE.key[i]=1;
    }
    player.numDone=0;
    DONE.key.forEach(e=>{
      player.numDone+=e;
    });
    console.log("NumDone: "+player.numDone);
    if(player.numDone>=5){
      this.snackBar.open("You've attempted all of the questions! Great Job!", undefined, {duration:3000, panelClass:['SET-snackbar']});
      return false;
    }
    return true;
  }

    /**
     * Is called each time any kind of input is found in the
     * search input
     */
    onInput() {
      this.processInputString();
      //document.getElementById("input")!.replaceWith(<HTMLElement>document.getElementById("underneath-div"));
  }
  processInputString(showSuggestions: boolean=true) {
    this.showSuggestions = showSuggestions;
    this.inputText = (<HTMLInputElement>document.getElementById('input')).value;
    this.splitWords = this.inputText ? this.getSplitInput(this.inputText) : [];
    setTimeout(() => {
        document.querySelector('.underneath-div')!.scrollLeft += 100;
    });
}
getSplitInput(inputString: string): string[] {
  let word: string = "";
  let array: string[] = [];
  for (let i = 0; i < inputString.length; i++) {
      let char: string = inputString.charAt(i);
      if (char.match(regex)) {
          if (word) {
              array.push(word);
          }
          array.push(char);
          word = "";
      } else {
          word = word + char;
      }
  }
  if (word) {
      array.push(word);
  }
  return array;
}

  async getSplchk(word:string, sugs: boolean){
    return await this.srs.getSpellSuggestionSentence(word, sugs);
  }
}
