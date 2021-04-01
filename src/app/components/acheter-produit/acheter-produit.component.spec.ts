import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheterProduitComponent } from './acheter-produit.component';

describe('AcheterProduitComponent', () => {
  let component: AcheterProduitComponent;
  let fixture: ComponentFixture<AcheterProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcheterProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheterProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
