import { Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ElementType} from './element-type';
import {ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {ElementTypesService} from './element-types.service';
import {ElementInfoLookupModel} from './element-info-lookup-model';
import {HttpService} from '@ss/common/api-common';

@Component({
  selector: 'ss-element-types-detail',
  templateUrl: './element-types-detail.component.html',
  styleUrls: ['./element-types-detail.component.scss']
})
export class ElementTypesDetailComponent extends BaseEntityDetailComponent<ElementType> {
    infoLookupModel = new ElementInfoLookupModel(new ElementsInfoService(this.httpSrv));

    constructor(
        private infoSrv: ElementTypesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private httpSrv: HttpService) {
        super(infoSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_ELEMENT_TYPE');
    }

    setupForm(e: ElementType): FormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            fieldId: [e.fieldId],
        });
    }

}
