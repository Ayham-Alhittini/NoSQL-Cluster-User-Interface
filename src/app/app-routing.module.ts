import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ServerErrorComponent } from './components/error/server-error/server-error.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { IsGuestGuard } from './guards/is-guest.guard';
import { ManagementComponent } from './components/management/management.component';

const routes: Routes = [
  {path : '', component : HomeComponent, canActivate: [AuthGuard]},
  {path : 'database/:name', component : HomeComponent, canActivate: [AuthGuard]},



  {path : 'auth', 
    runGuardsAndResolvers : 'always',
    canActivate : [IsGuestGuard],
    children : [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },

  {path: 'management',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path:'nodes', component: ManagementComponent}
    ]
  },

  {path: 'server-error', component: ServerErrorComponent},
  {path : '**', component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
