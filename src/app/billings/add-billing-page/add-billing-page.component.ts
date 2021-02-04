import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LayoutService } from 'src/app/home/layout.service';
import { MattersService } from 'src/app/matters/matters.service';
import { BillingsService } from '../billings.service';

@Component({
	selector: 'app-add-billing-page',
	templateUrl: './add-billing-page.component.html',
	styleUrls: ['./add-billing-page.component.scss'],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
	],
})
export class AddBillingPageComponent implements OnInit, OnDestroy {
	public allMatters = [];
	public allClients = [];
	public tasks = [];

	public billingForm: FormGroup;

	constructor(
		private matterService: MattersService,
		private billings: BillingsService,
		private fb: FormBuilder,
		private layoutService: LayoutService
	) {
		this.billingForm = this.fb.group({
			matter: '',
			client: '',
			task: [{ value: '', disabled: true }],
			worked_on: '',
		});

		this.getMatters();
		this.getClients();

		//TODO: clean sub
		this.billingForm.get('matter').valueChanges.subscribe((value) => {
			if (value) {
				this.onMatterChange(value);
				this.taskControl.enable();
			} else {
				this.taskControl.disable();
			}
		});
	}

	ngOnInit() {}

	public get taskControl() {
		return this.billingForm.get('task');
	}

	public get currentMatter() {
		return this.billingForm.get('matter');
	}

	public onMatterChange(matter) {
		console.log(matter);
		this.tasks = matter.tasks;
	}

	private getClients() {
		this.matterService.getClients().subscribe((response) => {
			this.allClients = Object.keys(response.clients).map((clientId) => ({
				id: clientId,
				...response.clients[clientId],
			}));

			console.log(this.allClients);
		});
	}

	private getMatters() {
		this.matterService.getMatters().subscribe((response) => {
			this.allMatters = Object.keys(response.matters).map((matterId) => ({
				id: matterId,
				...response.matters[matterId],
			}));
		});
	}

	ionViewDidEnter() {
		this.layoutService.hideFabButton();
	}

	ionViewDidLeave() {
		this.layoutService.showFabButton();
	}
	ngOnDestroy() {}
}
