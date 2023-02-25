import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Lookup} from '../lookup';
import {ImportInfo} from '../import-info';
import {DocImportService} from '../doc-import.service';
import {UntypedFormControl} from '@angular/forms';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'ss-doc-import',
  templateUrl: './doc-import.component.html',
  styleUrls: ['./doc-import.component.scss']
})
export class DocImportComponent implements OnInit {
  public   documentList: Lookup[];
  public   importList: ImportInfo[] = [];
  readonly displayedColumns = ['number', 'date', 'reference', 'refDate'];

  public   document = new UntypedFormControl();
  private  importInfo: ImportInfo = null;
  private  agentId = 0;


  constructor(private dialogRef: MatDialogRef<DocImportComponent>,
              private docImportService: DocImportService,
              @Inject(MAT_DIALOG_DATA) private data: { documentList: Lookup[], agentId?: number }) {
      this.documentList = data.documentList;
      this.agentId = data.agentId;
  }

  ngOnInit(): void {
    this.document
        .valueChanges
        .pipe(switchMap(docCode => this.docImportService
            .getList(docCode, this.agentId)))
        .subscribe(res => this.importList = res);
  }

  public close() {
      this.dialogRef.close({ document: +this.document.value, number: this.importInfo.number });
  }

  public cancel() {
      this.dialogRef.close();
  }

  selectRow(row: ImportInfo) {
      this.importInfo = row;
  }
}
