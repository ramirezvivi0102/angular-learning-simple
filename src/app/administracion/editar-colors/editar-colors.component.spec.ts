import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarColorsComponent } from './editar-colors.component';

describe('EditarColorsComponent', () => {
  let component: EditarColorsComponent;
  let fixture: ComponentFixture<EditarColorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarColorsComponent]
    });
    fixture = TestBed.createComponent(EditarColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
