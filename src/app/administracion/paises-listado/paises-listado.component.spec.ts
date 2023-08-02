import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesListadoComponent } from './paises-listado.component';

describe('PaisesListadoComponent', () => {
  let component: PaisesListadoComponent;
  let fixture: ComponentFixture<PaisesListadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaisesListadoComponent]
    });
    fixture = TestBed.createComponent(PaisesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
