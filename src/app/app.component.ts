import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { AuthService } from './auth/auth.service';
import { TimerService } from './services/timer.service';
import { MattersService } from './matters/matters.service';
import { Plugins, SplashScreen } from '@capacitor/core';

const {StatusBar} = Plugins

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
	public showSearchBar = false;
	public searchResults = [];

	constructor(
		private platform: Platform,
		private authService: AuthService,
		private menuController: MenuController,
		public timerService: TimerService,
		private matterService: MattersService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			StatusBar.setBackgroundColor({ color: '#092470' });
			SplashScreen.hide();
		});
	}

	toggleSideMenu() {
		this.menuController.toggle('settings');
	}

	titleClicked() {
		if (this.timerService.isRunning || this.timerService.isPaused) {
			this.timerService.openTimerSheet();
		}
	}

	toggleSearchBar() {
		this.showSearchBar = !this.showSearchBar;
	}

	logout() {
		this.authService.logout();
	}

	search(event) {
		const term = event.detail.value;
		this.matterService
			.search(term)
			.subscribe((data: any) => (this.searchResults = data));
	}

	ngOnInit() {
		
	}
}
