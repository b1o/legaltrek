import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillingsService } from 'src/app/billings/billings.service';

@Component({
	selector: 'app-expenses',
	templateUrl: './expenses.component.html',
	styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
	public loading = false;

	@Input() expenses = [];

	constructor(private billings: BillingsService) {}

	ngOnInit() {
		if (this.expenses.length) {
			this.loading = true;
			const requests = this.expenses.map((b) =>
				this.billings
					.getBillingById(b.id)
					.pipe(map((res: any) => res.result.billing))
			);

			forkJoin(requests).subscribe((data) => {
				this.expenses = data;
				console.log(data);
				this.loading = false;
			});
		}
	}
}
