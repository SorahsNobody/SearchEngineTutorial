import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  @Input('pName') playerName = ''; //Declares that this component has a variable named pName that can be called in the html with playerName
  ngOnInit(): void {
  }

}
