import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Class, ClassService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule } from '@ss/common/api-common';
import { MatCard } from '@angular/material/card';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { AccountService } from '@ss/accounting/api-accounts';
import { ClassAccountsLineService } from '../class-accounts.service';

@Component({
    selector: 'ss-class-detail',
    templateUrl: './class-accounts-detail.component.html',
    styleUrl: './class-accounts-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        RouterOutlet,
    ],
})
export class ClassAccountsDetailComponent extends BaseEntityDetailComponent<Class> {
    private accountSrv = inject(AccountService);
    private accountClassLineSrv = inject(ClassAccountsLineService);

    accountLookupModel = new DefaultAutoCompleteModel(
        this.accountSrv,
        'id',
        'description',
    );

    override ngOnInit() {
        this.saveButton.visible = false;
        super.ngOnInit();
    }

    constructor(
        public classSrv: ClassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            classSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'COMMON_EDIT_CLASS',
        );
    }

    public override setupForm(e: Class): UntypedFormGroup {
        this.accountClassLineSrv.setParentId(e.id);
        return this.formBuilder.group({
            id:            [e.id],
            description:   [{ value: e.description, disabled: true }, Validators.required ],
            descriptionAr: [e.descriptionAr],
            accountno:     [{ value: e.accountno, disabled: true}]
        });
    }
}
