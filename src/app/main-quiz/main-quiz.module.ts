import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainQuizComponent } from './main-quiz.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainQuizComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MainQuizComponent }]),
    FormsModule,
  ]
})
export class MainQuizModule {}