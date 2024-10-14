import {Component, Input, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginationModel, PaginatorPersistenceService } from '@ss/common/api-common';
import {AssetAppointmentService} from '../services/asset-appointment.service';
import {of, switchMap} from 'rxjs';
import {ASSAppointment} from '../assets-api';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-asset-appointment-list',
    templateUrl: './asset-appointment-list.component.html',
    styleUrls: ['./asset-appointment-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,

        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]})
export class AssetAppointmentListComponent extends BaseChildEntityListComponent<ASSAppointment> {
    override displayedColumns = [
        'date',
        'number',
        'location',
        'beneficiary',
        'key'
    ];



    constructor(
        public entitySrv: AssetAppointmentService) {
        super(entitySrv, 'ASSAppointment');
    }

    @Input()
    set assetId(id: number) {
        this.entitySrv.setParentId(id);
        this.refresh();
    }

    openAppointment(id: number) {
        if (id > 0) {
            this.router.navigate(['../../asset-appointments', id], { relativeTo: this.route }).then();
        }
    }
}
