import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormData} from '../FormData';
import {SnackBarService} from '@ss/common/ui-shell';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ReportCatalog, ReportListService} from '@ss/common/api-reports';

@Component({
  selector: 'ss-ui-default-report',
  templateUrl: './default-report.component.html',
  styleUrls: ['./default-report.component.scss']
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
