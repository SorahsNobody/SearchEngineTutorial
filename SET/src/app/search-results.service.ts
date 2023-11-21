import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SearchClass } from 'src/environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { ResultResponse } from 'src/models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  searchResultUrl = SearchClass.searchSelection[0].url;
  //headers = new HttpHeaders().set("");
  constructor(private http: HttpClient) { }

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
  
  getSpellSuggestionSentence(word:string): Observable<any>{
    return this.http.get('https://cast.boisestate.edu/test/splchk.php',{params:{sentence: word}, responseType:'text'});
  }

  fixPHPResponse(response:string){
    var tr = response.replace('<!DOCTYPE html>', '').trim();
    return JSON.parse(tr);
  }
}
