import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Route[] = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [],
	providers: [],
})
export class AuthRoutingModule {}
