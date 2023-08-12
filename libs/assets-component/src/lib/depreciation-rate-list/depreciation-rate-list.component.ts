import {Component, Input, OnInit} from '@angular/core';
import {DepreciationRate} from '../assets-api';
import {LanguageService, PaginationModel} from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {of, switchMap} from 'rxjs';
import {DepreciationRateService} from '../services/depreciation-rate.service';

@Component({
  selector: 'ss-depreciation-rate-list',
  templateUrl: './depreciation-rate-list.component.html',
  styleUrls: ['./depreciation-rate-list.component.scss']
})
export class DepreciationRateListComponent implements OnInit {
    selected = 0;
    @Input() editable = true;
    rates: DepreciationRate[] = [];
    public readonly pagination = PaginationModel.newInstance();
    public displayedColumns = ['year', 'rate'];

    constructor(public entitySrv: DepreciationRateService,
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
                    const a = this.rates.filter(x => x.id === this.selected)[0];
                    return answer && a && a.id ? this.entitySrv.remove(a.id) : of({count: 0});
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
        this.router.navigate(['rates', id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }

    public refresh() {
        this.selected = 0;
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.rates = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }
}
