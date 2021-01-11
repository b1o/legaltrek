import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { TimerService } from './services/timer.service';
import { MattersService } from './matters/matters.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	public showSearchBar = false;
	public searchResults = [];

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private authService: AuthService,
		private menuController: MenuController,
		public timerService: TimerService,
		private matterService: MattersService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
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
		this.matterService.search(term)
			.subscribe(data => this.searchResults = data)
	}
}
