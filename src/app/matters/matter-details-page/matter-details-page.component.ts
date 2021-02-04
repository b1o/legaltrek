import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class MatterDetailsPageComponent
	implements OnInit, OnDestroy, AfterViewInit {
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
		
	}

	public get timeEntries() {
		if (this.details && this.details.billings) {
			const timeEntires = this.details.billings.filter(
				(b) => b.type != 'expense'
			);
			return timeEntires;
		}
		return [];
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

	ngOnInit() {
		if (this.mattersService.currentMatter) {
			this.details = this.mattersService.currentMatter;
			console.log('showing', this.details)
			this.matterId = this.details.id;
			return;
		}

		this.route.paramMap.subscribe((params) => {
			if (this.details.hasOwnProperty('id')) return;
			this.matterId = params.get('id');
			this.mattersService.getMatterDetails(this.matterId).subscribe(
				(data: any) => {
					this.details = data.matter;
					console.log(data);
					this.mattersService.currentMatter = this.details;
				},
				(err) => {
					this.router.navigateByUrl('home/matters');
					console.log(err);
				}
			);
		});
	}

	ngAfterViewInit() {}

	goBack() {
		this.router.navigateByUrl('/home/matters');
	}

	ngOnDestroy() {
	}
}
