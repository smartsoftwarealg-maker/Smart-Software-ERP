import {Component, effect, inject} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IsParamService, LanguageService, MaterialModule} from '@ss/common/api-common';
import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ArticleTypeService, Lookup } from '@ss/common/api-lookup';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'ss-article-type-detail',
    templateUrl: 'article-types-detail.html',
    styleUrls: ['article-types-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput]
})
export class ArticleTypeDetailComponent extends BaseEntityDetailComponent<Lookup> {
    #langSrv = inject(LanguageService);
    #isParamSrv = inject(IsParamService);
    isGICA = toSignal(this.#isParamSrv.is('SODISMAC'));
    effect_ = effect(() => {
        if (this.isGICA()) {
            this.shellSrv.setTitle(this.#langSrv.translate('STOCK_GICA_SUBCLASSES'));
        }
    });

    constructor(
        public markSrv: ArticleTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(markSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_TYPES');
    }

    public override setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}

