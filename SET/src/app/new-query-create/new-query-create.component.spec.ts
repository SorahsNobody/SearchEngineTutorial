import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQueryCreateComponent } from './new-query-create.component';

describe('NewQueryCreateComponent', () => {
  let component: NewQueryCreateComponent;
  let fixture: ComponentFixture<NewQueryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQueryCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQueryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
