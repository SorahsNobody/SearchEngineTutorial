import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuerySuggestionComponent } from './search-query-suggestion.component';

describe('SearchQuerySuggestionComponent', () => {
  let component: SearchQuerySuggestionComponent;
  let fixture: ComponentFixture<SearchQuerySuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchQuerySuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQuerySuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
