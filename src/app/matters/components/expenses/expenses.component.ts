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
	@Input() expenses = [];
	@Input() loading = false;

	constructor() {}

	ngOnInit() {
	}
}
