import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewMomentComponent } from './pages/new-moment/new-moment.component';
import { MomentComponent } from './pages/moment/moment/moment.component';
import { EditMomentComponent } from './pages/moment/edit-moment/edit-moment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'moment/new', component: NewMomentComponent},
  {path: 'moments/:id', component: MomentComponent},
  {path: 'moments/edit/:id', component: EditMomentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
