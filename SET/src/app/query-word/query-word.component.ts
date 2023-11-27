import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {lastValueFrom} from "rxjs";
import { SearchResultsService } from "src/app/search-results.service"
import { stopWords } from 'src/assets/stop-words';
import { AcceptableSWs, misspelledWords } from 'src/environments/environment';

const regex = /^[ .,\/\"#!?$%\^<>&\*;:{}=\-_`~()]+|[ .,\/#!\"?$%\^<>&\*;:{}=\-_`~()]+$/g;

@Component({
  selector: 'app-query-word',
  templateUrl: './query-word.component.html',
  styleUrls: ['./query-word.component.css']
})
export class QueryWordComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() word: string = "";
  @Input() dictionary: any;
  @Input() showSuggestions: boolean = false;
  @Input() position: number = 0;
  @Input() currentSize: number = 0;


  classes: Array<string> = [];
  misspelled: boolean = false;
  innerText: string = '';

  isEnabled: boolean = false;

  constructor(private http: HttpClient, private srs: SearchResultsService) {
  }

  checkIfLatest(): void{
      if(this.position === this.currentSize - 1){
          this.isEnabled = true;
          return;
      }
      this.isEnabled = false;
  }

  /**
   * When a user clicks on the span for the word, send the position to the BehaviorSubject (triggerReplay) in the WordTTS service.
   */
  onClick(){
      this.srs.triggerReplay.next(this.position);
  }

  getIsEnabled(): boolean{
      return this.isEnabled;
  }

  /**
   * checkMisspelled will GET a response from the chosen SpellChecker defined in Global Variables.
   * It will set the required classes to this component depending on the response.
   *
   * @param word - word to check
   */
  checkMisspelled(word: string): void{
    //console.log('checking for mispellings...');
      this.srs.getSpellSuggestionSentence(word,false).subscribe((e) => {
        var jiq = this.srs.fixPHPResponse(e.toString());
        //console.log(jiq);
        if(jiq.errors.length > 0){
              this.classes = ['wrapWord', 'wrapWordBorder'];
              this.misspelled = true;
          }
        else{
          this.misspelled=false;
        }
      });
  }

  splChkSent(sent: string): Promise<any>{
          return lastValueFrom(this.http.get(sent));
  }

  ngOnInit(): void {

   }

  ngOnChanges(changes: SimpleChanges) {
      this.checkIfLatest();
      this.getIsEnabled();
      //SET inner text as the current word
      this.innerText = this.word;
      //IF the dictionary exists
      //if (this.dictionary) {
          //THEN move on to check for misspellings
          this.generateInnerHtml(this.word);
      //}
  }

  ngAfterViewInit() {
      //INITIALIZE view
      if (this.dictionary) {
          this.generateInnerHtml(this.word);
      }
  }

  generateInnerHtml(word: string): void {
    var second = this.word;
    //IF word only contains letters
      if ((/[A-Za-z]/i.test(word))) {
          //THEN check if word is misspelled
          this.checkMisspelled(word);
      }
      if(!this.misspelled) {
        //console.log('checking for stopword... ' + second)
          if (stopWords.includes(second.toLowerCase()) && !AcceptableSWs.key.includes(second.toLocaleLowerCase())) {
              //console.log('STOPWORD!!!')
              this.classes = ['stopWord'];
          } else if (this.word === '') {
              this.classes = ['stopWord'];
              this.innerText = '&nbsp';
          }
      }

  }
}
