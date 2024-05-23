import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { playerName, avatar, AniQA, SpoQA, SciQA, SupQA, HisQA, MusQA, player, environment} from 'src/environments/environment';
import { DbadapterService } from '../dbadapter.service';
import { NltkServiceService } from '../nltk-service.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  constructor(private router: Router, private dbmanage: DbadapterService) { }

  image: any = avatar.key;

  ngOnInit(): void {
    //this.dbmanage.getSessions().subscribe(data =>{
    //  console.log(data);
    //});
    AniQA.key = [0,0,0,0,0];
    SpoQA.key = [0,0,0,0,0];
    SciQA.key = [0,0,0,0,0];
    SupQA.key = [0,0,0,0,0];
    MusQA.key = [0,0,0,0,0,0];
    HisQA.key = [0,0,0,0,0,0];
  }
  toCatSelect(): void {
    var pName = (<HTMLInputElement>document.getElementById('name')).value
    console.log(pName);
    //IF the player has given some kind of name
    if(pName){
      sessionStorage.setItem("playerName", pName);
      playerName.key = pName;
      if(environment.dbAccess){
        this.dbmanage.postPlayer().subscribe((data)=>{
          console.log(data);
          //Might need to update the player name depending on if there are multiple entries in the database with the same name
          player.name=data['name']
          this.router.navigateByUrl("/queryCraft");
        });
      }
      else
        this.router.navigateByUrl("/queryCraft");
    }
  }

  // loginClicked(): void {
  //   var pwordInput = <HTMLInputElement>document.getElementById("password");
  //   var pword = pwordInput.value;
  //   var pName = (<HTMLInputElement>document.getElementById('name')).value
  //   var check = false;
  //   var userFound = false;
  //   //IF the user wants to login
  //   if(window.getComputedStyle(pwordInput).visibility==="hidden")
  //     //THEN display the password field
  //     document.getElementById("password")!.style.visibility="visible";
  //   //ELSE the password field is already shown
  //   else if(pName && window.getComputedStyle(pwordInput).visibility==="visible"){
  //     //Retrieve user profile from name and check passwords against each other
  //     this.dbmanage.getUserFromName(pName).subscribe(data =>{
  //       //console.log(data);
  //       for(let i =0; i<data.length; i++){
  //         //console.log(data[i]);
  //         if(data[i].name==pName){
  //           userFound=true;
  //           check = bcrypt.compareSync(data[i].pas, bcrypt.hashSync(pword));
  //         }
  //       }
  //       //IF given password matches what's in the database
  //       if(check){
  //         //THEN load the user's data and continue to main menu
  //       }
  //       //IF the given user was not found in the database
  //       if(!userFound){
  //         //THEN alert the current user that we couldn't find the given profile
  //         alert("Couldn't find user: " + pName);
  //       }
  //     })
  //   }
  // }
}
