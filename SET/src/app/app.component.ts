import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { avatar, player, playerName } from 'src/environments/environment';
import { DbadapterService } from './dbadapter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    lastSelected:String="";
    //For General Page Clicks
    @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent){
      console.log("Clicked!");
      var ele = <HTMLElement>event.target;
      //checking whether to log selection or general click
      if(!ele.classList.contains("search") && window.getSelection()!=null){
        var selected = window.getSelection();
        var selRight = false;
        if(selected!.focusNode!.compareDocumentPosition(<Node>selected!.anchorNode)==4)
          selRight=false;
        else if(selected!.focusNode!.compareDocumentPosition(<Node>selected!.anchorNode)==2)
          selRight=true;
        else if(selected!.focusNode!.compareDocumentPosition(<Node>selected!.anchorNode)==0)
          selRight=selected!.anchorOffset<selected!.focusOffset;

        if(selected!.toString().length>0&&selected!.toString()!=""){
          this.lastSelected=selected!.toString();
          var eData = "{\'selection\':\'"+this.lastSelected+"\' ; \'cursorPosition[X|Y]\':["+event.clientX+"|"+event.clientY+"] ; \'selRight\':"+selRight+"}";
          this.dbManage.postEvent(5, 'selection',eData).subscribe(data=>{
          });
        }
        else{
          //Want to log what element was clicked and where
          var eData = "{\'clicked\':\'"+ele.classList+"\';\'"+ele.nodeName+"\'; \'cursorPosition[X|Y]\':["+event.clientX+"|"+event.clientY+"]}";
          this.dbManage.postEvent(1, 'click', eData).subscribe(data=>{
          });
        }
      }
      //might be redundant, but wanted to add it just in case
      else{
        //Want to log what element was clicked and where
        var eData = "{\'clicked\':\'"+ele.classList+"\';\'"+ele.nodeName+"\'; \'cursorPosition[X|Y]\':["+event.clientX+"|"+event.clientY+"]}";
        this.dbManage.postEvent(1, 'click', eData).subscribe(data=>{
        });
      }
    }

  constructor(private router: Router, private dbManage: DbadapterService) { }
  ngOnInit(): void {
    console.log(sessionStorage.getItem("playerName"));
    if(sessionStorage.getItem("playerName")===null)
      this.router.navigateByUrl("/start");
    else{
      //need to load session storage data then move to main menu
      playerName.key=<string>sessionStorage.getItem("playerName");
      if(sessionStorage.getItem("hat")!==null)
        avatar.hatIndex=Number.parseInt(<string>sessionStorage.getItem("hat"));
      if(sessionStorage.getItem("nose")!==null)
        avatar.noseIndex=Number.parseInt(<string>sessionStorage.getItem("nose"));
      if(sessionStorage.getItem("glasses")!==null)
        avatar.glassesIndex=Number.parseInt(<string>sessionStorage.getItem("glasses"));
      if(sessionStorage.getItem("numQs")!==null)
        player.numberOfQuestions=Number.parseInt(<string>sessionStorage.getItem("numQs"));
      if(sessionStorage.getItem("points")!==null)
        player.totalPoints=Number.parseInt(<string>sessionStorage.getItem("points"));
      if(sessionStorage.getItem("lvl")!==null)
        player.level=Number.parseInt(<string>sessionStorage.getItem("lvl"));
      if(sessionStorage.getItem("exp")!==null)
        player.exp=Number.parseInt(<string>sessionStorage.getItem("exp"));
      this.router.navigateByUrl("/gameMenu");
    }
  }
  title = 'SET';
}
