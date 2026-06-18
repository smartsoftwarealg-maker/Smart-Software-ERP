import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ss-cashflow-detail',
    templateUrl: './cash-flow-detail.component.html',
    styleUrls: ['./cash-flow-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true
})
export class CashFlowDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
