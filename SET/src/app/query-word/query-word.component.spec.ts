import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryWordComponent } from './query-word.component';

describe('QueryWordComponent', () => {
  let component: QueryWordComponent;
  let fixture: ComponentFixture<QueryWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
