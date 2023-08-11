import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaFabricanteComponent } from './marca-fabricante.component';

describe('MarcaFabricanteComponent', () => {
  let component: MarcaFabricanteComponent;
  let fixture: ComponentFixture<MarcaFabricanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcaFabricanteComponent]
    });
    fixture = TestBed.createComponent(MarcaFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
