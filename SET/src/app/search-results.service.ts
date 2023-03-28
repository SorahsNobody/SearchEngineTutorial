import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SearchClass } from 'src/environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { ResultResponse } from 'src/models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  searchResultUrl = SearchClass.searchSelection[0].url;

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
}
