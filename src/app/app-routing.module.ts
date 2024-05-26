import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompoundsComponent } from './compounds/compounds.component';
import { CompoundDetailsComponent } from './compound-details/compound-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './noauth.guard';
import { adminGuard } from './admin.guard';
import { CreateCompoundComponent } from './create-compound/create-compound.component';

const routes: Routes = [
  { path: '', redirectTo: '/compounds', pathMatch: 'full' },
  {
    path: 'compounds',
    component: CompoundsComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'compounds/add',
    component: CreateCompoundComponent,
    canActivate: [adminGuard()],
  },
  {
    path: 'compounds/:id',
    component: CompoundDetailsComponent,
    canActivate: [authGuard()],
  },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard()] },
  { path: 'signup', component: SignupComponent, canActivate: [noAuthGuard()] },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [adminGuard()],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
