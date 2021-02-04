import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';

import { format } from 'date-fns';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
	selector: 'app-calendar-page',
	templateUrl: './calendar-page.component.html',
	styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit {
	public today = new Date();
	public selectedDate = this.today;

	constructor(private calendarService: CalendarService) {}

	ngOnInit() {}

	getData() {
		this.calendarService
			.getTaskAndEventsByDate(format(this.selectedDate, 'yyyy-MM-dd'))
			.subscribe((data) => console.log(data));
	}

	onDateChange(event: MatDatepickerInputEvent<Date>) {
		console.log(event);
		this.selectedDate = event.value;
		this.getData();
	}
}
