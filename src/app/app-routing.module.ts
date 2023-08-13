import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main-quiz/main-quiz.module').then(m => m.MainQuizModule) },
  { path: 'results', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}