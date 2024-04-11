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
  //Will only be called once to instatiate player in database
  postPlayer(): Observable<any> {
    httpOptions.params.name=playerName.key;
    return this.http.post('https://cast.boisestate.edu:8080/set/player/',httpOptions);
  }
  //Will be called whenever a player's profile needs to be updated
  putPlayer(): Observable<any>{
    httpOptions.params.name=player.name;
    httpOptions.params.points=player.totalPoints;
    httpOptions.params.qsDone=player.numberOfQuestions;
    httpOptions.params.level=player.level;
    return this.http.put("https://cast.boisestate.edu:8080/set/player/",httpOptions);
  }
}
