import { Component, inject, OnInit } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ASSAppointmentHeader, AssetAppointmentLine} from '../assets-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService, Office, OfficeService} from '@ss/common/api-lookup';
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
import {Observable, of} from 'rxjs';
import {AssetAppointmentLineService} from '../asset-appointment-line.service';
import {AssetLookupModel} from '../asset-lookup-model';
import {AssetsService} from '../assets.service';
import {Agent, ConsumerService} from '@ss/logistics/api-agent';
import {OfficeSearchComponent} from '../office-search/office-search.component';
import {MatDialog} from '@angular/material/dialog';
import {WorkflowDialogComponent} from '@ss/workflow';

@Component({
  selector: 'ss-asset-appointment-doc-detail',
  templateUrl: './asset-appointment-doc-detail.component.html',
  styleUrls: ['./asset-appointment-doc-detail.component.scss']
})
export class AssetAppointmentDocDetailComponent extends BaseEntityDetailComponent<ASSAppointmentHeader>{
    private officeSrv = inject(OfficeService);
    private attributeSrv = inject(AttributesService);
    private loginSrv = inject(LoginService);
    private detailSrv = inject(AssetAppointmentLineService);
    private consumerSrv = inject(ConsumerService);
    private assetSrv = inject(AssetsService);
    private sendBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-envelope',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_SEND_MESSAGE',
        visible: true,
        click: () => this.sendMessage(),
    }
    requesterLookup   = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    editMode = false;
    activity: string = 'todo';
   // public beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    selectedId = 0;
    selectedRow: AssetAppointmentLine = null;
    detailData: AssetAppointmentLine[] = [];
    childAttributes: AttribTempl[] = [];
    inputControl = new UntypedFormControl();
    officeAutoCompleteModel  = new DefaultAutoCompleteModel(this.officeSrv);
    assetLookupModel         = new AssetLookupModel(this.assetSrv);
    // attributeLookup          = new DefaultAutoCompleteModel(this.attribLookupSrv);
    pagination       = PaginationModel.newInstance();
    displayedColumns        = ['reference', 'description', 'key'];
    geoLocation = ''

    constructor(
        public override entitySrv: AssetAppointmentDocService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        // private attribLookupSrv: AttributeLookupService,
        private router: Router,
        private dialog: MatDialog) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_APPOINTMENTS');
        this.pagination.onChange = () => this.refresh();
        this.beneficiaryLookup.onObjectSelected = e => this.activity = e.activityDescription;
        this.officeAutoCompleteModel.onObjectSelected = o => this.onOfficeChange(o);
        this.assetLookupModel.onObjectSelected = o => this.geoLocation = o?.geolocation;
    }

    public override setupForm(b: ASSAppointmentHeader) {
        this.editMode = b.id != 0;
        this.activity = b?.activity;
        this.attributeSrv.setParentId(ASSET_MODULE);
        this.detailSrv.setParentId(b.id || 0);
        if (this.isEditable) {
            this.shellSrv.addButton(this.sendBtn);
        }
        this.isEditable = this.sendBtn.visible = this.saveButton.visible = this.isEditable && (!b.validated || this.loginSrv.appCtx.manager);
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
            serialNumber:  [{ value: b.serialNumber || 1, disabled: false }],
            date:          [b.date || new Date(), Validators.required],
            officeId:      [b.officeId, Validators.required],
            requesterId:   [b.requesterId],
            requestDate:   [b.requestDate || new Date()],
            requestNumber: [b.requestNumber],
            beneficiaryId: [b.beneficiaryId],
            reappointment: [b.reappointment || false, Validators.required],
            site:          [{ value: b.site, disabled: true }],
            building:      [{ value: b.building, disabled: true }],
            creatorName:   [{ value: b.creatorName, disabled: true }],
            modifierName:  [{ value: b.modifierName, disabled: true }],
        });
        return form;
    }

    override readForm(): ASSAppointmentHeader {
        const value = super.readForm();
        value.serialNumber = value.serialNumber || 1;
        return value;
    }


    select(row: AssetAppointmentLine) {
        this.selectedId = row?.id || null;
        this.selectedRow = row;
       // this.inputControl.setValue(row?.assetId || 0);
    }

    deleteAsset() {
        const row = this.selectedRow;
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
                    this.inputControl.setValue(null, {onlySelf: true});
                    this.inputControl.reset();
                    this.selectedId = 0;
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
            .subscribe((res: Office) => {
                this.form.controls['officeId']?.setValue(res?.id);
                this.form.get('site').setValue(res?.locationDescription, {onlySelf: true});
                this.form.get('building').setValue(res?.buildingDescription, {onlySelf: true});
            });
    }

    onOfficeChange(off: Office) {
        this.form.get('site').setValue(off.locationDescription, {onlySelf: true});
        this.form.get('building').setValue(off.buildingDescription, {onlySelf: true});
    }

    public override save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const site = this.form.get('site').value;
        const building = this.form.get('building').value;
        let val: ASSAppointmentHeader = this.readForm();
        val.id = this.id;
        val.site = site;
        val.building = building;
        this.shellSrv.setLoading(true);
        const obs: Observable<any> = val.id === 0
            ? this.entitySrv
                .add(val)
                .pipe(switchMap(i => { this.id = i; this.detailSrv.setParentId(i); return this.entitySrv.get(i); }),
                      tap(v => { val.id = v.id; val.serialNumber = v.serialNumber; }))
            : this.entitySrv.update(val);
        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.form?.reset(val);
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
                this.editMode = true;
            },
            error: err => {
                this.shellSrv.setLoading(false);
                this.snackBarSrv.showFailureMessage();
                this.form?.reset(val);
                throw err;
            }
        })
    }

    openAsset(id: number) {
        if (id > 0) {
            this.router.navigate(['../../assets', id], { relativeTo: this.route });
        }
    }

    private sendMessage() {
        if (!this.sendBtn.disabled) {
            const id = this.form.controls['id'].value;
            const dialogRef = this.dialog.open(WorkflowDialogComponent, {
                width: '350px',
                height: '400px',
                data: { assetAppointmentId: id, senderId: this.loginSrv.appCtx.id }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['message']) {
                    this.snackBarSrv.showSuccessMessage();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
        }
    }
}
