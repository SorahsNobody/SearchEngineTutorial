import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  constructor(private router: Router) { }

  toCustom(): void {
    this.router.navigateByUrl("/customize");
  }

  toCatSelect(): void {
    this.router.navigateByUrl("/categories");
  }

}
