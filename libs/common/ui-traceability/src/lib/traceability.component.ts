import { Component, EventEmitter, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {LogNode, Schema, TraceabilityService} from "./traceability.service";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LanguageService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import {ShellService} from "@ss/common/ui-shell";
import {switchMap} from "rxjs/operators";
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';


/** Flat node with expandable and level information */
interface LogFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    schema: Schema;
}


@Component({
    selector: 'ss-traceability',
    templateUrl: './traceability.component.html',
    styleUrls: ['./traceability.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
    ],

})
export class TraceabilityComponent implements OnInit, OnDestroy {
    private traceSrv = inject(TraceabilityService);
    private shellSrv = inject(ShellService);
    public langSrv = inject(LanguageService);

    processing = signal<boolean>(false);
    tableWidth = 400;
    selectedId = 0;
    application = '';
    data: string[][] = [];
    displayedColumns: string[] = [];
    form = new FormGroup({
        options: new FormControl<number>(1),
        fromDate: new FormControl<Date>(this.traceSrv.fromDate),
        toDate: new FormControl<Date>(this.traceSrv.toDate),
        filter: new FormControl<string>('')
    });
    public readonly pagination = PaginationModel.newInstance({ page: 1, pageSize: 20, elementCount: 0 });
    apps: string[] = [];
    treeControl = new FlatTreeControl<LogFlatNode>(
        node => node.level,
        node => node.expandable
    );
    private _transformer = (node: LogNode, level: number) => {
        return {
            expandable: level == 0,
            name: `${node.application} ${node.schema?.schemaVersion || ''} ${(node.schema?.creationDate.substring(0, 10)) || ''}`,
            level: level,
            schema: node.schema
        };
    };
    // eslint-disable-next-line @typescript-eslint/member-ordering
    treeFlattener =
        new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    ngOnInit(): void {
        this.traceSrv
            .getApps()
            .subscribe(res => this.apps = (res['apps'] || []).filter(e => e));
        this.pagination.onChange = () => this.refresh();
        this.shellSrv.setTitle('COMMON_TRACEABILITY');
        this.shellSrv.setGoBackPathByRelativeUrl('..');
    }

    ngOnDestroy() {
        this.traceSrv.fromDate = this.form.controls['fromDate'].value;
        this.traceSrv.toDate = this.form.controls['toDate'].value;
    }

    hasChild = (_: number, node: LogFlatNode) => node.level == 0;

    select(node: LogFlatNode) {
        this.pagination.page = 1;
        this.displayedColumns = node && node.schema ? node.schema.columns.split('`') : [];
        this.selectedId = node && node.schema ? node.schema.id : 0;
        this.refresh();
    }

    public refresh() {
        this.processing.set(true);
        const value = this.form.value;
        this.traceSrv.getDetails(
            value.fromDate,
            value.toDate,
            value.options,
            value.filter,
            this.selectedId,
            this.pagination.page - 1,
            this.pagination.pageSize)
            .subscribe({
                next: res => {
                    this.processing.set(false);
                    this.data = res.body.map(e => e.split('`'));
                    this.pagination.elementCount = res.itemCount;
                    this.tableWidth = (this.data.length > 0) ? this.data[0].length * 120 : 400;
                }, error: err => {
                    this.processing.set(false);
                    throw err;
                }
            });
    }

    setApp(app: any) {
        this.processing.set(true);
        this.application = app['value'];
        this.traceSrv.getSchemaMap(this.application)
            .subscribe({
                next: res => {
                    this.processing.set(false);
                    const nodes: LogNode[] = res.map(e => {
                        const children: LogNode[] = e.schemas.map(f => {
                            const fNode: LogNode = { application: f.description, schema: f };
                            return fNode;
                        });
                        return { application: e.application, children: children };
                    });
                    this.dataSource.data = nodes;
                }, error: err => {
                    this.processing.set(false);
                    throw err;
                }
            });
    }
}
