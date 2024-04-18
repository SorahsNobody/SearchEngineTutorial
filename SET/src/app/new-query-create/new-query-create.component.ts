import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AniKeys, AniQA, AniQues, DONE, HisKeys, HisQA, HisQues, MusKeys, MusQA, MusQues, SciKeys, SciQA, SciQues, SpoKeys, SpoQA, SpoQues, SupKeys, SupQA, SupQues, avatar, currQuestion, environment, questionNumber, tutorialParts } from 'src/environments/environment';
import { SearchResultsService } from '../search-results.service';
import { misspelledWords, stopWordsUsed, player, Hints } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DbadapterService } from '../dbadapter.service';

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

  constructor(private srs: SearchResultsService, private router: Router, private snackBar: MatSnackBar, private dbManage: DbadapterService) { }
  image: any = avatar.key;
  splitWords: Array<string> = [];
  dictionary: any;
  innerText:string='';
  inputText: string ='';
  tempScore: number = 0;
  elements : HTMLElement[] = [];
  intervalIDS: ReturnType<typeof setInterval>[] = [];

  @HostListener('document:keydown',['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    //console.log(event.key);
    if(event.key=='Enter')
      this.submit();
  }

  /** Called once the component is loaded */
  ngOnInit(): void {
    this.initQuestion();
    //IF the player has already gone through the tutorial
    if(!environment.tutorial){
      this.tempScore=500; //initialize score for current query
      if(player.level>=5){
        (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="hidden";
      }
      else if(player.level>=3){
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Using HINTS cost 50 points!";
        (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="visible";
      }
      else{
        (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Using HINTS are free!";
        (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="visible";
      }
    }
    //ELSE the player needs to view the tutorial
    else{
      var frogbert = document.getElementById("frogbert");
      var speechbubble = document.getElementsByClassName("speech")[0];
      var que = document.getElementById("questionDiv");
      var queBox = document.getElementById("queryBox");
      var hintButton = document.getElementsByClassName("hint")[0];
      //var feedbackText = document.getElementById("feedbackText");
      var feedback = document.getElementById("feedback");
      var search = document.getElementById("submit");
      var clear = document.getElementById("clear");
      var back = document.getElementsByClassName("back")[0];
      var input = document.getElementById("input");

      this.elements.push(<HTMLElement>frogbert); //0
      this.elements.push(<HTMLElement>speechbubble); //1
      this.elements.push(<HTMLElement>que); //2
      this.elements.push(<HTMLElement>queBox); //3
      this.elements.push(<HTMLElement>hintButton); //4
      this.elements.push(<HTMLElement>feedback); //5
      this.elements.push(<HTMLElement>search); //6
      this.elements.push(<HTMLElement>clear); //7
      this.elements.push(<HTMLElement>back); //8
      this.elements.push(<HTMLElement>input); //9
      //Set up example query create
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="Using HINTS are free!";
      (<HTMLButtonElement>document.getElementsByClassName('hint').item(0)).style.visibility="visible";
      //start tutorial playthrough
      this.continueTutorial();
    }
  }

  /** Handles the back button */
  back(){
    if(!environment.tutorial)
      this.router.navigateByUrl("/gameMenu");
  }

  /** Handles the hint button functionality */
  hint(){
    this.populateLists();
    //IF the player hasn't input anything yet
    if((<HTMLInputElement>document.getElementById('input')).value.length<=0)
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText="You'll want to use keywords to construct a search query.";
    //ELSE IF the player has input something and is less than level 3
    else if(player.level<3 && (misspelledWords.content.length>0 || stopWordsUsed.content.length>0)){
      if(misspelledWords.content.length>0)
        this.hintMisspelling();
      if(stopWordsUsed.content.length>0)
        this.hintStopWords();
    }
    //ELSE IF the player has input something and is level 5 or greater and there's a mistake in their query
    else if(player.level>=5 && (misspelledWords.content.length>0 || stopWordsUsed.content.length>0)){
      this.tempScore-=100;
      if(misspelledWords.content.length>0)
        this.hintMisspelling();
      if(stopWordsUsed.content.length>0)
        this.hintStopWords();
    }
    //ELSE IF the player has input something and is between levels 3-4 and there's a mistake in their query
    else if(player.level>=3 && (misspelledWords.content.length>0 || stopWordsUsed.content.length>0)){
      this.tempScore-=50;
      if(misspelledWords.content.length>0)
        this.hintMisspelling();
      if(stopWordsUsed.content.length>0)
        this.hintStopWords();
    }
    //ELSE the player has input something and there's no spelling errors or stopwords used
    else{
      var rand = Math.floor(Math.random()*Hints.length);
      var text = "Double check your query before submitting." + "\n" + Hints[rand];
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText=text;
    }
  }

  /**
   * Will check the user input for misspellings and stopwords, will put these into
   * their own respective arrays
   */
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
  /** Helper method for populating the feedback box - For Misspellings */
  hintMisspelling(){
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
    /** Helper method for populating the feedback box - For Stopword usage */
  hintStopWords(){
    (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+="\nYou don't always need words like: "+stopWordsUsed.content[0];
  }

  /**
   * Method to help with the flow of the tutorial
   */
  async continueTutorial(){
    switch (tutorialParts.currPart) {
      //Just starting the tutorial - "Frogbert needs help"
      case 0:
        for(var i=0;i<this.elements.length;i++){
          if(i!=0 && i!=1)
            this.elements[i].style.opacity=".2";
        }
        await this.playAudio('assets/audio/1.m4a');
        break;
      //"Help him with a search query"
      case 1:
        this.resetOpacity();
        for(var i=0;i<this.elements.length;i++){
          if(i!=2 && i!=3 && i!=6 && i!=7 && i!=9)
            this.elements[i].style.opacity=".2";
        }
        await this.playAudio('assets/audio/2.m4a');
        break;
      //"Type your query in the input box"
      case 2:
        this.resetOpacity();
        for(var i=0;i<this.elements.length;i++){
          if(i!=2 && i!=3 && i!=6 && i!=7 && i!=9)
            this.elements[i].style.opacity=".2";
        }
        this.borderFlash(this.elements[9]);
        await this.playAudio('assets/audio/3.m4a');
        break;
      //"Circled word is misspelled"
      case 3:
        (<HTMLInputElement>document.getElementById('input')).value="dooooooog";
        this.onInput();
        await this.playAudio('assets/audio/4-1.m4a');
        break;
      //"Grey word may not be needed"
      case 4:
        (<HTMLInputElement>document.getElementById('input')).value="is are at be";
        this.onInput();
        await this.playAudio('assets/audio/4-2.m4a');
        break;
      //"Click submit when ready"
      case 5:
        (<HTMLInputElement>document.getElementById('input')).value="what do froogs eat";
        this.onInput();
        this.borderFlash(this.elements[6])
        await this.playAudio('assets/audio/5.m4a');
        break;
      //"Hint button explaination"
      case 7:
        this.resetOpacity();
        for(var i=0;i<this.elements.length;i++){
          if(i!=2 && i!=3 && i!=4 && i!=6 && i!=7 && i!=9)
            this.elements[i].style.opacity=".2";
        }
        this.borderFlash(this.elements[4]);
        await this.playAudio('assets/audio/6.m4a');
        break;
      //"Clear input explaination"
      case 6:
        this.borderFlash(this.elements[7])
        await this.playAudio('assets/audio/7.m4a');
        break;
      //"Feedback explaination"
      case 8:
        this.resetOpacity();
        for(var i=0;i<this.elements.length;i++){
          if(i!=5)
            this.elements[i].style.opacity=".2";
        }
        this.submit();
        await this.playAudio('assets/audio/8.m4a');
        break;
      //"Points explaination"
      case 9:
        await this.playAudio('assets/audio/9.m4a');
        break;
    }
    this.stopFlash();
    tutorialParts.currPart++;
    if(tutorialParts.currPart<=9)
      this.continueTutorial();
    else{
      environment.tutorial=false;
      player.totalPoints+=500;
      this.router.navigateByUrl("/customize");
    }
  }

  resetOpacity(){
    this.elements.forEach((ele)=>{
      ele.style.opacity="1";
    })
  }
  /**
   * Will return a promise to play the giving audio
   * @param path
   * @returns a promise object
   */
  playAudio(path: string){
    var audio = new Audio(path);
    return new Promise(res=>{
      audio.play();
      audio.onended = res;
    })
  }

  borderFlash(element:HTMLElement){
    var flashEle;
    var pattern = false;
    flashEle = setInterval(setBorder,500);
    this.intervalIDS.push(flashEle);
    function setBorder(){
      if(pattern){
        pattern=false;
        element.style.border = "solid black";
        element.style.borderWidth = "3px";
      }
      else{
        pattern=true;
        element.style.border = "solid orange";
        element.style.borderWidth = "3px";
      }
    }
  }
  stopFlash(){
    for(var i=0; i<this.intervalIDS.length; i++){
      clearInterval(this.intervalIDS.pop());
    }
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.border="";
        //this.elements[i].style.borderWidth="0px";
    }
  }
  /**
   * Method to initialize a new question
   * @param tutorial -> Whether the player is going through the tutorial or not
   */
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
      q!.innerText="What is a frogs diet?";
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

  /**
   * Chooses a random question
   * @param arr
   * @returns true if there are questions left, false otherwise
   */
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

  /**
   * Checks if the user has just copied the question
   * @returns true if the user input is equivalent to the question, false otherwise
   */
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

  /**
   * Clears the search input
   */
  clear(){
    (<HTMLInputElement>document.getElementById('input')).value="";
    this.onInput();
  }

  /**
   * Called when the user sumbits their query
   * @returns
   */
  submit(){
    this.dbManage.postEvent(7,"query submitted", this.inputText).subscribe((data)=>{
    });
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
    if(!environment.tutorial){
      player.exp+=this.tempScore;
      player.totalPoints+=this.tempScore;
    }
    (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+=
    "\nPoints earned for query: "+this.tempScore;
    if(!environment.tutorial)
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+="\nTotal Points earned: "+player.totalPoints;
    else
      (<HTMLParagraphElement>document.getElementById("feedbackText")).innerText+="\nTotal Points earned: "+this.tempScore;

    if(!environment.tutorial){
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
      this.dbManage.putPlayer().subscribe((data)=>{
        console.log(data);
        if(this.qLeft())
          this.initQuestion();
        else
          this.router.navigateByUrl('/gameMenu');
      })
    }
    //TODO: Provide feedback, suggestions, synonyms
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
