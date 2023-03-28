import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {
  constructor(private router: Router) { }

  toResult(): void {
    this.router.navigateByUrl("/results");
  }
}
