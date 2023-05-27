import { Component } from '@angular/core';
import { BaseEntityDetailComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import { AbsenceMotiveService } from '../absence-motive.service';

@Component({
    selector: 'ss-absence-motive-list',
    templateUrl: './absence-motive-list.component.html',
    styleUrls: ['./absence-motive-list.component.scss'],
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
        <form *ngIf="form !== null" novalidate [formGroup]="form">
        <mat-form-field class="value">
            <mat-label translate>COMMON_DESCRIPTION</mat-label>
            <input matInput formControlName="description" type="text" required autofocus>
        </mat-form-field>

        <mat-form-field class="value">
            <mat-label translate>COMMON_DESCRIPTION_AR</mat-label>
            <input matInput formControlName="descriptionAr" type="text">
        </mat-form-field>
      </form>`,
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
        }`]
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
