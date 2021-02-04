import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonTabs } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { TimerService } from '../services/timer.service';
import { LayoutService } from './layout.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
	public showFabButton = true;

	private resetTabStack = ['matters', 'billings', 'calendar'];
	private destroy = new Subject<boolean>();

	constructor(
		private timerService: TimerService,
		private router: Router,
		private layoutService: LayoutService
	) {
		this.layoutService.fabButtonVisibility$
			.pipe(takeUntil(this.destroy))
			.subscribe((visible) => (this.showFabButton = visible));
	}

	timerClicked() {
		this.timerService.openTimerSheet();
	}

	ngOnDestroy() {
		this.destroy.next();
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
