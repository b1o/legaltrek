import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLangInputComponent } from './components/multi-lang-input/multi-lang-input.component';
import { MaterialModule } from '../material/material.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
	declarations: [MultiLangInputComponent],
	exports: [MultiLangInputComponent],
	imports: [CommonModule, MaterialModule, IonicModule],
})
export class SharedModule {}
