import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {
	ActionSheetController,
	ModalController,
	AlertController,
} from '@ionic/angular';
import { NetworkService } from './network.service';

@Injectable({
	providedIn: 'root',
})
export class TimerService {
	isRunning = false;
	isPaused = false;

	timer = 0;
	private currentTimerId;
	public timerFormatted;
	private ticker = interval(1000);
	private tickerSub: Subscription;

	constructor(
		private actionSheetController: ActionSheetController,
		private network: NetworkService,
		private alertController: AlertController
	) {
		this.toTimerFormat();
	}

	private tick() {
		this.timer++;
		this.toTimerFormat();
	}

	async confirmTimerStop() {
		const alert = await this.alertController.create({
			header: 'Save timer?',
			message: 'Do you wish to save this timer?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => this.saveTimer()
				},
				{
					text: 'Yes',
					handler: () => this.stopTimer(),
				},
			],
		});

		await alert.present();
	}

	private saveTimer() {
		// TODO: save timer

		this.stopTimer()
	}

	async openTimerSheet() {
		const buttons = [];
		if (
			(this.isPaused && !this.isRunning) ||
			(!this.isPaused && !this.isRunning)
		) {
			buttons.push({
				text: !this.isPaused ? 'Start timer' : 'Resume timer',
				icon: 'play',
				handler: () => this.startTimer(),
			});
		}

		if (this.isPaused || this.isRunning) {
			buttons.push({
				text: 'Stop timer',
				icon: 'stop',
				handler: () => this.stopTimer(),
			});
		}

		if (this.isRunning) {
			buttons.push({
				text: 'Pause timer',
				icon: 'pause',
				handler: () => this.pauseTimer(),
			});
		}

		const actionSheet = await this.actionSheetController.create({
			header: 'Timer',
			buttons: [
				...buttons,
				{
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {},
				},
			],
		});

		await actionSheet.present();
	}

	private toTimerFormat() {
		let hours: number | string = Math.floor(this.timer / 3600);
		let minutes: number | string = Math.floor(
			(this.timer - hours * 3600) / 60
		);
		let seconds: number | string = this.timer - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		this.timerFormatted = hours + ':' + minutes + ':' + seconds;
	}

	public startTimer() {
		this.network
			.post('/timers/stat', { name: 'timer' })
			.subscribe((data) => {
				this.isRunning = true;
				this.isPaused = false;
				console.log(data);

				this.tickerSub = this.ticker.subscribe(() => this.tick());
			});
	}

	public stopTimer() {
		this.network
			.post('/timers/delete', { id: this.currentTimerId })
			.subscribe((data) => {
				this.isRunning = false;
				this.isPaused = false;
				this.timer = 0;
				this.toTimerFormat()
				this.currentTimerId = null;
				this.tickerSub.unsubscribe();
			});
	}

	public pauseTimer() {
		this.isRunning = false;
		this.isPaused = true;
		this.tickerSub.unsubscribe();
	}
}
