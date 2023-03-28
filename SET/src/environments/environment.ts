// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SearchResult } from "src/models/search-result.model";

export const environment = {
  production: false
};

export const chosenCat = {
  key: 'default'
};

export const playerName = {
  key: 'No Name'
};

export const searchQuery = {
  key: 'default'
};

export const currQuestion = {
  key: 'default'
};

export const questionNumber = {
  key: 10
};

export const score = {
  key: 0
};

export const AniAnswers: string [][] = [
  ['hummingbird'],
  ['shrimp', 'algea'],
  ['imortal jellyfish'],
  ['howler monkey'],
  ['otters']
];

export const AniQues: string[] =[
  'What bird can fly backwards?', //Hummingbird
  'Why are flamingos pink?', //shrimp, and algea they eat
  'What is the longest living animal?', //imortal jellyfish
  'What is the loudest land animal?', //howler monkey
  'What animals are know to hold hands?' //otters
];

export const AniKeys: string[][] =[
  ['backward', 'move', 'fly', 'animal', 'wings', 'mammal'],
  ['bird', 'eat', 'pink', 'feathers', 'why'],
  ['animal', 'longest', 'lifespan', 'can', 'mammal', 'with', 'eat'],
  ['noise', 'animal', 'make', 'most', 'land', 'mammal', 'loud'],
  ['animal', 'hands', 'stay', 'together', 'mammal', 'latch', 'keep']
];

export const SupAnswers: string[][] = [
  ['green'],
  ['vibranium'],
  ['peter', 'parker'],
  ['charles xavier', 'professor x'],
  ['lasso', '']
];

export const SupQues: string[] =[//Superhero Questions
  "What color is Hulk when he is angry?",
  "What is Captain America's shield made of?",
  "What is spiderman's real name?",
  "Who is the leader of X-Men?",
  "What is Wonder Woman's weapon called?"
];

export const SupKeys: string[][] =[
  ['superhero', 'green', 'trees', 'color', 'not angry', 'comic book', 'scientist', 'marvel', 'Hulk', 'happy'],
  ['strong','shield','metal','substance','blue','Captain America','Avenger','made of','name','material','make'],
  ['name', 'spider', 'own', 'real', 'spiderman', 'DC', 'Tony', 'Marvel'],
  ['leader', 'team', 'character', 'boss', 'X-Men', 'in charge','Ironman', 'Professor'],
  ['Truth', 'Wonder Woman', 'Marvel','DC comics', 'Paradise', 'weapon', 'name', 'called']
];

export const SpoAnswers: string[][] =[
  ['26.2', '26 mi'],
  ['5','6','five','six'],
  ['9','nine'],
  ['golf'],
  ['women\'s gymnastics', 'gymnastics']
];

export const SpoQues: string[] =[ // Sports Questions
'How long is a marathon?', // A: 26.2 miles
'How many colors make up the Olympic rings?', // A: five
'How many players are on a baseball team?', // A: 9
'What is the only sport to be played on the moon?', // A: Golf
'What sport is Bela Karolyi known for coaching?', // A: Women’s gymnastics
];

export const SpoKeys: string[][]=[
  ['Run', 'race', 'go', 'what', 'marathon', 'ring', 'fast', 'including', 'is', 'many', 'for',  'miles', '1000'],
  ['Olympic', 'Japan',  'find', 'binary', 'twenty', 'source', 'how', 'match', 'colors', 'program', 'in', 'different', 'ring'],
  ['Paint', 'play', 'what', 'playing', 'number', 'that', 'count', 'baseball', 'quick', 'friends', 'team', 'system', 'in'],
  ['plenty', 'sports', 'for', 'can', 'on', 'played', 'report', 'many', 'kind', 'single', 'moon', 'gravitation'],
  ['name', 'in', 'game', 'how', 'gym',  'which', 'Bela', 'going', 'coach', 'woman', 'into',  'Bela Karolyi', 'famous', 'know']
];

export const SciAnswers: string[][] = [
  ['au'],
  ['212', '100' , 'two-hundred and twelve', 'one-hundred'],
  ['rocks', 'runoff'],
  ['bill nye', 'bill'],
  ['8', 'eight', '9', 'nine']
];

export const SciQues: string[] =[ //Science Questions
  'What is the chemical symbol for gold?', //Answer: Au
  'What is the boiling point of water?', //Answer: 212 F or 100 C
  'Why is the Ocean salty?', //Answer: rocks from land
  'Who is the Science Guy?', //Answer: Bill Nye
  'How many planets are there in our solar system?' //Answer: Eight
];
export const SciKeys: string[][] = [ //Science Keywords
  ['chemical','chemistry','gold','element', 'what','who','where','is','symbol','metal','gas','liquid','for'],
  ['water', 'boiling', 'liquid', 'hot', 'cold', 'when', 'where', 'what', 'is', 'gas', 'duck', 'float'],
  ['taste','who', 'salt','salty','when','water','is','ocean','beach', 'why','shark','moon'],
  ['fruit','healthy','healthiest','what','eat','is','the','apples','oranges','potatoes'],
  ['planets', 'earth','solar','is','how','pluto','many','there','duck','water','sun','rocks']
];

export class SearchClass {
  //this is the url for the cast search
  static readonly searchSelection: SearchClass[] =[
      new SearchClass('google_legacy', 'https://cast.boisestate.edu/googleAPI/googleSearch.php')
  ]

  private constructor(private readonly name: string, public readonly url: string) {}
};

var rA: Array<SearchResult> = [];
export const resultArray = {
  key: rA
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
