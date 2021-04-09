import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { catchError, map, switchMap } from 'rxjs/operators';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { empty, from, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Injectable({
	providedIn: 'root',
})
export class NetworkService {
	// private baseUrl = 'https://bg.app.legaltrek.com';
	public baseUrl = environment.backend;

	constructor(
		private http: HttpClient,
		private toastController: ToastController
	) {
		console.log(`sending requests to: ${this.baseUrl}`)
		Storage.get({key: 'location'}).then(
			val => this.baseUrl = val.value
		)
	}

	public get(path, params?: { [key: string]: any }) {
		const request = this.http.get(this.makeUrl(path), {withCredentials:true});

		return request.pipe(
			catchError((err) => this.onError(err)),
			switchMap((res) => this.parseResponse(res))
	);
	}

	public post(path, body) {
		const request = this.http.post(this.makeUrl(path), body, {withCredentials: true});

		return request.pipe(
			catchError((err) => this.onError(err)),
			switchMap((res) => this.parseResponse(res))
		);
	}

	private parseResponse(response) {
		if (!response.success && !response.url) {
			this.presentToast(`Server error: ${response.result.message}`);
			return throwError(response.result);
		}
		return of(response.result || response);
	}

	private makeUrl(path) {
		return this.baseUrl + path;
	}

	private async onError(err) {
		console.error(err)
		const toast = await this.toastController.create({
			message: err.message,
			buttons: ['OK'],
		});
		toast.present();
		return of(err);
	}

	private async presentToast(message) {
		const toast = await this.toastController.create({
			message,
			buttons: ['OK'],
		});
		toast.present();
	}
}
