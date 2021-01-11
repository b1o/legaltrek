import { Component, OnInit, Input } from '@angular/core';
import { MatterTaskStatus } from '../../models/matter-task-status';
import { range, random } from 'underscore';
import { createTestTask } from '../../models/matter-task';
import { MattersService } from '../../matters.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
	public TaskStatus = MatterTaskStatus;

	@Input() tasks = [];

	constructor(private matterService: MattersService) {}

	ngOnInit() {
		const requests = this.tasks.map((t) =>
			this.matterService
				.getTaskById(t.task_id)
				.pipe(map((res) => res.result))
		);
		forkJoin(requests).subscribe((data) => {
			this.tasks = data;
			console.log(this.tasks)
		});
	}
}
