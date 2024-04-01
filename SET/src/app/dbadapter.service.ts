import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions:any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DbadapterService {

  constructor(private http: HttpClient) { }

  getSessions(): Observable<any> {
    return this.http.get('https://cast.boisestate.edu:8080/searchTables/sessions/', httpOptions);
  }
  getUserFromName(name: string): Observable<any> {
    httpOptions.params = {};
    httpOptions.params.name = name;
    return this.http.get('https://cast.boisestate.edu:8080/set/player/',httpOptions)
  }
}
