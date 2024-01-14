import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
    ReportNode, ReportTreeService
} from '@ss/common/api-reports';
import { Lookup, RoleService } from '@ss/common/api-lookup';
import { FormControl } from '@angular/forms';
import { ReportReportService } from '../role-report.service';
import { Observable, switchMap } from 'rxjs';
import { RoleReport } from '../report-rights-api';

@Component({
    selector: 'ss-report-rights',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    templateUrl: './report-rights.component.html',
    styleUrls: ['./report-rights.component.scss'],
})
export class ReportRightsComponent implements OnInit {
    private snackBar = inject(SnackBarService);
    private roleSrv = inject(RoleService);
    private roleReportSrv = inject(ReportReportService);
    private reportsSrv = inject(ReportTreeService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);

    // @ViewChild('tree', { static: false }) tree: MatTree<any>;
    // @ViewChild('role', { static: false }) role: MatTree<any>;

    reportTree: MatTreeNestedDataSource<ReportNode> = new MatTreeNestedDataSource();
    selectedRole: ReportNode | null = null;
    selectedReport: ReportNode | null = null;
    roleLookup = new DefaultAutoCompleteModel(this.roleSrv);

    roleTree: MatTreeNestedDataSource<ReportNode> = new MatTreeNestedDataSource();
    roleReports: RoleReport[] = [];
    reportNode: ReportNode | null = null;
    reportList$: Observable<ReportNode> | null = null;

    hasChild = (_: number, node: any) => !!node && node.list.length > 0;

    roleCtrl = new FormControl<number>(0);
    reportTreeControl = new NestedTreeControl<ReportNode>(node => node.list);
    roleTreeControl = new NestedTreeControl<ReportNode>(node => node.list);

    constructor() {
        this.roleLookup.onObjectSelected = r => this.onRole(r);
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.setTitle('COMMON_REPORT_RIGHTS');
        this.route
            .data
            .pipe(switchMap(res => this.reportsSrv.getReportsTree(res['reportBase'] || '')))
            .subscribe(res => this.reportNode = res);
    }

    onRole(role: Lookup) {
        this.roleReportSrv.setParentId(role.id);
        this.roleReportSrv
            .getList(0, 100)
            .subscribe(res => {
                this.roleReports = res.body;
                this.updateTrees();
            });
    }

    private updateTrees() {
        const reports = this.roleReports.map(r => r.report);
        this.reportTree.data = this.parseTree(this.filter(this.reportNode?.list, n => reports.indexOf(n.name) < 0), '');
        this.roleTree.data = this.parseTree(this.filter(this.reportNode?.list, n => reports.indexOf(n.name) >= 0), '');
        this.reportTreeControl.dataNodes = this.reportTree.data;
        this.roleTreeControl.dataNodes = this.roleTree.data;
        this.reportTreeControl.expandAll();
        this.roleTreeControl.expandAll();
    }

    selectReport(reportNode: ReportNode) {
        this.selectedReport = reportNode;
    }

    selectRoleReport(reportNode: ReportNode) {
        this.selectedRole = reportNode;
    }


    private filter(list: ReportNode[], predicate: (node: ReportNode) => boolean): ReportNode[] {
        return list.filter(n => n.name.indexOf('.jasper') > 0? predicate(n): this.filter(n.list, predicate).length > 0)
            .map(n => {
                return {
                    name: n.name,
                    list: this.filter(n.list, predicate),
                    parent: n.parent
                };
            });
    }


    private parseTree(tree: ReportNode[], parent: string): ReportNode[] {
        return tree.filter(n => n.name !== 'forms')
            .map(x => {
                if (x.list.length > 0) x.list = this.parseTree(x.list, `${parent}/${x.name}`);
                x.parent = (x.parent || '') + (parent || '');
                return x;
            });
    }

    deleteReport() {
        if (this.selectedRole?.name.indexOf('.jasper') > 1) {
            const report = this.roleReports.find(r => r.report === this.selectedRole?.name);
            if (report) {
                this.roleReportSrv
                    .remove(report.id)
                    .subscribe(res => {
                        if (res.count) {
                            this.roleReports = this.roleReports.filter(r => r.report !== this.selectedRole?.name);
                            this.updateTrees();
                            this.snackBar.showSuccessMessage();
                            this.selectedRole = null;
                            this.reportTreeControl.expandAll();
                            this.roleTree
                        }
                    });
            }
        }
    }

    addReport() {
        if (this.selectedReport?.name.indexOf('.jasper') > 1) {
            const roleReport: RoleReport = {
                id: 0,
                parentId: this.roleReportSrv.getParentId(),
                report: this.selectedReport?.name
            };
            this.roleReportSrv
                .add(roleReport)
                .subscribe(res => {
                    if (res) {
                        this.selectedReport = null;
                        roleReport.id = res;
                        this.roleReports.push(roleReport);
                        this.updateTrees();
                        this.snackBar.showSuccessMessage();
                    }
                });
        }
    }
}
