import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MattersService } from '../matters.service';

@Component({
	selector: 'app-add-matter-page',
	templateUrl: './add-matter-page.component.html',
	styleUrls: ['./add-matter-page.component.scss'],
})
export class AddMatterPageComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private navController: NavController,
		private fb: FormBuilder,
		private matterService: MattersService
	) {
		this.form = this.fb.group({
			matter: '',
			client: '',
		});
	}

	ngOnInit() {}

	cancel() {
		this.navController.back();
	}

	add() {
		if (this.form.valid) {
			this.matterService.addMatter(this.form.value);
		}
	}
}
