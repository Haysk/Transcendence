import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUnfriendComponent } from './user-unfriend.component';

describe('UserUnfriendComponent', () => {
  let component: UserUnfriendComponent;
  let fixture: ComponentFixture<UserUnfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUnfriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUnfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
