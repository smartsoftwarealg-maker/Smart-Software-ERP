import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ASSAppointmentHeader, AssetAppointmentLine} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService, OfficeService} from '@ss/common/api-lookup';
import {AssetAppointmentDocService} from '../asset-appointment-doc.service';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {
    ASSET_MODULE,
    ATTRIB_TYPE_LOOKUP,
    AttribTempl,
    AttributesService
} from '@ss/custom-attributes';
import {switchMap} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AssetAppointmentLineService} from '../asset-appointment-line.service';
import {AssetLookupModel} from '../asset-lookup-model';
import {AssetsService} from '../assets.service';
import {Agent, ConsumerService} from '@ss/logistics/api-agent';
import {OfficeSearchComponent} from '../office-search/office-search.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'ss-asset-appointment-doc-detail',
  templateUrl: './asset-appointment-doc-detail.component.html',
  styleUrls: ['./asset-appointment-doc-detail.component.scss']
})
export class AssetAppointmentDocDetailComponent extends BaseEntityDetailComponent<ASSAppointmentHeader>{
    requesterLookup   = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    editMode = false;
    activity: string = 'todo';
   // public beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    selectedId = 0;
    detailData: AssetAppointmentLine[] = [];
    childAttributes: AttribTempl[] = [];
    inputControl = new FormControl();
    officeAutoCompleteModel  = new DefaultAutoCompleteModel(this.officeSrv);
    assetLookupModel         = new AssetLookupModel(this.assetSrv);
    // attributeLookup          = new DefaultAutoCompleteModel(this.attribLookupSrv);
    pagination               = PaginationModel.newInstance();
    displayedColumns         = ['reference', 'description',];

    constructor(
        public override entitySrv: AssetAppointmentDocService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private officeSrv: OfficeService,
        private attributeSrv: AttributesService,
        // private attribLookupSrv: AttributeLookupService,
        private loginSrv: LoginService,
        private detailSrv: AssetAppointmentLineService,
        private consumerSrv: ConsumerService,
        private dialog: MatDialog,
        private assetSrv: AssetsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_APPOINTMENTS');
        this.pagination.onChange = () => this.refresh();
        this.beneficiaryLookup.onObjectSelected = e => this.activity = e.activityDescription;
    }

    public setupForm(b: ASSAppointmentHeader) {
        this.editMode = b.id != 0;
        this.activity = b?.activity;
        this.attributeSrv.setParentId(ASSET_MODULE);
        this.detailSrv.setParentId(b.id || 0);
        this.attributeSrv
            .attributeList(ASSET_MODULE, ATTRIB_TYPE_LOOKUP)
            .pipe(tap(res => this.childAttributes = res),
                switchMap(_ => this.loginSrv.loadContext()),
                switchMap(_ => this.detailSrv.getList(0, 5)))
            .subscribe(res => {
                this.detailData = res.body;
                this.pagination.elementCount = res.itemCount;
            });

        const form = this.formBuilder.group({
            id:            [b.id],
            center:        [b.center || this.loginSrv.appCtx.center],
            serialNumber:  [{ value: b.serialNumber || 1, disabled: true }],
            date:          [b.date, Validators.required],
            officeId:      [b.officeId, Validators.required],
            requesterId:   [b.requesterId],
            requestDate:   [b.requestDate],
            requestNumber: [b.requestNumber],
            beneficiaryId: [b.beneficiaryId],
            reappointment: [b.reappointment || false, Validators.required],
        });

        return form;
    }

    override readForm(): ASSAppointmentHeader {
        const value = super.readForm();
        value.serialNumber = 1;
        return value;
    }

    override ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        super.ngOnDestroy();
    }

    select(row: AssetAppointmentLine) {
        this.selectedId = row?.id || null;

       this.inputControl.setValue(row?.assetId || 0);
    }

    addAsset() {
        this.inputControl.setValue(null, {onlySelf: true});
        this.inputControl.reset();
        this.selectedId = 0;
    }

    deleteAsset() {
        const row = <AssetAppointmentLine>this.inputControl.value
        if (row) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(b => b? this.detailSrv.remove(this.selectedId): of(b)),
                    switchMap(b => typeof b === 'boolean'? of(b): this.detailSrv.getList(this.pagination.page - 1, this.pagination.pageSize)),
                    tap(res => {
                        if (typeof res !== 'boolean') {
                            this.detailData = res.body;
                            this.pagination.elementCount = res.itemCount;
                        }
                    }))
                .subscribe(res => {
                    if (typeof res !== 'boolean') {
                        this.snackBarSrv.showSuccessMessage();
                    }
                })
        }
    }

    saveAsset() {
        const assetId = this.inputControl.value;
        if (this.id && assetId) {
            this.detailSrv
                .save({ id: 0, assetId: assetId, appointmentId: this.id})
                .pipe(switchMap(res => this.detailSrv.getList(this.pagination.page - 1, this.pagination.pageSize)))
                .subscribe(res => {
                    this.detailData = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }

    private refresh() {
        this.detailSrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.detailData = res.body;
                this.pagination.elementCount = res.itemCount;
            })
    }

    openSearchDlg() {
        const dialogRef = this.dialog.open(OfficeSearchComponent,
            {
                data: {id: 0, description: null}
            });
        dialogRef
            .afterClosed()
            .subscribe(res => this.form.controls['officeId']?.setValue(res?.id));
    }
}
