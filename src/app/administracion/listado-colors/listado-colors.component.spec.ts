import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoColorsComponent } from './listado-colors.component';

describe('ListadoColorsComponent', () => {
  let component: ListadoColorsComponent;
  let fixture: ComponentFixture<ListadoColorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoColorsComponent]
    });
    fixture = TestBed.createComponent(ListadoColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
