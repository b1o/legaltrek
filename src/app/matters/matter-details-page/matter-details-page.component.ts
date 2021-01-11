import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MattersService } from '../matters.service';

@Component({
	selector: 'app-matter-details-page',
	templateUrl: './matter-details-page.component.html',
	styleUrls: ['./matter-details-page.component.scss'],
})
export class MatterDetailsPageComponent implements OnInit {
	public matterId;

	public details: any = {};

	constructor(
		private route: ActivatedRoute,
		private mattersService: MattersService
	) {
		this.route.paramMap.subscribe((params) => {
			this.matterId = params.get('id');
			this.mattersService
				.getMatterDetails(this.matterId)
				.subscribe((data: any) => (this.details = data.result[0]));
		});
	}

	ngOnInit() {}
}
