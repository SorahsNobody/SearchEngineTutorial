import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { chosenCat } from 'src/environments/environment';

@Component({
  selector: 'app-q-create',
  templateUrl: './q-create.component.html',
  styleUrls: ['./q-create.component.css']
})
export class QCreateComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(chosenCat.key)
  }

}
