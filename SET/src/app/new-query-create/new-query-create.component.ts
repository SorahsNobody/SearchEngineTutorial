import { Component, OnInit } from '@angular/core';
import { avatar, environment } from 'src/environments/environment';
import { SearchResultsService } from '../search-results.service';
import { score } from 'src/environments/environment';
import { stopWords } from 'src/assets/stop-words';

@Component({
  selector: 'app-new-query-create',
  templateUrl: './new-query-create.component.html',
  styleUrls: ['./new-query-create.component.css']
})
export class NewQueryCreateComponent implements OnInit {

  constructor(private srs: SearchResultsService) { }
  image: any = avatar.key;

  ngOnInit(): void {
    score.key+=500;
  }

  submit(){
    var inputQuery = (<HTMLInputElement>document.getElementById('input')).value;
    //----------------------Stop Words------------------------------------------------------
    var spaceSplit = inputQuery.split(' ');
    console.log('Checking for Stopwords: ' + spaceSplit)
    spaceSplit.forEach((word)=>{
      //IF the user query contains stopwords
      if(stopWords.includes(word.toLowerCase())){
        //THEN subtract 10 points per stopword used and mark that stopwords have been used
        score.key-=10;
        if(!score.stopWords)
          score.stopWords=true;
      }
    });
    //---------------------Misspellings-----------------------------------------------------
    this.getSplchk(inputQuery).then((data)=>{
      data.forEach((e)=>{
        var jiq = this.srs.fixPHPResponse(e.toString());
        //IF there are errors found in the user query
        if(jiq.errors.length >0){
          console.log('error found');
          //THEN subtract 10 points per misspelled word and mark that there are misspelled words
          score.key-=(jiq.errors.length*10);
          score.misspellings=true;
        }
        else
          console.log('no errors found');
        console.log('Score: '+score.key);
      });
    });
  }

  async getSplchk(word:string){
    return await this.srs.getSpellSuggestionSentence(word);
  }
}
