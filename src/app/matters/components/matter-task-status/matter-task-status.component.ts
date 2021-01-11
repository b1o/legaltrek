import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatterTaskLabelMap, MatterTaskStatus } from '../../models/matter-task-status';
import { MapType } from '@angular/compiler';
import { ActionSheetController } from '@ionic/angular';
import { MattersService } from '../../matters.service';

@Component({
	selector: 'app-matter-task-status',
	templateUrl: './matter-task-status.component.html',
	styleUrls: ['./matter-task-status.component.scss'],
})
export class MatterTaskStatusComponent implements OnInit {
	TaskStatus = MatterTaskStatus;
	LabelMap = MatterTaskLabelMap;

	@Input() status: MatterTaskStatus = MatterTaskStatus.PENDING;

	@Output() statusChange = new EventEmitter();

	public loading = false;

	constructor(
		private actionSheetController: ActionSheetController,
		private mattersService: MattersService
	) {}

	ngOnInit() {}

	get buttonColor() {
		switch (this.LabelMap[this.status]) {
			case MatterTaskStatus.DONE:
				return 'success';

			case MatterTaskStatus.IN_PROGRESS:
				return 'warning';

			case MatterTaskStatus.PENDING:
				return 'secondary';
		}
	}

	async openSheet() {
		const actionSheet = await this.actionSheetController.create({
			header: 'Status',
			cssClass: 'my-custom-class',
			buttons: [
				{
					text: 'Pending',
					handler: () => {
						this.onStatusChange(MatterTaskStatus.PENDING);
					},
				},
				{
					text: 'In Progress',
					handler: () => {
						this.onStatusChange(MatterTaskStatus.IN_PROGRESS);
					},
				},
				{
					text: 'Done',
					handler: () => {
						this.onStatusChange(MatterTaskStatus.DONE);
					},
				},
			],
		});
		await actionSheet.present();
	}

	onStatusChange(newStatus) {
		this.loading = true;
		this.mattersService.changeTaskStatus().subscribe((data) => {
			console.log(newStatus);
			this.loading = false;
			this.status = newStatus;
			this.statusChange.emit(newStatus);
		});
	}
}
