import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationJouerComponent } from './invitation-jouer.component';

describe('InvitationJouerComponent', () => {
  let component: InvitationJouerComponent;
  let fixture: ComponentFixture<InvitationJouerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationJouerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationJouerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
