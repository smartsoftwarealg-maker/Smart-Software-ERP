import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ELine} from '../elements-entry-api';
import {ImageModel} from '@ss/common/ui-image-input';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {HttpService} from '@ss/common/api-common';
import {EmployeeService} from '@ss/payroll/api-employee';
import {Observable} from 'rxjs';
import {FixedElementsEntryService} from './fixed-elements-entry.service';

@Component({
  selector: 'ss-fixed-elements-detail',
  templateUrl: './fixed-elements-detail.component.html',
  styleUrls: ['./fixed-elements-detail.component.scss', '../common-css.scss']
})
export class FixedElementsDetailComponent extends BaseEntityDetailComponent<ELine> {
    imageModel: ImageModel;

    constructor(
        public infoSrv: FixedElementsEntryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
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


    preload(): Observable<any> {
        return this.infoSrv.load();
    }

    public setupForm(e: ELine): UntypedFormGroup {
        if (e.elements.length ==0) {
            e.elements = this.infoSrv.colsList().map(_ => 0.0);
        }
        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(e.id), false);
        return this.formBuilder.group({
            id: [e.id],
            firstName: [e.firstName || 'first name'],
            lastName: [e.lastName],
            post: [e.post],
            elements: this.formBuilder.array(e.elements)
        });
    }

    get elementsForm(): UntypedFormArray {
        return this.form.controls['elements'] as UntypedFormArray;
    }


    readForm(): ELine {
        const data = super.readForm();
        data.cols = this.infoSrv.colsString();
        return data;
    }
}

