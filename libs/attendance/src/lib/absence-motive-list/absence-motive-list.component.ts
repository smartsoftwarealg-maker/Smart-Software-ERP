import { Component } from '@angular/core';
import { BaseEntityDetailComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import { AbsenceMotiveService } from '../absence-motive.service';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-absence-motive-list',
    templateUrl: './absence-motive-list.component.html',
    styleUrls: ['./absence-motive-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
    ],
})
export class AbsenceMotiveListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public classSrv: AbsenceMotiveService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(classSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ATT_ABSENCE_MOTIVES');
        this.pagination.pageSize = 15;
    }

}

@Component({
    selector: 'ss-class-detail',
    template: `
        @if (form !== null) {
          <form novalidate [formGroup]="form">
            <mat-form-field class="value">
              <mat-label translate>COMMON_DESCRIPTION</mat-label>
              <input matInput formControlName="description" type="text" required autofocus>
            </mat-form-field>
            <mat-form-field class="value">
              <mat-label translate>COMMON_DESCRIPTION_AR</mat-label>
              <input matInput formControlName="descriptionAr" type="text">
            </mat-form-field>
          </form>
        }`,
    styles: [`
        .value {
            width: 300px;
            display: block;
            margin: auto;
        }

        form {
            width: 100%;
            padding-top: 16px;
            height: 100px;
            display: flex;
            flex-flow: column;
        }`],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput]
})
export class AbsenceMotiveDetailComponent extends BaseEntityDetailComponent<Lookup> {
    constructor(
        public classSrv: AbsenceMotiveService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(classSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ATT_ABSENCE_MOTIVES');
    }

    public override setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}
