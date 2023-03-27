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
