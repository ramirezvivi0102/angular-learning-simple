import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseHeroesComponent } from './base-heroes.component';

describe('BaseHeroesComponent', () => {
  let component: BaseHeroesComponent;
  let fixture: ComponentFixture<BaseHeroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseHeroesComponent]
    });
    fixture = TestBed.createComponent(BaseHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
