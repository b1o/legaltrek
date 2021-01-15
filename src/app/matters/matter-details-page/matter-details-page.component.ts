import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BillingsService } from 'src/app/billings/billings.service';
import { MattersService } from '../matters.service';

@Component({
	selector: 'app-matter-details-page',
	templateUrl: './matter-details-page.component.html',
	styleUrls: ['./matter-details-page.component.scss'],
})
export class MatterDetailsPageComponent implements OnInit, OnDestroy {
	public matterId;

	public details: any = {};
	public loadingBillings = false;
	public loadingTasks = false;

	constructor(
		private route: ActivatedRoute,
		private mattersService: MattersService,
		private billingService: BillingsService,
		private router: Router
	) {
		this.route.paramMap.subscribe((params) => {
			this.matterId = params.get('id');
			this.mattersService.getMatterDetails(this.matterId).subscribe(
				(data: any) => {
					this.details = data.matter;
					console.log(data);
					this.loadMatterBillings();
					this.loadMatterTasks();
				},
				(err) => {
					this.router.navigateByUrl('home/matters');
					console.log(err);
				}
			);
		});
	}

	public get expenses() {
		if (this.details && this.details.billings) {
			const expenses = this.details.billings.filter(
				(b) => b.type == 'expense'
			);
			return expenses;
		}
		return [];
	}

	public get tasks() {
		if (this.details && this.details.tasks) {
			return this.details.tasks;
		}
		return [];
	}

	public loadMatterTasks() {
		this.loadingTasks = true;
		const requests = this.tasks.map((t) =>
			this.mattersService.getTaskById(t.task_id)
		);
		forkJoin(requests).subscribe(
			(data) => {
				this.details.tasks = data;
				this.loadingTasks = false;
			},
			(err) => this.router.navigateByUrl('home/matters')
		);
	}

	public loadMatterBillings() {
		this.loadingBillings = true;
		if (!this.details || !this.details.billings.length) {
			this.loadingBillings = false;
			return;
		}
		const requests = this.details.billings.map((b) =>
			this.billingService
				.getBillingById(b.id)
				.pipe(map((res: any) => res.billing))
		);

		forkJoin(requests).subscribe((data) => {
			this.details.billings = data;
			this.loadingBillings = false;
		});
	}

	ngOnInit() {}

	ngOnDestroy() {
		this.mattersService.currentMatter = null;
	}
}
