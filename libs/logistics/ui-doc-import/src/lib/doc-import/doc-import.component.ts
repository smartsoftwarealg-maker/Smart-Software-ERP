import { Component, inject, Inject, OnInit } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Lookup} from '../lookup';
import {ImportInfo} from '../import-info';
import {DocImportService} from '../doc-import.service';
import { FormControl } from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PaginationModel } from '@ss/common/api-common';

@Component({
    selector: 'ss-doc-import',
    templateUrl: './doc-import.component.html',
    styleUrls: ['./doc-import.component.scss']
})
export class DocImportComponent implements OnInit {
    private dialogRef = inject(MatDialogRef<DocImportComponent>);
    private docImportService = inject(DocImportService);
    private subscriptions: Subscription[] = [];
    private  agentId = 0;
    public   documentList: Lookup[];
    public   importList: ImportInfo[] = [];
    readonly displayedColumns = ['number', 'date', 'reference', 'refDate'];

    public  document = new FormControl<number>(0);
    public  searchNumber = new FormControl<number>(0);
    public  importInfo: ImportInfo = null;
    paginator = PaginationModel.newInstance({page: 0, pageSize: 10, elementCount: 0 });


    constructor(@Inject(MAT_DIALOG_DATA) private data: { documentList: Lookup[], agentId?: number }) {
        this.documentList = data.documentList;
        this.agentId = data.agentId;
        this.paginator.onChange = () => this.refresh();
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.document
                .valueChanges
                .pipe(switchMap(docCode => this.docImportService.getList(docCode, this.searchNumber.value||0, this.agentId, 0, 50)))
                .subscribe(res => {
                    this.importList = res.body;
                    this.paginator.elementCount = res.itemCount;
                }));

        this.subscriptions.push(
            this.searchNumber
                .valueChanges
                .pipe(switchMap(numb => this.docImportService.getList(this.document.value, (numb||0), this.agentId, 0, 50)))
                .subscribe(res => {
                    this.importList = res.body;
                    this.paginator.elementCount = res.itemCount;
                }));
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

    private refresh() {
        this.docImportService
            .getList(this.document.value, 0, this.agentId, this.paginator.page - 1, this.paginator.pageSize)
            .subscribe(res => {
                this.importList = res.body;
                this.paginator.elementCount = res.itemCount;
            });
    }
}
