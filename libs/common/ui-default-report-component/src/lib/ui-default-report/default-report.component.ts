import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormData} from '../FormData';
import {SnackBarService} from '@ss/common/ui-shell';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ReportCatalog, ReportListService} from '@ss/common/api-reports';
import { NgIf, NgFor } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ss-ui-default-report',
    templateUrl: './default-report.component.html',
    styleUrls: ['./default-report.component.scss'],
    standalone: true,
    imports: [NgIf, MatCard, MatCardContent, MatFormField, MatLabel, TranslateDirective, MatInput, FormsModule, MatAutocompleteTrigger, ReactiveFormsModule, MatAutocomplete, NgFor, MatOption, MatButton]
})
export class DefaultReportComponent implements OnInit {
    public form: UntypedFormGroup = null;
    public reportList: string[] = [];
    public filename = new UntypedFormControl('');

  constructor(private dialogRef: MatDialogRef<DefaultReportComponent>,
              private snackBarSrv: SnackBarService,
              private route: ActivatedRoute,
              private reportListsService: ReportListService,
              @Inject(MAT_DIALOG_DATA) public data: FormData){}

    ngOnInit(): void {
        this.reportListsService
            .getCatalogByApp(this.data.app)
            .subscribe((res: ReportCatalog[]) => {
                this.reportList = res.map(e => e.description);
            });
    }


  onClose() {
      this.dialogRef.close();
  }

 onUpdate() {
      const name = this.filename.value;
      this.dialogRef.close(name);
  }
}
