import { Injectable } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { LoginDto } from './models/loginDto';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user = null;
	public languages = [];

	constructor(private network: NetworkService, private router: Router) {
		Storage.get({ key: 'user' }).then((user) => {
			this.user = JSON.parse(user.value);
			this.languages = Object.keys(this.user.languages);
		});
	}

	public login(loginDto: LoginDto) {
		return this.network.post('/api/login', loginDto).pipe(
			tap((data) => {
				this.user = data;
				this.languages = Object.keys(this.user.languages);
				Storage.set({ key: 'user', value: JSON.stringify(data) });
			})
		);
	}

	public relocate(loginDto: LoginDto) {
		return this.network.post('/api/relocate', loginDto);
	}

	public async logout() {
		this.router.navigateByUrl('/auth/login');
		await Storage.clear();
	}
}
