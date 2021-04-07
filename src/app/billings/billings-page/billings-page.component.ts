import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { keys } from 'underscore';
import { BillingsService } from '../billings.service';

@Component({
	selector: 'app-billings-page',
	templateUrl: './billings-page.component.html',
	styleUrls: ['./billings-page.component.scss'],
})
export class BillingsPageComponent implements OnInit {
	public billings = [];

	constructor(
		private billingsService: BillingsService,
    private router: Router,
    private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.billingsService.getBillings().subscribe((res: any) => {
			console.log(res);
			this.billings = Object.keys(res.billings).map((key) => ({
				id: key,
				...res.billings[key],
			}));
		});
	}

  billingClick(billing) {
    this.billingsService.currentBilling$.next(billing);
		this.router.navigate([billing.id], {
      state: { data: billing },
      relativeTo: this.route
		});
	}
}
