import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public fabButtonVisibility$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  public showFabButton() {
    this.fabButtonVisibility$.next(true)
  }

  public hideFabButton() {
    this.fabButtonVisibility$.next(false)
  }

}
