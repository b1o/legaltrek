import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotesEditModalComponent } from '../notes-edit-modal/notes-edit-modal.component';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
	@Input() notes =
		'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi molestias maiores deserunt? Veniam ut perferendis alias, adipisci numquam officiis, rem labore architecto magnam odit quod doloremque ipsa laboriosam iusto dignissimos!';

	constructor(private modalController: ModalController) {}

	ngOnInit() {}

	async editNotes() {
		const modal = await this.modalController.create({
			component: NotesEditModalComponent,
			componentProps: {
				notes: this.notes,
			},
		});

		modal.present();
		modal.onDidDismiss().then((data) => {
			if (data.data.value) {
				this.notes = data.data.value;
			}
		});
	}
}
