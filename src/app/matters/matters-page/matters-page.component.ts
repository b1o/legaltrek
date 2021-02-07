import { Component, OnInit } from '@angular/core';
import { MattersService } from '../matters.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-matters-page',
	templateUrl: './matters-page.component.html',
	styleUrls: ['./matters-page.component.scss'],
})
export class MattersPageComponent implements OnInit {
	public matters = [];

	constructor(
		private mattersService: MattersService,
		private router: Router
	) {}

	ngOnInit() {}

	ionViewDidEnter() {
		this.mattersService.getMatters().subscribe((data: any) => {
			this.matters = Object.keys(data.matters).map((key) => ({
				id: key,
				...data.matters[key],
			}));
			console.log(this.matters);
			this.mattersService.matters = this.matters;
		});
	}

	public onMatterSelect(matter) {
		console.log(matter.id);
		this.mattersService.currentMatter = matter;
		this.router.navigateByUrl('/home/matters/' + matter.id);
	}
}
