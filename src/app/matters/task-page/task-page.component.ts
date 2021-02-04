import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MattersService } from '../matters.service';

@Component({
	selector: 'app-task-page',
	templateUrl: './task-page.component.html',
	styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
	public taskId;

	public taskData;

	constructor(
		private route: ActivatedRoute,
		public mattersService: MattersService,
		private router: Router
	) {
		this.route.paramMap.subscribe((params) => {
			this.taskId = +params.get('taskId');
			this.mattersService.getTaskById(this.taskId).subscribe((task) => {
				console.log(task);
				this.taskData = { ...task, id: this.taskId };
				this.mattersService.currentTask = task;
			});
		});
	}

	goBack() {
		if (!this.mattersService.currentMatter) {
			this.router.navigateByUrl('/home/matters');
			return;
		}

		this.router.navigateByUrl(
			'/home/matters/' + this.mattersService.currentMatter.id
		);
	}

	ngOnInit() {}

	ngOnDestroy() {
	}
}
