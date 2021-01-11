import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TimerService } from '../services/timer.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	constructor(private timerService: TimerService) {}

	timerClicked() {
		this.timerService.openTimerSheet();
	}
}
