import { Component, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ELine } from '../elements-entry-api';
import { ImageModel } from '@ss/common/ui-image-input';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LookupsService } from '@ss/common/api-lookup';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { FixedElementsEntryService } from './fixed-elements-entry.service';
import { EmployeeService } from "@ss/employee-services/employee-services";

type Employee = {
    id: number;
    fullName: string;
    post?: string;
    imageModel: ImageModel;
}

@Component({
    selector: 'ss-fixed-elements-detail',
    templateUrl: './fixed-elements-detail.component.html',
    styleUrls: ['./fixed-elements-detail.component.scss']
})
export class FixedElementsDetailComponent extends BaseEntityDetailComponent<ELine> {
    imageModel: ImageModel;
    employee: Employee = null;

    constructor(
        public infoSrv: FixedElementsEntryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private httpSrv: HttpService,
        private employeeSrv: EmployeeService) {
        super(infoSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'REMUN_ELEMENTS_ENTRY');
        this.imageModel = new ImageModel(this.httpSrv);
    }


    override preload(): Observable<any> {
        return this.infoSrv.load();
    }

    public override setupForm(e: ELine): UntypedFormGroup {
        if (e.elements.length == 0) {
            e.elements = this.infoSrv.colsList().map(_ => 0.0);
        }
        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(e.id), false);
        this.employee = {
            id: e.id,
            fullName: e.firstName + ' ' + e.lastName,
            post: e.post,
            imageModel: this.imageModel
        };
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


    override readForm(): ELine {
        const data = super.readForm();
        data.cols = this.infoSrv.colsString();
        return data;
    }
}

