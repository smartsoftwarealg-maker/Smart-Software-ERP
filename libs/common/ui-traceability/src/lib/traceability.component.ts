import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LogNode, Schema, TraceabilityService} from "./traceability.service";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LanguageService, MaterialModule, PaginationModel} from '@ss/common/api-common';
import {ShellService} from "@ss/common/ui-shell";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CommonModule} from '@angular/common';


import {DatePickerComponent} from '@ss/common/ui-datepicker';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TranslateDirective} from '@ss/common/ui-lang';
import {PaginationComponent} from '@ss/common/ui-pagination';


/** Flat node with expandable and level information */
interface LogFlatNode {
    expandable: boolean;
    name: string;
    version: number;
    level: number;
    schema: Schema;
}


@Component({
    selector: 'ss-traceability',
    templateUrl: './traceability.component.html',
    styleUrls: ['./traceability.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        PaginationComponent
    ]

})
export class TraceabilityComponent implements OnInit, OnDestroy {
    private cdr = inject(ChangeDetectorRef);
    private destroyRef = inject(DestroyRef);
    private traceSrv = inject(TraceabilityService);
    private shellSrv = inject(ShellService);
    public langSrv = inject(LanguageService);

    processing = signal<boolean>(false);
    logData: LogNode[] = [];
    schemaData: Schema[] = [];

    tableWidth = 400;
    selectedId = signal(0);
    application = '';
    data: string[][] = [];
    displayedColumns = signal<string[]>([]);
    schemaColums = ['description', 'creationDate'];

    form = new FormGroup({
        options: new FormControl<number>(1),
        fromDate: new FormControl<Date>(this.traceSrv.fromDate),
        toDate: new FormControl<Date>(this.traceSrv.toDate),
        filter: new FormControl<string>(''),
        consolidated: new FormControl<boolean>(false),
    });

    selectedApplication = new FormControl<string>('');
    public readonly pagination = PaginationModel.newInstance({ page: 1, pageSize: 20, elementCount: 0 });
    apps = signal<string[]>([]);

    ngOnInit(): void {
        this.processing.set(true);
        this.traceSrv
            .getApps()
            .subscribe(res => {
                this.processing.set(false);
                this.apps.set((res['apps'] || []).filter(e => e));
                this.processing.set(false);
            });

        this.pagination.onChange = () => this.refresh();
        this.shellSrv.setTitle('COMMON_TRACEABILITY');
        this.shellSrv.setGoBackPathByRelativeUrl('..');

        this.form
            .valueChanges
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => this.refresh());
    }

    ngOnDestroy() {
        const date = new Date();
        this.traceSrv.fromDate = this.form?.controls['fromDate']?.value||date;
        this.traceSrv.toDate = this.form?.controls['toDate']?.value||date;
    }

    hasChild = (_: number, node: LogFlatNode) => node.level == 0;

    select(node: Schema) {
        this.pagination.page = 1;
        this.displayedColumns.set(node.columns.split('`')||[]);
        this.selectedId.set(node?.id||0);
        this.refresh();
    }

    public refresh() {
        this.processing.set(true);
        const value = this.form.value;
        this.traceSrv.getDetails(
            value.fromDate,
            value.toDate,
            value.options,
            value.consolidated,
            value.filter,
            this.selectedId(),
            this.pagination.page - 1,
            this.pagination.pageSize)
            .subscribe({
                next: res => {
                    this.data = res.body.map(e => e.split('`'));
                    this.pagination.elementCount = res.itemCount;
                    this.tableWidth = (this.data.length > 0) ? this.data[0].length * 120 : 400;
                    this.cdr.markForCheck();
                    this.processing.set(false);
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
                    this.schemaData = res.flatMap(e => e.schemas);

                    // this.dataSource.data = nodes;
                    this.logData = res.map(e => {
                        const children: LogNode[] = e.schemas.map(f => {
                            const fNode: LogNode = {application: f.description, schema: f};
                            return fNode;
                        });
                        return {application: e.application, children: children};
                    });
                    this.processing.set(false);
                }, error: err => {
                    this.processing.set(false);
                    throw err;
                }
            });
    }
}
