import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Service } from '../service-article-api';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ClassService, LookupsService } from '@ss/common/api-lookup';
import { ServiceArticleService } from '../service-article.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';


import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-service-article-detail',
    standalone: true,
    imports: [
        CommonModule,
        TranslateDirective,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        UiAutoCompleteComponent
    ],
    templateUrl: './service-article-detail.component.html',
    styleUrls: ['./service-article-detail.component.css']
})
export class ServiceArticleDetailComponent extends BaseEntityDetailComponent<Service>{
    private lookupsSrv = inject(LookupsService);
    private classSrv =  inject(ClassService);
    private fb = inject(FormBuilder);

    classLookup = new DefaultAutoCompleteModel(this.classSrv);
    vats = this.lookupsSrv.getVats();

    constructor(
        public articleSrv: ServiceArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(articleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_ARTICLES');
    }


    setupForm(a: Service): UntypedFormGroup {
        return this.fb.group({
            description2:   [a.description2, Validators.required],
            id:             [a.id],
            klass:          [a.klass],
            reference:      [a.reference, Validators.required],
            appId:          [a.appId || this.articleSrv.getParentId()],
            notForSale:     [a.notForSale || false, Validators.required],
            price1:         [a.price1],
            vat:            [a.vat],
            recordBlocked:  [a.recordBlocked || false],
            blockingReason: [a.blockingReason]
        });
    }

}
