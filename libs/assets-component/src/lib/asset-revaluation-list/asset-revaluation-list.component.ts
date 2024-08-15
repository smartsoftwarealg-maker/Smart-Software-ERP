import { Component, Input, OnInit } from '@angular/core';
import { AssetCost, AssetRevaluation } from '../assets-api';
import { LanguageService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { AssetCostsService } from '../services/asset-costs.service';
import { SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { of, switchMap } from 'rxjs';
import { AssetRevaluationService } from '../services/asset-revaluation.service';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-asset-revaluation-list',
    templateUrl: './asset-revaluation-list.component.html',
    styleUrls: ['./asset-revaluation-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]

})
export class AssetRevaluationListComponent implements OnInit {
    selected = 0;
    @Input() editable = true;
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
                    return answer && a && a.id ? this.entitySrv.remove(a.id) : of({ count: 0 });
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
        this.router.navigate([id], { relativeTo: this.route }).then();
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
