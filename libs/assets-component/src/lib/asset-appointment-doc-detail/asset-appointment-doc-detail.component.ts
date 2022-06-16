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
    AttributeLookupService,
    AttributesService
} from '@ss/custom-attributes';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {AssetAppointmentLineService} from '../asset-appointment-line.service';
import {AssetLookupModel} from '../asset-lookup-model';
import {AssetsService} from '../assets.service';

@Component({
  selector: 'ss-asset-appointment-doc-detail',
  templateUrl: './asset-appointment-doc-detail.component.html',
  styleUrls: ['./asset-appointment-doc-detail.component.scss']
})
export class AssetAppointmentDocDetailComponent extends BaseEntityDetailComponent<ASSAppointmentHeader>{
    selectedId = 0;
    detailData: AssetAppointmentLine[] = [];
    childAttributes: AttribTempl[] = [];
    inputControl = new FormControl();
    officeAutoCompleteModel  = new DefaultAutoCompleteModel(this.officeSrv);
    assetLookupModel         = new AssetLookupModel(this.assetSrv);
    attributeLookup          = new DefaultAutoCompleteModel(this.attribLookupSrv);
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
        private attribLookupSrv: AttributeLookupService,
        private loginSrv: LoginService,
        private detailSrv: AssetAppointmentLineService,
        private assetSrv: AssetsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_APPOINTMENTS');
        this.pagination.onChange = () => this.refresh();
    }

    public setupForm(b: ASSAppointmentHeader) {
        this.loginSrv
            .loadContext()
            .subscribe();
        this.attributeSrv.setParentId(ASSET_MODULE);
        this.detailSrv.setParentId(b.id || 0);
        this.attributeSrv
            .attributeList(ASSET_MODULE, ATTRIB_TYPE_LOOKUP)
            .pipe(tap(res => this.childAttributes = res),
                switchMap(_ => this.detailSrv.getList(0, 5)))
            .subscribe(res => {
                this.detailData = res.body;
                this.pagination.elementCount = res.itemCount;
            });
        const form = this.formBuilder.group({
            id:           [b.id],
            center:       [b.center || this.loginSrv.appCtx.center],
            serialNumber: [b.serialNumber],
            date:         [b.date, Validators.required],
            officeId:     [b.officeId],
            attribCode:   [b.attribCode],
            attribVal:    [b.attribVal],
        });

        const subs = form.controls['attribCode']
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
            ).subscribe(v => this.attribLookupSrv.setParentId(v || 0));
        this.subscriptions.push(subs);

        this.attribLookupSrv.setParentId(b?.attribCode || 0)
        return form;
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
}
