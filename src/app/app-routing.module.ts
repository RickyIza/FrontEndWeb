import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JuegoMainComponent } from './Components/Juego/juego-main/juego-main.component';
import { JuegoCardComponent } from './Components/Juego/juego-main/juego-card/juego-card.component';
import { JuegoFormComponent } from './Components/Juego/juego-main/juego-form/juego-form.component';
import { JuegoEditComponent } from './Components/Juego/juego-main/juego-edit/juego-edit.component';
const routes: Routes = [
  {
   path: '',
   redirectTo: '/home',
   pathMatch: 'full',
  },
  {path: 'juegos', component: JuegoMainComponent},
  {path: 'juegos/:id', component: JuegoCardComponent},
  {path: 'juego/form', component: JuegoFormComponent},
  {path: 'juego/form/:id', component: JuegoFormComponent},
  {path: 'juego/update/:id',component: JuegoEditComponent},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) }, { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
