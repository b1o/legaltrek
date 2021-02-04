import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CalendarPageComponent }];

@NgModule({
	declarations: [CalendarPageComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		IonicModule,
		MaterialModule,
		SharedModule,
	],
})
export class CalendarModule {}
