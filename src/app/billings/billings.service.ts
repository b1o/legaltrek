import { Injectable } from '@angular/core';
import { NetworkService } from '../services/network.service';

@Injectable({
	providedIn: 'root',
})
export class BillingsService {
	constructor(private network: NetworkService) {}

	public getBillings() {
		return this.network.get('/api/get/billings');
	}

	public createBilling(data) {
		return this.network.post('/api/billings/save', data);
	}

	public getBillingById(id) {
		return this.network.get(`/api/get/billing/${id}`);
	}
}
