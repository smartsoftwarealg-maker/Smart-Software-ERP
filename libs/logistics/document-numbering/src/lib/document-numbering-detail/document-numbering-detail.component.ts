import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LDocument} from '../document-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DocumentNumberingService} from '../document-numbering.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {DefinitionLookupService} from '../definition-lookup.service';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-document-numbering-detail',
    templateUrl: './document-numbering-detail.component.html',
    styleUrls: ['./document-numbering-detail.component.scss']
})
export class DocumentNumberingDetailComponent extends BaseEntityDetailComponent<LDocument> implements OnInit {
    documentAutoCompleteModel = new DefaultAutoCompleteModel(this.definitionSrv);

    constructor(
        private docSrv: DocumentNumberingService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public definitionSrv: DefinitionLookupService,
        private loginSrv: LoginService) {
        super(docSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'LOGISTICS_DOCUMENT_NUMBERING');
    }

    public setupForm(e: LDocument): FormGroup {
        return this.formBuilder.group({
            id: [e.id],
            centerId: [e.centerId || this.loginSrv.appCtx.center],
            code: [e.code, Validators.required],
            startNumber: [e.startNumber, Validators.required],
            footer: [e.footer],
            lock_on_print: [e.lock_on_print || false, Validators.required],
        });
    }
}
