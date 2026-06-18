import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ss-ui-customer-profile',
  templateUrl: './ui-customer-profile.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./ui-customer-profile.component.scss']
})
export class UiCustomerProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
