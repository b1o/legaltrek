import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MattersPageComponent } from './matters-page/matters-page.component';
import { MatterListItemComponent } from './components/matter-list-item/matter-list-item.component';
import { IonicModule } from '@ionic/angular';
import { MatterDetailsPageComponent } from './matter-details-page/matter-details-page.component';
import { MaterialModule } from '../material/material.module';
import { NotesComponent } from './components/notes/notes.component';
import { TimeEntriesComponent } from './components/time-entries/time-entries.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { MatterTaskStatusComponent } from './components/matter-task-status/matter-task-status.component';
import { NotesEditModalComponent } from './components/notes-edit-modal/notes-edit-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMatterPageComponent } from './add-matter-page/add-matter-page.component';

const routes: Route[] = [
	{ path: '', component: MattersPageComponent },
	{ path: 'add', component: AddMatterPageComponent },
	{ path: ':id', component: MatterDetailsPageComponent },
];

@NgModule({
	declarations: [
		MatterListItemComponent,
		MattersPageComponent,
		AddMatterPageComponent,
		MatterDetailsPageComponent,
		NotesComponent,
		TimeEntriesComponent,
		TasksComponent,
		MatterTaskStatusComponent,
		ExpensesComponent,
		NotesEditModalComponent,
	],
	imports: [
		CommonModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		MaterialModule,
	],
})
export class MattersModule {}
