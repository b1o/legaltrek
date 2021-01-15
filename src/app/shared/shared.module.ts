import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLangInputComponent } from './components/multi-lang-input/multi-lang-input.component';
import { MaterialModule } from '../material/material.module';
import { IonicModule } from '@ionic/angular';
import { BillingComponent } from './components/billing/billing.component';

@NgModule({
	declarations: [MultiLangInputComponent, BillingComponent],
	exports: [MultiLangInputComponent, BillingComponent],
	imports: [CommonModule, MaterialModule, IonicModule],
})
export class SharedModule {}
