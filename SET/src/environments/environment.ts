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

export const SciQues: string[] = [ //Science Questions
  'What is the chemical symbol for gold?',
  'Q2',
  'Q3',
  'Q4',
  'Q5'];
export const SciKeys: string[][] = [ //Science Keywords
  ['chemical','chemistry','gold','element', 'what','who','where','is','symbol','metal','gas','liquid'],
  ['t1'],
  ['t2'],
  ['t3'],
  ['t4']];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
