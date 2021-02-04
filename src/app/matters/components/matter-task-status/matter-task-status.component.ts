import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatterTaskLabelMap, MatterTaskStatus } from '../../models/matter-task-status';
import { MapType } from '@angular/compiler';
import { ActionSheetController } from '@ionic/angular';
import { MattersService } from '../../matters.service';

@Component({
	selector: 'app-matter-task-status',
	templateUrl: './matter-task-status.component.html',
	styleUrls: ['./matter-task-status.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatterTaskStatusComponent implements OnInit {
	TaskStatus = MatterTaskStatus;
	LabelMap = MatterTaskLabelMap;

	@Input() status: MatterTaskStatus = MatterTaskStatus.PENDING;

	@Output() statusChange = new EventEmitter();

	public loading = false;

	constructor(
		private actionSheetController: ActionSheetController,
		private cd: ChangeDetectorRef,
		private mattersService: MattersService
	) {}

	ngOnInit() {}

	get buttonColor() {
		console.log(this.status)
		switch (+this.status) {
			case MatterTaskStatus.DONE:
				return 'success';

			case MatterTaskStatus.IN_PROGRESS:
				return 'warning';

			case MatterTaskStatus.PENDING:
				return 'secondary';
		}
	}

	async openSheet(event: MouseEvent) {
		event.stopPropagation()
		const actionSheet = await this.actionSheetController.create({
			header: 'Status',
			cssClass: 'my-custom-class',
			buttons: [
				{
					text: 'Pending',
					handler: () => {
						this.onStatusChange(MatterTaskStatus.PENDING);
						this.cd.markForCheck()
					},
				},
				{
					text: 'In Progress',
					handler: () => {
						this.onStatusChange(MatterTaskStatus.IN_PROGRESS);
						this.cd.markForCheck()
					},
				},
				{
					text: 'Done',
					handler: () => {
						this.onStatusChange(MatterTaskStatus.DONE);
						this.cd.markForCheck()
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
			this.cd.markForCheck()

		});
	}
}
