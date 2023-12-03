import {Component, HostBinding} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CostingProjectService } from '../costing-project.service';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CProject, DateUtil, slideToRight } from '@ss/costing/costing-utils';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';

@Component({
    selector: 'ss-costing-project-list',
    templateUrl: './costing-project-list.component.html',
    styleUrls: ['./costing-project-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
    ],
    animations: [slideToRight]
})
export class CostingProjectListComponent extends BaseEntityListComponent<CProject> {
    @HostBinding('@routeAnimation') routeAnimation = true;

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
            'COSTING_PRODUCTS');
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

    public addClone() {
        // this.httpSrv.clone(this.selectedId, this.cloneCode, this.cloneDescription)
        //     .subscribe(() => {
        //         this.snackBar.open(this.trans.translate('C_RECORD_CLONED'), null, {duration: 3000});
        //         this.refresh(this.filter);
        //         this.onCancelClone();
        //     });
    }

    public onCancelClone() {
        document.getElementById(this.projectListId).classList.remove(this.maxHeightZeroClass);
        document.getElementById(this.cloneFormId).classList.add(this.maxHeightZeroClass);
    }

}
