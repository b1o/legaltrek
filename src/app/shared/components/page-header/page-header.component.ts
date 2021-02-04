import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
	@Input() title;
	@Input() subTitle;
	@Input() showBackButton = true;

	@Output() back = new EventEmitter();

	constructor() {}

	ngOnInit() {}
}
