import {Component, OnInit} from '@angular/core';
import {LogNode, Schema, TraceabilityService} from "./traceability.service";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FormControl, FormGroup} from "@angular/forms";
import {PaginationModel} from "@ss/common/ui-pagination";
import {ShellService} from "@ss/common/ui-shell";


/** Flat node with expandable and level information */
interface LogFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    schema?: Schema;
}


@Component({
    selector: 'ss-traceability',
    templateUrl: './traceability.component.html',
    styleUrls: ['./traceability.component.scss']
})
export class TraceabilityComponent implements OnInit {
    selectedId = 0;
    data: string[][] = [];
    displayedColumns: string[] = [];
    form = new FormGroup({
        options: new FormControl(1),
        fromDate: new FormControl(new Date()),
        toDate: new FormControl(new Date())
    });
    public readonly pagination = PaginationModel.newInstance({ page: 1, pageSize: 20, elementCount: 0 });
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
    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(private traceSrv: TraceabilityService, private shellSrv: ShellService) { }

    ngOnInit(): void {
        this.traceSrv
            .getSchemaMap()
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
        this.pagination.onChange = () => this.refresh();
        this.shellSrv.setTitle('COMMON_TRACEABILITY');
    }

    hasChild = (_: number, node: LogFlatNode) => node.level == 0;

    select(node: LogFlatNode) {
        this.pagination.page = 1;
        this.displayedColumns = node && node.schema ? node.schema.columns.split('`') : [];
        this.selectedId = node && node.schema ? node.schema.id : 0;
        this.refresh();
    }

    private refresh() {
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
                console.log('ic', res.itemCount);
            });
    }

}
