import { Component, OnInit, Input } from '@angular/core';
import { MatterTaskStatus } from '../../models/matter-task-status';
import { range, random } from 'underscore';
import { createTestTask } from '../../models/matter-task';
import { MattersService } from '../../matters.service';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
	public TaskStatus = MatterTaskStatus;

	@Input() tasks = range(Math.floor(random(7, 10))).map((_) =>
		createTestTask()
	);

	constructor() {}

	ngOnInit() {}
}
