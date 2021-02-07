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
	public clients = [];

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

	ngOnInit() {
		this.matterService.getClients().subscribe((data) => {
			this.clients = Object.keys(data.clients).map(
				(id) => data.clients[id]
			);
			console.log(this.clients);
		});
	}

	cancel() {
		this.navController.back();
	}

	add() {
		if (this.form.valid) {
			this.matterService.addMatter(this.form.value);
		}
	}
}
