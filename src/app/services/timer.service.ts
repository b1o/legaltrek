import { Injectable, NgZone } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {
	ActionSheetController,
	ModalController,
	AlertController,
} from '@ionic/angular';
import { NetworkService } from './network.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import {
	ILocalNotificationActionType,
	LocalNotifications,
} from '@ionic-native/local-notifications/ngx';
import { MattersService } from '../matters/matters.service';

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

	private pausedButtons = [
		{
			id: 'resume',
			title: 'Resume',
			icon: 'res://resume',
			foreground: true,
		},
		{
			foreground: true,
			id: 'stop',
			title: 'Stop',
			icon: 'res://stop',
		},
	];

	private defaultButtons = [
		{
			id: 'pause',
			title: 'Pause',
			icon: 'res://pause',
			foreground: true,
		},
		{
			foreground: true,
			id: 'stop',
			title: 'Stop',
			icon: 'res://stop',
		},
	];

	constructor(
		private actionSheetController: ActionSheetController,
		private network: NetworkService,
		private alertController: AlertController,
		private backgroundMode: BackgroundMode,
		private localNotifications: LocalNotifications,
		private zone: NgZone,
		private matterService: MattersService
	) {
		this.toTimerFormat();
		this.pauseTimer = this.pauseTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.confirmTimerStop = this.confirmTimerStop.bind(this);
		this.localNotifications.on('pause').subscribe((data) =>
			this.zone.run((_) => {
				this.pauseTimer();
			})
		);

		this.localNotifications
			.on('stop')
			.subscribe((data) => this.zone.run(() => this.confirmTimerStop()));

		this.localNotifications.on('resume').subscribe((data) =>
			this.zone.run((_) => {
				this.startTimer();
			})
		);
	}

	private tick() {
		this.timer++;

		this.toTimerFormat();
		this.localNotifications.update({
			id: 1,
			text: this.timerFormatted,
		});
	}

	async confirmTimerStop() {
		this.backgroundMode.moveToForeground();
		const alert = await this.alertController.create({
			header: 'Save timer?',
			message: 'Do you wish to save this timer?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => this.saveTimer(),
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

		this.stopTimer();
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
		this.isRunning = true;
		this.isPaused = false;
		this.localNotifications.schedule({
			id: 1,
			title: this.matterService.currentMatter
				? this.matterService.currentMatter.matter
				: null,
			text: this.timerFormatted,
			autoClear: false,
			lockscreen: true,
			sticky: true,
			vibrate: false,
			actions: this.defaultButtons,
		});

		// this.backgroundMode.on('enable').subscribe(() => {
		// 	console.log('background  mode');

		// });
		this.tickerSub = this.ticker.subscribe(() => this.tick());
		this.backgroundMode.enable();
	}

	public stopTimer() {
		this.isRunning = false;
		this.isPaused = false;
		this.timer = 0;
		this.toTimerFormat();
		this.currentTimerId = null;
		this.tickerSub.unsubscribe();
		this.backgroundMode.disable();

		this.localNotifications.clear(1);
	}

	public pauseTimer() {
		this.isRunning = false;
		this.isPaused = true;
		this.localNotifications.update({
			id: 1,
			actions: this.pausedButtons,
		});
		this.tickerSub.unsubscribe();
	}
}
