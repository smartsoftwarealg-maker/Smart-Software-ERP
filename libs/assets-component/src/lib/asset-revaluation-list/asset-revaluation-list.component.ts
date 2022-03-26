import {Component, Input, OnInit} from '@angular/core';
import {AssetCost, AssetRevaluation} from '../assets-api';
import {LanguageService, PaginationModel} from '@ss/common/api-common';
import {AssetCostsService} from '../asset-costs.service';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {of, switchMap} from 'rxjs';
import {AssetRevaluationService} from '../asset-revaluation.service';

@Component({
  selector: 'ss-asset-revaluation-list',
  templateUrl: './asset-revaluation-list.component.html',
  styleUrls: ['./asset-revaluation-list.component.scss']
})
export class AssetRevaluationListComponent implements OnInit {
    public selected = 0;
    revaluations: AssetRevaluation[] = [];
    public readonly pagination = PaginationModel.newInstance();
    public displayedColumns = ['typeDescription', 'deprec_year', 'useful_life', 'amount'];

    constructor(public entitySrv: AssetRevaluationService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public langSrv: LanguageService,
                public confirmationSrv: ConfirmationDialogService,
                public defReportSrv: DefaultReportService) {
    }

    ngOnInit() {
        this.pagination.onChange = () => this.refresh();
        this.refresh();
    }

    @Input()
    set assetId(id: number) {
        this.entitySrv.setParentId(id);
    }

    public select(id: number): void {
        this.selected = id;
    }

    public deleteSelected(): void {
        if (this.selected && this.selected > 0) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(answer => {
                    const a = this.revaluations.filter(x => x.id === this.selected)[0];
                    return answer && a && a.id ? of({count: 0}) : this.entitySrv.remove(a.id);
                }))
                .subscribe({
                    next: res => {
                        this.snackBarSrv.showSuccessMessage();
                        this.refresh();
                    },
                    error: err => {
                        this.snackBarSrv.showFailureMessage();
                        //this.shellSrv.setLoading(false);
                        throw err;
                    }
                });
        } else {
            this.snackBarSrv.showMessage('COMMON_NO_SELECTION');
        }
    }

    public edit() {
        this.showDetail(this.selected);
    }

    public showDetail(id: number) {
        this.router.navigate(['revaluations', id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }

    public refresh() {
        this.selected = 0;
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.revaluations = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }
}
