import {Component, Input, OnInit} from '@angular/core';
import {Blocking} from '../assets-api';
import {LanguageService, PaginationModel} from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {of, switchMap} from 'rxjs';
import {AssetBlockingService} from '../asset-blocking.service';

@Component({
  selector: 'ss-asset-blocking-list',
  templateUrl: './asset-blocking-list.component.html',
  styleUrls: ['../asset-revaluation-list/asset-revaluation-list.component.scss']
})
export class AssetBlockingListComponent implements OnInit {
    public selected = 0;
    blockings: Blocking[] = [];
    public readonly pagination = PaginationModel.newInstance();
    public displayedColumns = ['decision', 'date', 'fromDate', 'toDate'];


    constructor(public entitySrv: AssetBlockingService,
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
                    const a = this.blockings.filter(x => x.id === this.selected)[0];
                    return answer && a && a.id ? this.entitySrv.remove(a.id) : of({count: 0});
                }))
                .subscribe({
                    next: res => {
                        this.snackBarSrv.showSuccessMessage();
                        this.refresh();
                    },
                    error: err => {
                        this.snackBarSrv.showFailureMessage();
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
        this.router.navigate(['blockings', id], { relativeTo: this.route }).then();
    }

    ngOnDestroy() {
    }

    public refresh() {
        this.selected = 0;
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.blockings = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }
}
