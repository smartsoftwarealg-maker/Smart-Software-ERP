import {Component, Input, OnInit} from '@angular/core';
import {SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AssetCostsService} from '../services/asset-costs.service';
import {AssetCost} from '../assets-api';
import {of, switchMap} from 'rxjs';
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
    selector: 'ss-asset-costs-list',
    templateUrl: './asset-costs-list.component.html',
    styleUrls: ['./asset-costs-list.component.scss'],
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
    ]})
export class AssetCostsListComponent implements OnInit {
    @Input() editable = true;
    selected = 0;
    fiscalCosts: AssetCost[] = [];
    accountantCosts: AssetCost[] = [];
    public readonly fiscalPagination = PaginationModel.newInstance();
    public readonly accountantPagination = PaginationModel.newInstance();
    public displayedColumns = ['typeDescription', 'amount'];


    constructor(public entitySrv: AssetCostsService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public langSrv: LanguageService,
                public confirmationSrv: ConfirmationDialogService,
                public defReportSrv: DefaultReportService) {
    }

    ngOnInit() {
        this.fiscalPagination.onChange = () => this.refresh();
        this.accountantPagination.onChange = () => this.refresh();
        this.refresh();
    }

    // @Input()
    // set assetId(id: number) {
    //     this.entitySrv.setParentId(id);
    // }

    public select(id: number): void {
        this.selected = id;
    }

    public deleteSelected(): void {
        if (this.selected && this.selected > 0) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(answer => {
                    const a = this.fiscalCosts.filter(x => x.id === this.selected)[0];
                    const b = this.accountantCosts.filter(x => x.id === this.selected)[0];
                    const c = a || b;
                    return answer && c != null && c.id != null ? this.entitySrv.remove(c.id) : of({count: 0});
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
        this.router.navigate([id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }

    public refresh() {
        this.selected = 0;
        this.entitySrv
            .getList(this.fiscalPagination.page - 1, this.fiscalPagination.pageSize)
            .subscribe(res => {
                this.fiscalCosts = res.body.filter(e => e.cost_type == 2);
                this.accountantCosts = res.body.filter(e => e.cost_type == 1);
                this.fiscalPagination.elementCount = res.itemCount;
                this.accountantPagination.elementCount = res.itemCount;
            });
    }
}
