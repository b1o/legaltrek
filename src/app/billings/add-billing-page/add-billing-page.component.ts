import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { format, parse } from 'date-fns';
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
	public billingId: number;
	public billingData = null;

	public isEditing = false;

	public customPickerOptions = {
		columns: [
			{
				name: 'hours',
				prefix: 'Hours',
				options: this.getNumber(24),
			},
			{
				name: 'minutes',
				suffix: 'Minutes',
				options: this.getNumber(59),
			},
		],
		buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Ok' }],
	};

	constructor(
		private matterService: MattersService,
		private billings: BillingsService,
		private fb: FormBuilder,
		private layoutService: LayoutService,
		private pickerController: PickerController
	) {
		console.log(this.customPickerOptions);
		this.billingForm = this.fb.group({
			matter: '',
			client: '',
			task: [{ value: '', disabled: true }],
			worked_on: '',
			worked_time: '',
			billable_time: '',
		});

		this.billings.currentBilling$.subscribe((billing) => {
			console.log('current billing', billing);
			if (billing) {
				console.log(billing);
				this.billingId = billing.id;
				this.isEditing = true;
				this.billingData = billing;
				this.billingForm.patchValue(billing);
			}
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

	public async openDatePicker(control) {
		const picker = await this.pickerController.create(
			this.customPickerOptions
		);

		await picker.present();
		const { data, role } = await picker.onDidDismiss();
		console.log(data, role);
		if (role) {
			return;
		}
		const { hours, minutes } = data;
		this.billingForm
			.get(control)
			.patchValue(`${hours.value} hrs ${minutes.value} mins`);
	}

	private getNumber(amount) {
		const mins = [];
		for (let i = 0; i <= amount; i++) {
			if (i <= 9) {
				mins.push({ text: `0${i}`, value: i });
			} else {
				mins.push({ text: i, value: i });
			}
		}
		return mins;
	}

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

			if (this.billingData) {
				const currentClient = this.allClients.find(
					(c) => c.client_name == this.billingData.client_name
				);
				this.billingForm.patchValue({ client: currentClient });
				console.log(currentClient);
			}
		});
	}

	private getMatters() {
		this.matterService.getMatters().subscribe((response) => {
			this.allMatters = Object.keys(response.matters).map((matterId) => ({
				id: matterId,
				...response.matters[matterId],
			}));

			if (this.billingData) {
				const currentMatter = this.allMatters.find(
					(m) => m.matter == this.billingData.matter_name
				);
				this.billingForm.patchValue({ matter: currentMatter });
				console.log(this.allMatters);
			}
		});
	}

	public save() {
		this.billings
			.createBilling(this.billingForm.value)
			.subscribe((data) => console.log(data));
	}

	ionViewDidEnter() {
		this.layoutService.hideFabButton();
		this.getMatters();
		this.getClients();
	}

	ionViewDidLeave() {
		this.layoutService.showFabButton();
		this.billings.currentBilling$.next(null);
	}
	ngOnDestroy() {}
}
