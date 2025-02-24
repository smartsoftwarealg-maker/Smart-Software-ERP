import { Component, inject, Inject, OnInit } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Lookup} from '../lookup';
import {ImportInfo} from '../import-info';
import {DocImportService} from '../doc-import.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PaginationModel } from '@ss/common/api-common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from "@angular/material/select";
import { NgFor, DatePipe } from "@angular/common";
import { MatOption } from "@angular/material/core";
import { MatInput } from "@angular/material/input";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { MatButton } from "@angular/material/button";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-doc-import',
    templateUrl: './doc-import.component.html',
    styleUrls: ['./doc-import.component.scss'],
    standalone: true,
    imports: [MatFormField, MatLabel, TranslateDirective, MatSelect, FormsModule, ReactiveFormsModule, NgFor, MatOption, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatButton, PaginationComponent, DatePipe, TranslatePipe]
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
            .getList(this.document.value, this.searchNumber.value, this.agentId, this.paginator.page - 1, this.paginator.pageSize)
            .subscribe(res => {
                this.importList = res.body;
                this.paginator.elementCount = res.itemCount;
            });
    }
}
