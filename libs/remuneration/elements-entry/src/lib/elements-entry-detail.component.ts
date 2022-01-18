import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ELine} from './elements-entry-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {ElementsEntryService} from './elements-entry.service';
import {MatSelectChange} from '@angular/material/select';
import {ImageModel} from '@ss/common/ui-image-input';
import {HttpService} from '@ss/common/api-common';
import {EmployeeService} from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-elements-entry-detail',
    templateUrl: './elements-entry-detail.component.html',
    styleUrls: ['./elements-entry-detail.component.scss', './common-css.scss']
})
export class ElementsEntryDetailComponent extends BaseEntityDetailComponent<ELine> {
    imageModel: ImageModel;

    constructor(
        public infoSrv: ElementsEntryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private httpSrv: HttpService,
        private employeeSrv: EmployeeService,) {
        super(infoSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'REMUN_ELEMENTS_ENTRY');
        this.imageModel = new ImageModel(this.httpSrv);
    }

    ngOnInit() {
        super.ngOnInit();
        this.infoSrv.load();
    }

    public setupForm(e: ELine): FormGroup {
        // this.shellSrv.setLoading(false);
        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(e.id), false);
        return this.formBuilder.group({
            id: [e.id],
            firstName: [e.firstName || 'first name'],
            lastName: [e.lastName],
            post: [e.post],
            elements: this.formBuilder.array(e.elements)
        });
    }

    get elementsForm(): FormArray {
        return this.form.controls['elements'] as FormArray;
    }

    selectInput(ev: MatSelectChange) {
        this.infoSrv.selectedInput = ev.value;
        this.infoSrv.loadDataCols();
        this.load();
    }

    setSelectionMode(mode: number) {
        this.infoSrv.selectionMode = mode === 2? 2 : 1;
        this.infoSrv.loadDataCols();
        this.load();
    }

    readForm(): ELine {
        const data = super.readForm();
        data.cols = this.infoSrv.colsString();
        return data;
    }
}
