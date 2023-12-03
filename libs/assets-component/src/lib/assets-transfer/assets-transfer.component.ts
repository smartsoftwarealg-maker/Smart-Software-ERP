import { Component, inject, OnInit } from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {OfficeService} from '@ss/common/api-lookup';
import {OfficeAutoComplete} from '../assets-api';
import {OfficeSearchComponent} from '../office-search/office-search.component';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {AssetsTransferService} from '../services/assets-transfer.service';
import {IsParamService, UserRightsService} from '@ss/common/api-common';

@Component({
    selector: 'ss-assets-transfer',
    templateUrl: './assets-transfer.component.html',
    styleUrls: ['./assets-transfer.component.scss'],
})
export class AssetsTransferComponent implements OnInit {
    private fb =  inject(FormBuilder);
    private transferSrv =  inject(AssetsTransferService);
    private officeSrv =  inject(OfficeService);
    private dialog =  inject(MatDialog);
    private route =  inject(ActivatedRoute);
    private snackBarSrv =  inject(SnackBarService);
    private isParamSrv =  inject(IsParamService);
    private rightsSrv =  inject(UserRightsService);
    private router =  inject(Router);
    private activatedRoute =  inject(ActivatedRoute);

    private ASSET_TRANSFER = 'AssetTransfer';
    editable = false;
    isAQS   = false;
    srcLookup  = new OfficeAutoComplete(this.officeSrv);
    dstLookup  = new OfficeAutoComplete(this.officeSrv);
    form = this.fb.group({
        source: [0, Validators.required],
        destination: [0, Validators.required],
        sourceSite: [{ value: '', disabled: true }],
        sourceBuilding: [{ value: '', disabled: true }],
        destinationSite: [{ value: '', disabled: true }],
        destinationBuilding: [{ value: '', disabled: true }],
    });

    constructor(private shellSrv: ShellService) {}

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.isParamSrv.is('AQS').subscribe(res => this.isAQS = res);
        this.shellSrv.setTitle('ASSET_TRANSFER');
        this.editable = this.rightsSrv.getUserRights(this.ASSET_TRANSFER)?.write;
    }

    openSourceDlg() {
        const dialogRef = this.dialog.open(OfficeSearchComponent,
            {
                width: '600px',
                height: '540px',
                data: {id: 0, description: null}
            });

        dialogRef
            .afterClosed()
            .subscribe(off => {
                this.form.controls.source?.setValue(off?.id);
                this.form.get('sourceSite').setValue(off?.locationDescription, {onlySelf: true});
                this.form.get('sourceBuilding').setValue(off?.buildingDescription, {onlySelf: true});
            });
    }

    openDestinationDlg() {
        const dialogRef = this.dialog.open(OfficeSearchComponent,
            {
                width: '700px',
                height: '540px',
                data: {id: 0, description: null}
            });
        dialogRef
            .afterClosed()
            .subscribe(off => {
                this.form.controls.destination?.setValue(off?.id);
                this.form.get('destinationSite').setValue(off?.locationDescription, {onlySelf: true});
                this.form.get('destinationBuilding').setValue(off?.buildingDescription, {onlySelf: true});
            });
    }

    transfer() {
        this.transferSrv.
        transfer(this.form.controls.source.value, this.form.controls.destination.value)
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    this.form.reset();
                    if (res.id > 0) {
                        this.router.navigate(['../asset-appointments', res.id], { relativeTo: this.activatedRoute }).then();
                    }
                }
            });
    }

}
