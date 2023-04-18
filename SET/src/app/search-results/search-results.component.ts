import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AniAnswers, chosenCat, currQuestion, questionNumber, resultArray, SciAnswers, score, searchQuery, SpoAnswers, SupAnswers } from 'src/environments/environment';
import { SearchResult } from 'src/models/search-result.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    document.getElementById("ReQuestion")!.innerText = currQuestion.key;
    document.getElementById("queryString")!.innerText = 'You searched: ' + searchQuery.key;
    var ansArr: string[] = [];
    switch(chosenCat.key){
      case 'Animal':
      ansArr = AniAnswers[questionNumber.key];
        break;
      case 'Superhero':
        ansArr = SupAnswers[questionNumber.key];
        break;
      case 'Science':
        ansArr = SciAnswers[questionNumber.key];
        break;
      default:
        ansArr = SpoAnswers[questionNumber.key];
        break;
    }
    var correct = 0;
    var ansS: string = 'Answer(s): | ';
    ansArr.forEach(ans =>{
      ansS = ansS + ans + ' | ';
      resultArray.key.forEach(entry => {
        if((entry.snippet.toLowerCase().includes(ans) || entry.title.toLowerCase().includes(ans)) && entry.htmlSnippet !='found'){
          score.key+=100;
          correct+=1;
          entry.htmlSnippet='found';
          return;
        }
      });
    });
    for(let i = 0; i < resultArray.key.length; i++){
      var tag = "r"+i;
      var r1 = document.getElementById(tag);
    //(document.getElementById("r1pic")as HTMLImageElement).src = this.getpic(resultArray.key[0]);
      var head = document.createElement("h2");
      if(resultArray.key[i].htmlSnippet=='found'){
        head.innerText=resultArray.key[i].title;
        head.style.color = 'rgb(3, 181, 66)';
        r1?.appendChild(head);
      }
      else{
        head.innerText=resultArray.key[i].title;
        head.style.color= 'red';
        r1?.appendChild(head);
      }
      var snip = document.createElement("p");
      snip.innerText=resultArray.key[i].snippet;
      r1?.appendChild(snip);
    }
    document.getElementById("answers")!.innerText = ansS;
    document.getElementById("score")!.innerText = "Score: " + score.key.toString();
    document.getElementById("total")!.innerText = "In the results you got "+correct+" correct!";

    // var currentScore = score.key

    // if(currentScore>=500){
    //   custom = true;
    // }
    // else{
    //   custom = false
    // }
  }

  getpic(resultObj: SearchResult): string{
    var imageUrl = resultObj.pagemap?.cse_image?.[0].src || resultObj.pagemap?.metatags?.[0]['og:image'];
    if (!imageUrl) {
      imageUrl = 'assets/img/image-not-found.png';
    } else {
      imageUrl = this.getFormattedImageUrl(imageUrl,resultObj);
    }
    return imageUrl;
  }

getFormattedImageUrl(imgUrl: string, resultObj: SearchResult): string {
  if (imgUrl.startsWith('/')) {
      return 'https://' + resultObj.displayLink + imgUrl;
    }
    return imgUrl;
  }

  goToCustomize(){
    this.route.navigateByUrl('/customize');
  }

  toCatSelect(): void {
    this.route.navigateByUrl("/categories");
  }

  goToqCreate(): void {
    this.route.navigateByUrl("/queryCreate");
  }

  scoreValue = score.key
  show = 5

}
