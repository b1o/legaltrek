import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MattersService } from '../matters.service';

@Component({
	selector: 'app-matter-details-page',
	templateUrl: './matter-details-page.component.html',
	styleUrls: ['./matter-details-page.component.scss'],
})
export class MatterDetailsPageComponent implements OnInit, OnDestroy {
	public matterId;

	public details: any = {};

	constructor(
		private route: ActivatedRoute,
		private mattersService: MattersService,
		private router: Router
	) {
		// this.route.paramMap.subscribe((params) => {
		// 	this.matterId = params.get('id');
		// 	// this.mattersService
		// 	// 	.getMatterDetails(this.matterId)
		// 	// 	.subscribe((data: any) => {
		// 	// 		console.log(data);
		// 	// 		this.details = data.result[0];
		// 	// 	});
		// });
	}

	ngOnInit() {
		if (!this.mattersService.currentMatter) {
			this.router.navigateByUrl('/home/matters')
		}
		this.details = this.mattersService.currentMatter;
		console.log(this.details)
	}

	ngOnDestroy() {
		this.mattersService.currentMatter = null;
	}
}
