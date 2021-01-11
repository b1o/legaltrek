import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { catchError, map } from 'rxjs/operators';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { from, throwError } from 'rxjs';
@Injectable({
	providedIn: 'root',
})
export class NetworkService {
	private baseUrl = 'https://bg.app.legaltrek.com';

	constructor(private http: HTTP, private toastController: ToastController) {}

	public get<T>(path, params?: { [key: string]: any }) {
		const request = this.http.get(this.makeUrl(path), params, {});

		return from(request).pipe(
			map(this.parseResponse),
			catchError((err) => this.presentToast(err))
		);
	}

	public post<T>(path, body) {
		const request = this.http.post(this.makeUrl(path), body, {});

		return from(request).pipe(
			map(this.parseResponse),
			catchError((err) => this.presentToast(err))
		);
	}

	private parseResponse(response: HTTPResponse) {
		console.log(response.data);
		let result;
		return JSON.parse(response.data);
	}

	private makeUrl(path) {
		return this.baseUrl + path;
	}

	private async presentToast(error) {
		console.log(error);
		const toast = await this.toastController.create({
			message: error.message,
			duration: 2000,
		});
		toast.present();
	}
}
