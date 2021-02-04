import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule } from '@angular/material/core';

const MODULES = [
	MatFormFieldModule,
	MatRippleModule,
	MatDatepickerModule,
	MatIconModule,
	MatListModule,
	MatSelectModule,
	MatDividerModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatExpansionModule,
	MatInputModule,
	MatButtonModule,
	MatCardModule,
];

@NgModule({
	declarations: [],
	exports: [...MODULES],
	imports: [CommonModule, ...MODULES],
})
export class MaterialModule {}
