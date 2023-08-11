import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainQuizComponent } from './main-quiz.component';

describe('MainQuizComponent', () => {
  let component: MainQuizComponent;
  let fixture: ComponentFixture<MainQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainQuizComponent]
    });
    fixture = TestBed.createComponent(MainQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
