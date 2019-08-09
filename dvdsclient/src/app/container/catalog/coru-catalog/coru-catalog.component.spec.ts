import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoruCatalogComponent } from './coru-catalog.component';

describe('CoruCatalogComponent', () => {
  let component: CoruCatalogComponent;
  let fixture: ComponentFixture<CoruCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoruCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoruCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
