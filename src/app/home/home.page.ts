import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonTabs } from '@ionic/angular';
import { TimerService } from '../services/timer.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	private resetTabStack = ['matters', 'billings', 'calendar'];

	constructor(private timerService: TimerService, private router: Router) {}

	timerClicked() {
		this.timerService.openTimerSheet();
	}

	@ViewChild('tabs') tabs: IonTabs;

	public openTab(event: MouseEvent) {
		const { tab } = event
			.composedPath()
			.find(
				(element: any) => element.tagName === 'ION-TAB-BUTTON'
			) as EventTarget & { tab: string };

		if (this.resetTabStack.includes(tab)) {
			this.router.navigate(['home/' + tab]);
		}
	}
}
