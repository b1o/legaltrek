import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
	selector: 'app-notes-edit-modal',
	templateUrl: './notes-edit-modal.component.html',
	styleUrls: ['./notes-edit-modal.component.scss'],
})
export class NotesEditModalComponent implements OnInit {
	@Input() notes;

	notesFormControl = new FormControl('');

	constructor(private modalController: ModalController) {}

	ngOnInit() {
		this.notesFormControl.patchValue(this.notes);
	}

	dismiss() {
		this.modalController.dismiss({
			value: this.notesFormControl.value,
			hasChanged: this.notesFormControl.dirty,
		});
	}

	close() {
		this.modalController.dismiss();
	}
}
