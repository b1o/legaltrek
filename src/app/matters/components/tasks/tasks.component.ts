import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
} from '@angular/core';
import { MatterTaskStatus } from '../../models/matter-task-status';
import { range, random } from 'underscore';
import { createTestTask } from '../../models/matter-task';
import { MattersService } from '../../matters.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
	public TaskStatus = MatterTaskStatus;
	public loading = false;

	@Input() tasks = [];

	constructor(
	
	) {}

	ngOnInit() {
	
	}
}
