import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarColorsComponent } from './eliminar-colors.component';

describe('EliminarColorsComponent', () => {
  let component: EliminarColorsComponent;
  let fixture: ComponentFixture<EliminarColorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarColorsComponent]
    });
    fixture = TestBed.createComponent(EliminarColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
