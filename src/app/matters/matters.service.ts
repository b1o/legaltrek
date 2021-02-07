import { Injectable } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TaskDTO } from './models/taskDto';

@Injectable({
	providedIn: 'root',
})
export class MattersService {
	public currentMatter = null;
	public currentTask = null;
	public matters = [];

	constructor(private network: NetworkService) {}

	public getMatters() {
		return this.network.get('/api/get/matters');
	}

	createTask(data: TaskDTO) {
		return this.network.post('/api/tasks/save', data);
	}

	editTask(data: TaskDTO) {
		console.log(data)
		return this.network.post('/api/tasks/save', data);
	}

	getTaskById(id) {
		const url = `/api/tasks/${id}`;
		return this.network.get(url);
	}

	getClients() {
		return this.network.get('/api/get/clients');
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
