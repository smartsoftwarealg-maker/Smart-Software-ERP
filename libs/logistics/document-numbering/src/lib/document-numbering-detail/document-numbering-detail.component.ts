import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LDocument} from '../document-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DocumentNumberingService} from '../document-numbering.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {DefinitionLookupService} from '../definition-lookup.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-document-numbering-detail',
    templateUrl: './document-numbering-detail.component.html',
    styleUrls: ['./document-numbering-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, UiAutoCompleteComponent, MatInput, MatError]
})
export class DocumentNumberingDetailComponent extends BaseEntityDetailComponent<LDocument> implements OnInit {
    private definitionSrv = inject(DefinitionLookupService);
    private loginSrv  = inject(LoginService);
    documentAutoCompleteModel = new DefaultAutoCompleteModel(this.definitionSrv);

    constructor(
        private docSrv: DocumentNumberingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(docSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'LOGISTICS_DOCUMENT_NUMBERING');
    }

    public override setupForm(e: LDocument): UntypedFormGroup {
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
