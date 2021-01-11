import {
	Component,
	OnInit,
	Input,
	ViewEncapsulation,
	Output,
	EventEmitter,
} from '@angular/core';

@Component({
	selector: 'app-matter-list-item',
	templateUrl: './matter-list-item.component.html',
	styleUrls: ['./matter-list-item.component.scss'],
})
export class MatterListItemComponent implements OnInit {
	@Input() matter;
	@Output() select = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	clicked() {
		this.select.emit(this.matter);
	}
}
