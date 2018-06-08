import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTodoComponent } from './single-todo.component';

describe('SingleTodoComponent', () => {
  let component: SingleTodoComponent;
  let fixture: ComponentFixture<SingleTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
