import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { ListComponent } from './list/list.component';
import { BaseHeroesComponent } from './base-heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Base herores",
      urls: [{ title: "Base heroes", url: "/base-heroes" }, { title: "Heroes" }],
    },
    component: BaseHeroesComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    BaseHeroesComponent,
    HeroComponent,
    ListComponent
  ],
})
export class BaseHeroesModule { }
