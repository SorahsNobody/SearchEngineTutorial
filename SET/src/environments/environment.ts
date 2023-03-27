// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

export const AniQues: string[] =[

];

export const AniKeys: string[][] =[
  []
];

export const SupQues: string[] =[

];

export const SupKeys: string[][] =[
  []
];

export const SpoQues: string[] =[

];

export const SpoKeys: string[][]=[
  []
];

export const SciQues: string[] =[ //Science Questions
  'What is the chemical symbol for gold?', //Answer: Au
  'What is the boiling point of water?', //Answer: 212 F or 100 C
  'Why is the Ocean salty?', //Answer: rocks from land
  'What is the best fruit for you or me?', //Answer: Lemons
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
