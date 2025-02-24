import { Component, inject, OnInit } from '@angular/core';
import { OrgChartModule, TreeNode } from 'angular13-organization-chart';
import { HttpService, LanguageService, MaterialModule } from '@ss/common/api-common';
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {CHART_TREE, CMMS_WORK_ORDER, WorkflowChartTree} from '../workflow-api'
import { CommonModule } from '@angular/common';


interface WorkflowTreeNode extends TreeNode {
    id: number;
    name: string;
    children: WorkflowTreeNode[];
}


@Component({
    selector: 'ss-workflow-chart',
    templateUrl: './workflow-chart.component.html',
    styleUrls: ['./workflow-chart.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        OrgChartModule,
    ],
})
export class WorkflowChartComponent implements OnInit {
    private httpSrv = inject( HttpService);
    private shellSrv = inject( ShellService);
    private route = inject( ActivatedRoute);
    root: WorkflowTreeNode;


    ngOnInit(): void {
        this.refresh();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    refresh() {
        this.shellSrv.setLoading(true);
        this.httpSrv.get<WorkflowChartTree[]>(CHART_TREE + CMMS_WORK_ORDER)
            .subscribe(e => {
                this.root = this.toChartNode(e[0]);
                this.shellSrv.setLoading(false);
            });
    }

    toChartNode(n: WorkflowChartTree): WorkflowTreeNode {
        const x: WorkflowTreeNode = {
            name: n.message.childDescription,
            id: n.message.id,
            children: []
        };
        x.children = n.children == null ? [] : n.children.map(y => this.toChartNode(y));
        return x;
    }
}
