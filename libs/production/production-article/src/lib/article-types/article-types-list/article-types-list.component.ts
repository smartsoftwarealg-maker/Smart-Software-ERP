import {Component, effect, inject} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {IsParamService, LanguageService, MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { ArticleTypeService, Lookup } from '@ss/common/api-lookup';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'ss-article-type-list',
    templateUrl: 'article-types-list.html',
    styleUrls: ['article-types-list.scss'],
    standalone: true,
    imports: [MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent
    ]
})
export class ArticleTypeListComponent extends BaseEntityListComponent<Lookup> {
    #langSrv = inject(LanguageService);
    #isParamSrv = inject(IsParamService);
    isGICA = toSignal(this.#isParamSrv.is('SODISMAC'));
    effect_ = effect(() => {
        if (this.isGICA()) {
            this.shellSrv.setTitle(this.#langSrv.translate('STOCK_GICA_SUBCLASSES'));
        }
    });

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public markSrv: ArticleTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(markSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_TYPES');
    }

}
