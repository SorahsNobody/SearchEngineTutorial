import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions:any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  params: new HttpParams({
  })
}

@Injectable({
  providedIn: 'root'
})
export class NltkServiceService {

  constructor(private http: HttpClient) { }

  /**
   * Will access nltk through the backend api and return the path_similarity of the two given words
   * from nltk wordnet. The returned score will be between 0-1 with 1 being the exact same word and 0
   * means the two words are not similar.
   * @param word1 
   * @param word2 
   * @returns a response containing the path_similarity score
   */
  getPSimilarity(word1: string, word2: string): Observable<any> {
    httpOptions.params = {}
    httpOptions.params.action = 'wn-p_sim';
    httpOptions.params.syn1 = word1;
    httpOptions.params.syn2 = word2;
    return this.http.get('https://cast.boisestate.edu:8080/CASTnltk/CASTnltk/', httpOptions);
  }

    /**
   * Will access nltk through the backend api and return the average path_similarity of the two given arrays
   * from nltk wordnet.
   * @param query the submitted query 
   * @param ans the array of answers
   * @returns a response containing the avg path_similarity score
   */
    getPSimilarityAVG(query: string, ans: string[]): Observable<any> {
      var qArr = query.split(" ");
      httpOptions.params = {}
      httpOptions.params.action = 'wn-p_sim-AVG';
      httpOptions.params.syn1 = [];
      httpOptions.params.syn2 = []
      for(let i=0; i<qArr.length; i++)
        httpOptions.params.syn1[i]=qArr[i];
      for(let j=0;j<ans.length;j++)
        httpOptions.params.syn2[j] = ans[j];
      return this.http.get('https://cast.boisestate.edu:8080/CASTnltk/CASTnltk/', httpOptions);
    }

    /**
   * Will access nltk through the backend api and return the average path_similarity of the two given arrays
   * from nltk wordnet.
   * @param query the submitted query 
   * @param ans the array of answers
   * @returns a response containing the avg path_similarity score
   */
        getPSimilarityBEST(query: string, ans: string[]): Observable<any> {
          var qArr = query.split(" ");
          httpOptions.params = {}
          httpOptions.params.action = 'wn-p_sim-BEST';
          httpOptions.params.syn1 = [];
          httpOptions.params.syn2 = []
          for(let i=0; i<qArr.length; i++)
            httpOptions.params.syn1[i]=qArr[i];
          for(let j=0;j<ans.length;j++)
            httpOptions.params.syn2[j] = ans[j];
          return this.http.get('https://cast.boisestate.edu:8080/CASTnltk/CASTnltk/', httpOptions);
        }
}
