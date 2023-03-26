import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { chosenCat } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router) {
   }

  @Input('pName') playerName = 'Placeholder'; //Declares that this component has a variable named pName that can be called in the html with playerName
  ngOnInit(): void {
  }

  changeCat(cat: string): void {
    switch(cat){
      case 'Animal':
        chosenCat.key = 'Animal'
        break;
      case 'Superhero':
        chosenCat.key = 'Superhero'
        break;
      case 'Science':
        chosenCat.key = 'Science'
        break;
      default:
        chosenCat.key = 'Sports'
        break;
    }
    this.router.navigateByUrl('/queryCreate')
  }
}
