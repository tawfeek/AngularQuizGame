import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  
  {path:"", component: HomeComponent},
  {path:"home", component: HomeComponent},
  {path:"question", component: QuestionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
