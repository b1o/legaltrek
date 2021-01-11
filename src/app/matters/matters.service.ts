import { Injectable } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class MattersService {
	public currentMatter = null;

	constructor(private network: NetworkService) {}

	public getMatters() {
		return this.network.get('/api/get/matters');
	}

	getTaskById(id) {
		const url = `/api/tasks/${id}`;
		return this.network.get(url);
	}

	public getMatterDetails(matterId) {
		console.log('getting details for:' + matterId);
		return this.network.get('/api/get/matter/' + matterId);
	}

	public search(term) {
		return this.network.post('/search/quick', { query: term });
	}

	public addMatter(data: { matter: string; client: string }) {
		console.log(data);
	}

	public changeTaskStatus() {
		return of(true).pipe(delay(1000));
	}
}