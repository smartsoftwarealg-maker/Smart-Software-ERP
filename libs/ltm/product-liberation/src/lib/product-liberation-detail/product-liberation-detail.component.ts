import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import {
    LTMProductLiberation,
    LtmProductLiberationLineService,
    LtmProductLiberationService,
} from '@ltm/ltm-api';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-product-liberation-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatCard,
        MatFormField,
        MatInput,
        MatLabel,
        MaterialModule,
        ReactiveFormsModule,
        RouterOutlet,
        TranslateDirective,
        DatePickerComponent,

    ],
    templateUrl: './product-liberation-detail.component.html',
    styleUrl: './product-liberation-detail.component.scss',
})
export class ProductLiberationDetailComponent extends BaseEntityDetailComponent<LTMProductLiberation> {
    #activatedRoute = inject(ActivatedRoute);
    #router = inject(Router)
    #loginSrv = inject(LoginService);
    #liberationLineSrv = inject(LtmProductLiberationLineService);

    constructor(
        public override entitySrv: LtmProductLiberationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'LTM_PRODUCT_LIBERATION',
        );
    }

    public override setupForm(b: LTMProductLiberation): UntypedFormGroup {
        return this.formBuilder.group({
            id:          [b.id],
            description: [b.description, Validators.required],
            centerId:    [b.centerId || this.#loginSrv.appCtx.center],
            date:        [b.date || new Date(), Validators.required],
        });
    }

    override loadEntity(id: number): Observable<LTMProductLiberation> {
        this.#liberationLineSrv.setParentId(id);
        return super.loadEntity(id);
    }

    protected override goBack() {
        if (!this.form?.controls['id'].value) {
            this.#router.navigate(['..', this.queryId], {relativeTo: this.#activatedRoute}).then();
        } else {
            super.goBack();
        }
    }
}
