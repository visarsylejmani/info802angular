import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendreProduitComponent } from './vendre-produit.component';

describe('VendreProduitComponent', () => {
  let component: VendreProduitComponent;
  let fixture: ComponentFixture<VendreProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendreProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendreProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
