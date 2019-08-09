import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { COrUClientComponent } from './cor-uclient.component';

describe('COrUClientComponent', () => {
  let component: COrUClientComponent;
  let fixture: ComponentFixture<COrUClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ COrUClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(COrUClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
