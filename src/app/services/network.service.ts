import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { catchError, map, switchMap } from 'rxjs/operators';
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

	public get(path, params?: { [key: string]: any }) {
		const request = this.http.get(this.makeUrl(path));

		return request.pipe(
			catchError((err) => this.onError(err)),
			switchMap((res) => this.parseResponse(res))
		);
	}

	public post(path, body) {
		const request = this.http.post(this.makeUrl(path), body, {});

		return request.pipe(
			catchError((err) => this.onError(err)),
			switchMap((res) => this.parseResponse(res))
		);
	}

	private parseResponse(response) {
		if (!response.success) {
			this.presentToast(`Server error: ${response.result.message}`);
			return throwError(response.result);
		}
		return of(response.result);
	}

	private makeUrl(path) {
		return this.baseUrl + path;
	}

	private async onError(err) {
		const toast = await this.toastController.create({
			message: err.message,
			buttons: ['OK'],
		});
		toast.present();
	}

	private async presentToast(message) {
		const toast = await this.toastController.create({
			message,
			buttons: ['OK'],
		});
		toast.present();
	}
}
