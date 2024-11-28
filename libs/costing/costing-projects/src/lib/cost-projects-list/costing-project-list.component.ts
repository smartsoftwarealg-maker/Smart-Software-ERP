import { Component, HostBinding, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CostingProjectService } from '../services/costing-project.service';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CProject, DateUtil, slideToRight } from '@ss/costing/costing-utils';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';


import { CostingReportsComponent } from '../costing-reports/costing-reports.component';
import { CostingReportService } from '../services/costing-report.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-costing-project-list',
    templateUrl: './costing-project-list.component.html',
    styleUrls: ['./costing-project-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,


        CostingReportsComponent,
        PaginationComponent,
        TranslatePipe
    ],
    animations: [slideToRight]
})
export class CostingProjectListComponent extends BaseEntityListComponent<CProject> implements OnInit {
    public duplicateButton: ToolbarButton = {
        icon: 'fa-solid fa-copy',
        label: 'COST_DUPLICATE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.duplicate()
    };
    private reportSrv = inject(CostingReportService);
    @HostBinding('@routeAnimation') routeAnimation = true;
    @ViewChild(CostingReportsComponent) reportView: CostingReportsComponent | null = null;

    public displayedColumns = ['code', 'description', 'from', 'to'];
    private projectListId = 'project-list';
    private cloneFormId = 'project-clone-form';
    private maxHeightZeroClass = 'max-height-zero';


    constructor(
      public override entitySrv: CostingProjectService,
      public override shellSrv: ShellService,
      public override snackBarSrv: SnackBarService,
      public override route: ActivatedRoute,
      public override router: Router,
      public override defReportSrv: DefaultReportService,
      public override confirmationSrv: ConfirmationDialogService,
      public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COST_PRODUCTS');
        this.pagination.pageSize = 15;
    }


    projectFromStr(item: any): string {
        if (item['fromStr']) {
            return item['fromStr'];
        } else {
            item['fromStr'] = DateUtil.ymdToDmy(item.from).substr(0, 10);
            return item['fromStr'];
        }
    }

    projectToStr(item: any): string {
        if (item['toStr']) {
            return item['toStr'];
        } else {
            item['toStr'] = DateUtil.ymdToDmy(item.to).substring(0, 10);
            return item['toStr'];
        }
    }

    public onClone() {
        document.getElementById(this.projectListId).classList.add(this.maxHeightZeroClass);
        document.getElementById(this.cloneFormId).classList.remove(this.maxHeightZeroClass);
    }

    public onView() {
        this.router.navigate(['view/' + this.selected], {relativeTo: this.route}).then();
    }

    override select(id: number) {
        super.select(id);
        if (this.reportView) {
            this.reportSrv.parentId = id;
            this.reportView.refresh();
        }
    }

    private duplicate() {
        this.router.navigate(['duplicate', this.selected], {relativeTo: this.route}).then();
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.duplicateButton);
    }

    override selectRow(row: CProject) {
        super.selectRow(row);
        this.duplicateButton.disabled = !row?.id;
    }
}
