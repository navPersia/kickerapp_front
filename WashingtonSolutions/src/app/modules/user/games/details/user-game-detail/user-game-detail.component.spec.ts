import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameDetailComponent } from './user-game-detail.component';

describe('UserGameDetailComponent', () => {
  let component: UserGameDetailComponent;
  let fixture: ComponentFixture<UserGameDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGameDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
