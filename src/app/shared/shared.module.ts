import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLangInputComponent } from './components/multi-lang-input/multi-lang-input.component';
import { MaterialModule } from '../material/material.module';
import { IonicModule } from '@ionic/angular';
import { BillingComponent } from './components/billing/billing.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
	declarations: [
		MultiLangInputComponent,
		BillingComponent,
		PageHeaderComponent,
	],
	exports: [MultiLangInputComponent, BillingComponent, PageHeaderComponent],
	imports: [CommonModule, MaterialModule, IonicModule],
})
export class SharedModule {}
