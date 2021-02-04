import { Component, OnInit, Input } from '@angular/core';
import { TimeEntry, createTestTimeEntry } from '../../models/time-entry';
import { range, random } from 'underscore';

@Component({
	selector: 'app-time-entries',
	templateUrl: './time-entries.component.html',
	styleUrls: ['./time-entries.component.scss'],
})
export class TimeEntriesComponent implements OnInit {
	@Input() timeEntries: TimeEntry[] = [];
	@Input() loading = false;

	constructor() {}

	ngOnInit() {}
}
