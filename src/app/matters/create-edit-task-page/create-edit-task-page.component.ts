import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { format, parse } from 'date-fns';
import { AuthService } from 'src/app/auth/auth.service';
import { LayoutService } from 'src/app/home/layout.service';
import { MattersService } from '../matters.service';

@Component({
	selector: 'app-create-edit-task-page',
	templateUrl: './create-edit-task-page.component.html',
	styleUrls: ['./create-edit-task-page.component.scss'],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
	],
})
export class CreateEditTaskPageComponent implements OnInit, OnDestroy {
	public taskForm: FormGroup;
	public clients = [];
	public allMatters = [];

	constructor(
		private mattersService: MattersService,
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private layoutService: LayoutService,
		private router: Router,
		public navController: NavController,
		private auth: AuthService
	) {
		console.log('edit   task');
		this.layoutService.hideFabButton();
		this.taskForm = this.fb.group({
			matter_id: '',
			name: '',
			id: '',
			description: '',
			level: '',
			priority: '',
			start_date: '',
			end_date: '',
			delivery_date: '',
			client_type: '',
			client: '',
			color: '',
			assigned_to: '',
		});
		if (!this.mattersService.currentMatter) {
			this.router.navigateByUrl('/home/matters');
			return;
		}
		this.taskForm.patchValue({ assigned_to: this.auth.user.user_id });

		this.setMatter();
		this.setClient();

		if (this.task) {
			console.log('task', this.task);
			this.parseDates(this.task);
			this.taskForm.patchValue(this.task);
		} else {
			this.activatedRoute.paramMap.subscribe((params) => {
				this.mattersService
					.getTaskById(+params.get('taskId'))
					.subscribe((data) => {
						this.task = data;
						console.log(this.task);

						this.parseDates(this.task);
						this.taskForm.patchValue(this.task);
					});
			});
		}
	}

	private setClient() {
		this.mattersService.getClients().subscribe((data) => {
			this.clients = Object.keys(data.clients).map((id) => ({
				id,
				...data.clients[id],
			}));
			const currentClient = this.clients.find(
				(c) => c.client_name == this.mattersService.currentMatter.client
			);
			console.log('currentCLient', currentClient);
			this.taskForm.patchValue({ client: currentClient.id });
		});
	}

	private setMatter() {
		if (this.mattersService.matters.length) {
			this.allMatters = this.mattersService.matters;
			console.log('all matters', this.allMatters);
		} else {
			this.mattersService.getMatters().subscribe((data) => {
				this.allMatters = Object.keys(data.matters).map((id) => ({
					id,
					...data.matters[id],
				}));
				this.mattersService.matters = this.allMatters;
			});
		}
		if (this.mattersService.currentMatter) {
			this.taskForm.patchValue({
				matter_id: this.mattersService.currentMatter.id,
			});
		}
	}

	private parseDates(data) {
		data.end_date = parse(data.end_date, 'dd.MM.yyyy', new Date());
		data.delivery_date = parse(
			data.delivery_date,
			'dd.MM.yyyy',
			new Date()
		);
		data.start_date = parse(data.start_date, 'dd.MM.yyyy', new Date());
	}

	public get task() {
		return this.mattersService.currentTask;
	}

	public set task(value) {
		this.mattersService.currentTask = value;
	}

	private formatDates(data) {
		data.end_date = format(new Date(data.end_date), 'dd.MM.yyyy');
		data.start_date = format(new Date(data.start_date), 'dd.MM.yyyy');
		data.delivery_date = format(new Date(data.delivery_date), 'dd.MM.yyyy');
	}

	public save() {
		const data = { ...this.taskForm.value };
		this.formatDates(data);
		this.mattersService
			.editTask(data)
			.subscribe((data) => console.log(data));
	}

	ngOnInit() {}

	ngOnDestroy() {
		this.layoutService.showFabButton();
	}
}
