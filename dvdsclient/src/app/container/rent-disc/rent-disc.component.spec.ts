import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDiscComponent } from './rent-disc.component';

describe('RentDiscComponent', () => {
  let component: RentDiscComponent;
  let fixture: ComponentFixture<RentDiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentDiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentDiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
