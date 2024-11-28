import {Component, Input, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginationModel, PaginatorPersistenceService } from '@ss/common/api-common';
import {AssetAppointmentService} from '../services/asset-appointment.service';
import {of, switchMap} from 'rxjs';
import {ASSAppointment} from '../assets-api';
import { CommonModule } from '@angular/common';



import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';

import { QRCodeModule } from 'angularx-qrcode';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-asset-appointment-list',
    templateUrl: './asset-appointment-list.component.html',
    styleUrls: ['./asset-appointment-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,

        QRCodeModule,
        PaginationComponent
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
