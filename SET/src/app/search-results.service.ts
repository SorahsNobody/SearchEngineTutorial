import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SearchClass } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResultResponse } from 'src/models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  searchResultUrl = SearchClass.searchSelection[0].url;

  constructor(private http: HttpClient) { }

  getSearchResults(queryString: string): Observable<ResultResponse>{
    return this.http.get<ResultResponse>(
      this.searchResultUrl,
      {
        params: {
          "keyword" : queryString
        }
      }
    );
  }
}
