import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { player, playerName } from 'src/environments/environment';

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
  postPlayer(): Observable<any> {
    httpOptions.params.name=playerName.key;
    httpOptions.params.points=player.totalPoints;
    return this.http.post('https://cast.boisestate.edu:8080/set/player/',httpOptions);
  }
}
