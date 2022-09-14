import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, } from '@angular/forms';

import { TechnoAddComponent } from './techno-add.component';

describe('TechnoAddComponent', () => {
  let component: TechnoAddComponent;
  let fixture: ComponentFixture<TechnoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnoAddComponent ],
      imports: [ HttpClientTestingModule, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
