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

	ngOnInit() {
		this.mattersService.getMatters().subscribe((data: any) => {
			console.log(data);
			this.matters = data.result;
		});
	}

	public onMatterSelect(matter) {
		console.log(matter.id);
		this.router.navigateByUrl('/home/matters/' + matter.id);
	}
}
