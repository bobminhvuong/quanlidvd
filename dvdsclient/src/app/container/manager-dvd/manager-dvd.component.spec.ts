import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDVDComponent } from './manager-dvd.component';

describe('ManagerDVDComponent', () => {
  let component: ManagerDVDComponent;
  let fixture: ComponentFixture<ManagerDVDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDVDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDVDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
