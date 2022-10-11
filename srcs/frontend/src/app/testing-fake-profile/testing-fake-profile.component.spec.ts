import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingFakeProfileComponent } from './testing-fake-profile.component';

describe('TestingFakeProfileComponent', () => {
  let component: TestingFakeProfileComponent;
  let fixture: ComponentFixture<TestingFakeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingFakeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingFakeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
