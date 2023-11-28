// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SearchResult } from "src/models/search-result.model";

export const environment = {
  production: false,
  difficulty: 0,
  showHints: true,
  spellCheck: true,
  expansions: true
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
  key: -1
};

export const score = {
  key: 0,
  stopWords: false,
  misspellings: false
};

export const player = {
  name: playerName.key,
  exp: 0,
  level: 1,
  numberOfQuestions: 0,
  numDone:0,
  totalPoints:0
}

export const avatar = {
  key: "/assets/customize/avatar-x-x-x-.png"
};

export const unlocks = {
  key: " "
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
  'What animals hold each others hands?' //otters
];

export const AniKeys: string[][] =[
  ['backward', 'move', 'fly', 'animal', 'wings', 'mammal'],
  ['birds', 'eat', 'pink', 'feathers', 'why', 'that', 'is', 'what', 'do', 'have', 'with'],
  ['animal', 'longest', 'lifespan', 'can', 'mammal', 'with', 'eat', 'organism', 'creature', 'thing'],
  ['noise', 'animal', 'makes', 'most', 'land', 'mammal', 'loud', 'that', 'is', ],
  ['animals', 'hands', 'stay', 'together', 'mammals', 'latch', 'keep', 'hold']
];

export const SupAnswers: string[][] = [
  ['green'],
  ['vibranium'],
  ['peter', 'parker'],
  ['charles xavier', 'professor x'],
  ['lasso', 'lasso of truth']
];

export const SupQues: string[] =[//Superhero Questions
  "What color is Hulk when he is angry?",
  "What is Captain America's shield made of?",
  "What is spiderman's real name?",
  "Who is the leader of X-Men?",
  "What is Wonder Woman's weapon called?"
];

export const SupKeys: string[][] =[
  ['superhero', 'trees', 'color', 'angry', 'comic book', 'scientist', 'marvel', 'Hulk', 'not happy'],
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
  ['rocks', 'runoff', 'mineral'],
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
  ['science', 'guy', 'rules', 'experiment', 'moon', 'cold', 'who', 'shark', 'float', 'is'],
  ['planets', 'earth','solar','is','how','pluto','many','there','duck','water','sun','rocks']
];

export const HisQues: string[] = [ //History Questions
  'Who was the first president of the United States?',
  'Who invented the telephone?',
  'Who wrote the Harry Potter books?',
  'What is the largest continent in the world?',
  'Who was the first person to walk on the moon?',
  'Who was the first Emperor of Rome?'
];

export const HisKeys: string[][] = [
  ['America', 'president', 'is','first', 'old','United States', 'US', 'leader', 'who', 'Britain','UK','colonies','wooden','teeth','for','where','why'],
  ['invention','telephone','is','where','what','phone','mobile','power','line','harry','person','who','careful','hear','invented'],
  ['Harry','who','is','where','what','you\'re','a','wizard','potter','Voldemort','name','author','magic','red','herring','written by'],
  ['who','is','where','small','what','largest','globe','area','place','moon','earth','big','biggest','the','continent','ocean'],
  ['walk','who','where','why','is','phone','history','rocks','first','name','the','man','woman','person','walked','on','space','moon'],
  ['king','is','who','where','why','is','red','herring','all','roads','lead','to','Rome','leader','the','first','walked','was']
];

export const HisAnswers: string[][] = [
  ['george washington','washington'],
  ['alexander graham bell','graham bell'],
  ['j.k. rowling','rowling'],
  ['asia'],
  ['neil armstrong','armstrong'],
  ['augustus ceaser','augustus']
];

export const MusQues: string[] = [
  'Who is the \'King of Pop\'?',
  'What is the name of the group that sang \'Baby Shark\'?',
  'What is the name of the instrument that has black and white keys?',
  'Who is the leader of the popular band BTS?',
  'What is the biggest music award ceremony that happens every year?',
  'What is the name of the popular band that is made up of animated characters?'
];

export const MusKeys: string[][] = [
  ['King','the','where','of','music','singer','name','popular','pop','artist','what','is','who','the','Shrek'],
  ['band','that','where','music','singer','name','song','baby','shark','who','what','is','the','group','artist','wrote','performed'],
  ['music','name','instrument','sounds','keys','black','and','white','horizontal','board','strings','what','the','is','Shrek'],
  ['girl','BTS','boy','artist','lead','the','who','leader','red','rap','Korean','popular','is','Shrek','Zorro','Romeo'],
  ['biggest','music','King','instrument','sounds','the','red','leader','biggs','wedge','event','annual','every year','name', 'biggest','ceremony'],
  ['name','music','pop','keys','the','who','where','band','animated','of','characters','animals','made','red','up','is','baby','shark','of']
];

export const MusAnswers: string[][]=[
  ['michael jackson','jackson'],
  ['pinkfong'],
  ['piano','keyboard'],
  ['RM','Rap Monster','Namjoon','Kin Nam-joon'],
  ['Grammys','grammy','The Grammy Awards'],
  ['Gorillaz']
];

export const Hints: string[] = [
  'Sometimes using words that are similar to the subject you\'re looking for can help.',
  'Try to spell as best as you can! Watch for any sign that a word you\'re using is misspelled before submitting.',
  'Your search query should be as short as possible without losing the search meaning!',
  'A search engine is not a person, so talking to it like a person isn\'t always the best approach.',
  'Try not to copy the question word-for-word. Try to make it a better query instead!'
];

export const MusQA = {
  key: [0,0,0,0,0,0]
}
export const HisQA = {
  key: [0,0,0,0,0,0]
}
export const SpoQA = {
  key: [0,0,0,0,0]
}
export const SciQA = {
  key: [0,0,0,0,0]
}
export const SupQA = {
  key: [0,0,0,0,0]
}
export const AniQA = {
  key: [0,0,0,0,0]
}

export const DONE = {
  key: [0,0,0,0,0,0]
}

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

export const AcceptableSWs = {
  key: ["who","what","where","when","why","how"]
}
var mW: Array<string>=[];
export var misspelledWords = {
  content: mW
}
var sW: Array<string>=[];
export var stopWordsUsed = {
  content:sW
}

export const phrases = {
  content: ["Did you mean one of these?", "How about these?",
  "Maybe one of these?", "Do one of these sound right?",
  "Is this what you meant?","Try one of these"],
  cue: ["okay", "oh!", "um", "hmm", "hmm?"]
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
