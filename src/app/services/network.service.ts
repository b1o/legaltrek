import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { catchError, map } from 'rxjs/operators';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { empty, from, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class NetworkService {
	// private baseUrl = 'https://bg.app.legaltrek.com';
	private baseUrl = '/backend';

	constructor(
		private http: HttpClient,
		private toastController: ToastController
	) {}

	public get<T>(path, params?: { [key: string]: any }) {
		const request = this.http.get(this.makeUrl(path));

		return request.pipe(
			// map(this.parseResponse),
			catchError((err) => this.presentToast(err))
		);
	}

	public post<T>(path, body) {
		const request = this.http.post(this.makeUrl(path), body, {});

		return request.pipe(catchError((err) => this.presentToast(err)));
	}

	private parseResponse(response: HTTPResponse) {
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
		return empty();
	}
}
