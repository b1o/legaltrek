import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingDetailPageComponent } from './billing-detail-page/billing-detail-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Route, RouterModule } from '@angular/router';
import { AddBillingPageComponent } from './add-billing-page/add-billing-page.component';
import { BillingsPageComponent } from './billings-page/billings-page.component';

const routes: Route[] = [
	{ path: '', component: BillingsPageComponent },
	{ path: 'add', component: AddBillingPageComponent },
];

@NgModule({
	declarations: [BillingDetailPageComponent],
	imports: [
		CommonModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		MaterialModule,
	],
})
export class BillingsModule {}
