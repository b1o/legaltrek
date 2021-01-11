import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

const MODULES = [
	MatFormFieldModule,
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
