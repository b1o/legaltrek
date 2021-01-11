import { Component, OnInit } from '@angular/core';
import { keys } from 'underscore';
import { BillingsService } from '../billings.service';

@Component({
  selector: 'app-billings-page',
  templateUrl: './billings-page.component.html',
  styleUrls: ['./billings-page.component.scss'],
})
export class BillingsPageComponent implements OnInit {

  public billings = [];

  constructor(private billingsService: BillingsService) { }

  ngOnInit() {
    this.billingsService.getBillings()
      .subscribe(res => {
        console.log(res)
        this.billings = Object.keys(res.result.billings).map(key => ({id: key, ...res.result.billings[key]}));
      })
  }

}
