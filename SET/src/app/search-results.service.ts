import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SearchClass } from 'src/environments/environment';
import { concatMap, finalize, from, delay, of, Subject, takeUntil, Observable, lastValueFrom } from 'rxjs';
import { ImagesResultResponse, ResultResponse, SuggestionReplacer, SuggestionResourceRelation } from 'src/models/search-result.model';

const DELAY_BETWEEN_WORDS = 1500;

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  //TTS stuff
  private  TTSUrl: string ="https://cast.boisestate.edu/extension/tts.php?voice=Joanna";
  private audioObj: HTMLAudioElement = new Audio();
  private stop$ = new Subject();
  private stopAll$ = new Subject<string>();
  private previousItem: SuggestionResourceRelation|undefined;
  publicStopAll$: Observable<string> = this.stopAll$;
  triggerReplay: Subject<number> = new Subject<number>(); // Stores and emits the latest selected word
  //Search Result Stuff
  searchResultUrl = SearchClass.searchSelection[0].url;
  constructor(private http: HttpClient) { }

  private audioObservable(url: string){
    return new Observable(() => {
      try{
        this.audioObj.src = url;
        this.audioObj.load();
        this.audioObj.play();
        this.audioObj.onended = () => {
          this.stop$.next('');
        };
      }
      catch(e){
        console.error(`ERROR: ${e}`);
      }
    });
  }

  /**
   * Play a given URL. This is meant to be used for static phrases.
   * @param url
   * @returns
   */
  playWord(url: string){
    return this.audioObservable(url).pipe(takeUntil(this.stop$), finalize(() => {
    }));
  }

    /**
   * Sends an event that the current audio has been stopped. It ends the observable
   * for singular audio.
   */
    stop(){
      // TODO - switch to being used for singular phrases?
      this.stop$.next('');
    }

    /**
     * Sends an event to stop all subscriptions. This is meant to be used when
     * playSuggestions is used
     */
    stopAll(){
      this.stopAll$.next('');
    }
  /**
   * Plays an item from the suggestions array. This is to be used with
   * the playSuggestions function
   * @param e
   * @returns
   */
  playSuggestionsAudio(e: SuggestionResourceRelation){
    return this.audioObservable(e.audioURL).pipe(takeUntil(this.stop$), finalize(() => {
      this.previousItem = e;
    }));
  }

  /**
   * Transforms the suggestions array into Observables that are sent individually
   * to preserve order.
   * @param suggestions
   * @returns
   */

  playSuggestions(suggestions: SuggestionResourceRelation[]){
    return from(suggestions).pipe(concatMap((e) => {
      return of(e).pipe(delay(DELAY_BETWEEN_WORDS)); // Change this delay to change the delay between words
    })).pipe(concatMap((e) => {
      if(this.previousItem) this.previousItem.isSelected = false;
      e.isSelected = true;
      return this.playSuggestionsAudio(e).pipe();
    }), finalize(() => {
      if(this.previousItem) this.previousItem.isSelected = false;
    }),takeUntil(this.stopAll$));
  }

  /**
   * Gets the strings for the audio of a given voice defined in the global scope
   * and word given through the founction
   * @param word
   * @returns URL to the audio source
   */
    getAudioURL(word: string): Observable<string>{
      return this.http.get<string>(`${this.TTSUrl}&speech=${word}`)
      .pipe(
        // Error handling here
      );
    }
  async getSearchResults(queryString: string): Promise<ResultResponse>{//Observable<ResultResponse>{
    return await lastValueFrom(this.http.get<ResultResponse>(
      this.searchResultUrl,
      {
        params: {
          "keyword" : queryString
        }
      }
    ));
  }

  getSpellSuggestionSentence(word:string, sugs:boolean): Observable<any>{
    return this.http.get('https://cast.boisestate.edu/test/splchk.php',{params:{sentence: word, sugs:sugs}, responseType:'text'});
  }

  getSpellSuggestionWord(word:string): Observable<any>{
    return this.http.get('https://cast.boisestate.edu/test/splchk.php',{params:{word: word}, responseType:'text'});
  }

  fixPHPResponse(response:string){
    var tr = response.replace('<!DOCTYPE html>', '').trim();
    return JSON.parse(tr);
  }

  getImageResults(queryString: string): Observable<ImagesResultResponse> {
    return this.http.get<ImagesResultResponse>('https://cast.boisestate.edu/googleAPI/googleImages.php',{params:{"keyword":queryString}});
  }

  replaceWithSuggestionEventEmitter: EventEmitter<SuggestionReplacer> = new EventEmitter();
  resetSearchInputEventEmitter: EventEmitter<void> = new EventEmitter();

  getSynonyms(word: string): Observable<any>{
    return this.http.get('http://thesaurus.altervista.org/thesaurus/v1',{params:{key:'JeO9BFG3t84IqjBorCVh',word:word,language:'en_US',output:'json'}});
  }
}
