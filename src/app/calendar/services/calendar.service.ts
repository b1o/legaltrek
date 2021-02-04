import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private networkService: NetworkService) { }

  getTaskAndEventsByDate(date) {
    return this.networkService.get('/api/tasks_and_events', {date})
  }
}
