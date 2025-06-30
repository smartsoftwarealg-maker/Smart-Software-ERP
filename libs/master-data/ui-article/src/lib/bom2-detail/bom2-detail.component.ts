import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BomService } from '../bom.service';
import {
    ArticleAutoCompleteModel,
    ArticleIdAutoCompleteModel,
    BOM,
    BOMTree,
    FinalProductService
} from '@ss/master-data/api-article';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BomDialogComponent } from '../bom-dialog/bom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, of, switchMap } from 'rxjs';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseEntityDetailComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ClassService } from '@ss/common/api-lookup';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { BankService } from '@ss/administration/api-bank';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { BomListComponent } from '../bom/bom-list.component';

@Component({
    selector: 'ss-bom-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        DatePickerComponent,
        BomListComponent
    ],
    templateUrl: './bom2-detail.component.html',
    styleUrl: './bom2-detail.component.css'
})
export class Bom2DetailComponent extends BaseEntityDetailComponent<BOM> {
    #formBuilder = inject(FormBuilder);
    #finalProductSrv = inject(FinalProductService);

    finalProductLookup = new ArticleIdAutoCompleteModel(this.#finalProductSrv);


    constructor(
        public override entitySrv: BomService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_BOM');

    }
    public setupForm(e: BOM): UntypedFormGroup {
        return this.#formBuilder.group({
            id:          [e.id],
            childId:     [e.childId, Validators.required],
            description: [e.description, Validators.required],
            from:        [e.from],
            to:          [e.to],
            version:     [e.version||1, Validators.required],
            updateMemo:  [e.updateMemo],
            updateDate:  [e.updateDate],
        })
    }

}
