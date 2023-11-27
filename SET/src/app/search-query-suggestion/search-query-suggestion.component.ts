import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { delay, concatMap, finalize, forkJoin, from, of, BehaviorSubject, Subscription, takeUntil } from "rxjs";
import { SearchResultsService } from '../search-results.service';
import {faVolumeUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SpellSuggestionWord, SuggestionResourceRelation } from 'src/models/search-result.model';
import { phrases } from 'src/environments/environment';
import * as dmp from 'diff-match-patch';

declare var diff_match_patch:dmp;

@Component({
  selector: 'app-search-query-suggestion',
  templateUrl: './search-query-suggestion.component.html',
  styleUrls: ['./search-query-suggestion.component.css']
})
export class SearchQuerySuggestionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() word: string ="";
  @Input() showSuggestions: boolean = true;
  @Input() position: number =0;
  @Input() dictionary: any;
  @Input() currentSize: number=0;

  faVolumeUp = faVolumeUp;
  faTimes = faTimes;
  suggestionsSubscription: Subscription | undefined;
  spellSuggestion!: SpellSuggestionWord;

  dmp: any;
  diff: any;
  actualWord: string = '';
  suggestedWord: string = '';

  private currentImageList = Array<SuggestionResourceRelation>();
  private isLoaded$ = new BehaviorSubject('not loaded');
  private replaySubscription: Subscription | undefined;
  private interruptHover:boolean = false;

  constructor(private srs: SearchResultsService) {
    this.dmp = new dmp();
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.srs.stopAll();
    this.srs.stop();
    if(this.showSuggestions)
      this.suggestionsAndPlay();
    this.diff=this.dmp.diff_main(this.actualWord, this.suggestedWord);
    this.dmp.diff_cleanupSemantic(
      this.diff
    );
  }

  ngOnInit(): void {
    this.srs.stopAll();
    this.srs.stop();

    this.replaySubscription = this.srs.triggerReplay.subscribe((pos)=>{
      if(pos===this.position)
        this.replaySuggestions();
    });
  }
    /**
     * Reads the word suggestion array and retrieves the url of the images and audio associated with it.
     * This method is slower since it is done serially compared to mergeMap, but it does preserve order.
     * @param words
     * @returns void
     */
    private getResources(words: Array<string>): void{
      this.currentImageList = []; // Reset the array
      if(words == undefined || words.length<=0)
        return;
      from(words).pipe(concatMap((value) => {
          return forkJoin({ // Find the image and audio URL in parallel
              word: of({value}),
              image: this.srs.getImageResults(value),
              audioURL: this.srs.getAudioURL(value)
          })
      })).pipe(finalize(() => {if(this.currentImageList.length === words.length){ this.isLoaded$.next('loaded')}})).subscribe((d) => {
          let tempImageUrl = ''
          if(d.image && d.image.items){ // Check if the URL cannot be loaded
              tempImageUrl = d.image.items[0].image.thumbnailLink;
          }
          let resource: SuggestionResourceRelation = { // Create a SuggestionResourceRelation object and fill it with the found values
              word: d.word.value,
              image: tempImageUrl,
              audioURL: d.audioURL,
              isSelected: false
          }
          this.currentImageList.push(resource); // Add the new object into the array
      });
  }
      /**
     * Helper method for OnChanges
     */
      suggestionsAndPlay(){
        //retrieve spelling suggestions
        this.suggestionsSubscription = this.srs.getSpellSuggestionWord(this.word).subscribe(
            (ss: SpellSuggestionWord) => {
                //after getting suggestions reset tts variables and auto-play
                this.spellSuggestion = ss;
                this.getResources(ss.suggestions);
                this.playSuggestions();
            }
        );
    }
    /**
     * Find the index of the word in the currentImageList array
     * @param suggestedWord
     * @returns index of the word
     */
    private findWord(suggestedWord: string): number{
      return this.currentImageList.findIndex(e => e.word === suggestedWord);
  }
      /**
     * Retrieves url of a specific audio from the array
     * @param suggestedWord
     * @returns string
     */
      getAudio(suggestedWord: string): string{
        const index = this.findWord(suggestedWord);

        if(index < 0) return '';

        return this.currentImageList[index].audioURL;
    }
      /**
     * Creates and subscribes to an observable to play a custom message.
     * @param toSay custom message
     * @param callback (optional) function called when the custom message is finished
     */
      speak(toSay: string, callback?: () => void){
        this.srs.stop();
        this.srs.stopAll();
        let audioURL = this.getAudio(toSay);
        if(audioURL === ''){ // IF: audio is not found
            // THEN: Find the url manually and subscribe to the resulting observable
            this.srs.getAudioURL(toSay).pipe().subscribe((url) => {
                this.srs.playWord(url).pipe(finalize(()=>{
                    if(typeof callback === "function"){
                        callback();
                    }
                })).subscribe();
            });
        }else this.srs.playWord(audioURL).pipe(finalize(()=>{
            if(typeof callback === "function"){
                callback();
            }
        })).subscribe();
    }
      /**
     * Play a pseudo-randomized content phrase
     *
     * The callback function is used to start the suggestions readout after the content
     * phrase finishes.
     *
     * @param callback function called after voice completes processing
     */
      sayContentPhrase(callback: () => void){
        //Pick a random content phrase to play
        let rand = Math.floor(Math.random()*(phrases.content.length-1));//GlobalVariables.contentPhrases.length-1));
        //Play it
        this.speak(phrases.content[rand], callback);
    }
      /**
     * Plays the suggestions when everything is loaded and the content phrase is finished
     */
      playSuggestions(){
        if(this.spellSuggestion.suggestions== undefined || this.spellSuggestion.suggestions.length == 0){
            return;
        }
        this.isLoaded$.pipe(delay(500), takeUntil(this.srs.publicStopAll$)).subscribe((e) => { // Do not continue waiting for the isLoaded if the current box has been terminated
            if(this.isLoaded$.getValue() === 'loaded'){ // Check if the data isLoaded
                this.sayContentPhrase(() => {
                    this.srs.stopAll(); // Call stopAll just before reading the new list
                    this.srs.playSuggestions(this.currentImageList).pipe(finalize(() => { this.interruptHover = true })).subscribe();
                });
            }
        });
    }
    /**
     * Toggle suggestions
     */
    replaySuggestions(): void{
      this.interruptHover = false;
      this.srs.stop();
      this.srs.stopAll();
      this.showSuggestions = true;
      if(this.isLoaded$.getValue() === 'loaded') this.playSuggestions(); // Only play suggestions if the array is loaded
  }

      /**
     * Hides the suggestion dropdown
     */
      hideSuggestions(): void {
        this.showSuggestions = false;
        this.srs.stop();
        this.srs.stopAll();
        this.sayInterruptPhrase();
    }
        /**
     * Plays a psuedo-random interrupt (cue) phrase
     */
        sayInterruptPhrase(){
          let rand = Math.floor(Math.random()*(phrases.cue.length-1));
          this.speak(phrases.cue[rand]);
      }

    /**
     *
     * @param suggestedWord Retrieves whether a word is selected. It uses currentImageList array to track
     * @returns the state of the isSelected property of the given word (returns null when word cannot be found)
     */
    getSelectedWord(suggestedWord: string): boolean | null{
      const index = this.findWord(suggestedWord);
      if(index > -1){
          return this.currentImageList[index].isSelected;
      }
      return null;
  }

      /**
     * Sets the boolean of the isSelected property of the suggestedWord
     * @param suggestedWord
     * @param newState
     */
      setSelectedWord(suggestedWord: string, newState: boolean): void{
        const index = this.findWord(suggestedWord);
        if(index > -1){
            this.currentImageList[index].isSelected = newState;
        }
    }

  onMouseEnter(word: string) {
    if(!this.interruptHover){
        this.srs.stop();
        this.srs.stopAll();
        this.sayInterruptPhrase();
        this.interruptHover = true;
    }

    this.setSelectedWord(word, true);
}

onMouseLeave(word: string){
    this.setSelectedWord(word, false);
}
    /**
     * Will replace the misspelled word with the respective suggestion clicked
     *
     * @param suggestedWord -> word to replace misspelled word with
     */
    useThisSuggestion(suggestedWord: string): void {
      this.srs.replaceWithSuggestionEventEmitter.emit({
          misspelledWord: this.word,
          position: this.position,
          suggestedWord: suggestedWord
      });
  }

      /**
     * Retrieves url of a specific image from the array
     * @param suggestedWord
     * @returns string
     */
      getImage(suggestedWord: string): string{
        const index = this.findWord(suggestedWord);

        if(index < 0) return '';

        return this.currentImageList[index].image;
    }
}
