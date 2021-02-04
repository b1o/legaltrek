import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SignedInGuard } from './signed-in.guard';

@NgModule({
	declarations: [LoginComponent, ResetPasswordComponent],
	providers: [AuthGuard, SignedInGuard],
	imports: [
		IonicModule,
		CommonModule,
		AuthRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		RouterModule,
	],
})
export class AuthModule {}
