import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguageService} from '@ss/common/api-common';

@Component({
  selector: 'ss-confirmation-dialig',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})

export class ConfirmationDialogComponent {
  public title: string;
  public message: string;
  public yes = 'Yes';
  public noo = 'No';

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              private trans: LanguageService) {
    this.yes = trans.translate('YES');
    this.noo = trans.translate('NO');
  }
}
