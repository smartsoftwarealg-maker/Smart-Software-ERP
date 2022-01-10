import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ElementsInfo} from './elements-info-api';
import {UserListService} from '@ss/common/api-users';
import {LoginService, UserService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {ElementsInfoService} from './elements-info.service';

@Component({
  selector: 'ss-elements-info-detail',
  templateUrl: './elements-info-detail.component.html',
  styleUrls: ['./elements-info-detail.component.scss']
})
export class ElementsInfoDetailComponent extends BaseEntityDetailComponent<ElementsInfo> {

    constructor(
        private detailSrv: ElementsInfoService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_ELEMENTSINFO');
    }

    setupForm(e: ElementsInfo): FormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            field: [e.field || 'e???'],
            descriptionAr: [e.descriptionAr],
            fixed: [e.fixed || false],
            collective: [e.collective || false],
            gridComputed: [e.gridComputed || false],
            postComputed: [e.postComputed || false],
            minValue: [e.minValue || 0.0],
            maxValue: [e.maxValue || 0.0],
            fieldType: [e.fieldType || 1]
        });
    }
}
