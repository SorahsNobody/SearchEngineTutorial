export interface SearchResult {
  cacheId: string;
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  htmlSnippet: string;
  htmlTitle: string;
  kind: string;
  link: string;
  pagemap: any;
  snippet: string;
  title: string;
}

export interface ResultResponse {
  context: any;
  items: Array<SearchResult>;
  queries: any;
  searchInformation: any;
  url: any;
}

export interface SpellSuggestionWord {
  original: string;
  suggestions: Array<string>;
}

export interface SpellSuggestionSentence {
  errors: Array<string>
}

export interface SuggestionReplacer {
  misspelledWord: string;
  position: number;
  suggestedWord: string;
}

/**
* Creates the association between an image url, boolean, and a word from
* the SpellSuggestion interface
*/
export interface SuggestionResourceRelation{
  word: string;
  image: string;
  audioURL: string;
  isSelected: boolean;
}

/**
* Defines the response from the php application: 'googleImages.php'
*/
export interface ImagesResultResponse{
  kind: string;
  url: any;
  queries: any;
  nextPage: any;
  context: any;
  searchInformation: any;
  items: Array<ImageResult>;
}

/**
* Defines the object of a specific item in the items array of ImageResultResponse
*/
export interface ImageResult{
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: string;
  fileFormat: string;
  image: {
      contextLink: string,
      height: number,
      width: number,
      byteSize: number,
      thumbnailLink: string,
      thumbnailHeight: number,
      thumbnailWidth: number
  };
}
