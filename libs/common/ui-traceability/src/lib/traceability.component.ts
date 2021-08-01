import {Component, EventEmitter, OnInit} from '@angular/core';
import {LogNode, Schema, TraceabilityService} from "./traceability.service";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FormControl, FormGroup} from "@angular/forms";
import {PaginationModel} from '@ss/common/api-common';
import {ShellService} from "@ss/common/ui-shell";
import {switchMap} from "rxjs/operators";


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
    styleUrls: ['./traceability.component.scss']
})
export class TraceabilityComponent implements OnInit {
    selectedId = 0;
    application = '';
    data: string[][] = [];
    displayedColumns: string[] = [];
    form = new FormGroup({
        options: new FormControl(1),
        fromDate: new FormControl(new Date()),
        toDate: new FormControl(new Date())
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
            name: node.application,
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


    constructor(private traceSrv: TraceabilityService, private shellSrv: ShellService) { }

    ngOnInit(): void {
        this.traceSrv
            .getApps()
            .subscribe(res => this.apps = res['apps'] || []);
        this.pagination.onChange = () => this.refresh();
        this.shellSrv.setTitle('COMMON_TRACEABILITY');
        this.shellSrv.setGoBackPathByRelativeUrl('..');
    }

    hasChild = (_: number, node: LogFlatNode) => node.level == 0;

    select(node: LogFlatNode) {
        this.pagination.page = 1;
        this.displayedColumns = node && node.schema ? node.schema.columns.split('`') : [];
        this.selectedId = node && node.schema ? node.schema.id : 0;
        this.refresh();
    }

    public refresh() {
        this.traceSrv.getDetails(
            this.form.controls['fromDate'].value,
            this.form.controls['toDate']?.value,
            this.form.controls['options'].value,
            this.selectedId,
            this.pagination.page - 1,
            this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body.map(e => e.split('`'));
                this.pagination.elementCount = res.itemCount;
            });
    }

    setApp(app: any) {
        this.application = app['value'];
        this.traceSrv.getSchemaMap(this.application)
            .subscribe(res => {
                const nodes: LogNode[] = res.map(e => {
                    const children: LogNode[] = e.schemas.map(f => {
                        const fNode: LogNode = {application: f.description, schema: f};
                        return fNode;
                    });
                    return {application: e.application, children: children};
                })
                this.dataSource.data = nodes;
            });
    }
}
