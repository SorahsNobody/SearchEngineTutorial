import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderChangeService {

  constructor() { }

  private changeSource = new BehaviorSubject(false);
  change = this.changeSource.asObservable();

  signalChange(ch: boolean){
    this.changeSource.next(ch);
  }
}
