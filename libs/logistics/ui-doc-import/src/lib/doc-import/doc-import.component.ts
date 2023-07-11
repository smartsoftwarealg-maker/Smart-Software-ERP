import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Lookup} from '../lookup';
import {ImportInfo} from '../import-info';
import {DocImportService} from '../doc-import.service';
import { FormControl } from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ss-doc-import',
    templateUrl: './doc-import.component.html',
    styleUrls: ['./doc-import.component.scss']
})
export class DocImportComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    private  agentId = 0;
    public   documentList: Lookup[];
    public   importList: ImportInfo[] = [];
    readonly displayedColumns = ['number', 'date', 'reference', 'refDate'];

    public   document = new FormControl<number>(0);
    public   searchNumber = new FormControl<number>(0);
    public  importInfo: ImportInfo = null;


    constructor(private dialogRef: MatDialogRef<DocImportComponent>,
              private docImportService: DocImportService,
              @Inject(MAT_DIALOG_DATA) private data: { documentList: Lookup[], agentId?: number }) {
        this.documentList = data.documentList;
        this.agentId = data.agentId;
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.document
                .valueChanges
                .pipe(switchMap(docCode => this.docImportService.getList(docCode, this.searchNumber.value, this.agentId)))
                .subscribe(res => this.importList = res));

        this.subscriptions.push(
            this.searchNumber
                .valueChanges
                .pipe(switchMap(numb => this.docImportService.getList(this.document.value, numb, this.agentId)))
                .subscribe(res => this.importList = res));
    }

    public close() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.dialogRef.close({ document: +this.document.value, number: this.importInfo.number });
    }

    public cancel() {
        this.dialogRef.close();
    }

    selectRow(row: ImportInfo) {
        this.importInfo = row;
    }
}
