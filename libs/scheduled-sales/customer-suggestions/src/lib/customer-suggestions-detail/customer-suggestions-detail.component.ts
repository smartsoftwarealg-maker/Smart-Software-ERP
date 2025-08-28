import { Component, inject } from '@angular/core';

import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CustomerSuggestion } from '../customer-suggestion.class';
import { CustomerSuggestionsService } from '../customer-suggestion.service';
import { SuggestionTypeService } from '../suggestion-type.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Lookup } from '@ss/common/api-lookup';
import { Agent, AgentService } from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-customer-suggestions-detail',
    standalone: true,
    imports: [
    MaterialModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MaterialModule,
    ReactiveFormsModule,
    UiAutoCompleteComponent,
    TranslateDirective
],
    templateUrl: './customer-suggestions-detail.component.html',
    styleUrl: './customer-suggestions-detail.component.scss',
})
export class CustomerSuggestionsDetailComponent extends BaseEntityDetailComponent<CustomerSuggestion> {
    private agentSrv = inject(AgentService);
    private loginSrv = inject(LoginService);
    private suggestionTypeSrv = inject(SuggestionTypeService);

    suggestionLookup = new DefaultAutoCompleteModel(this.suggestionTypeSrv);
    public agentLookup = new DefaultAutoCompleteModel<Agent>(
        this.agentSrv,
        'id',
        'denomination',
    );

    constructor(
        public override entitySrv: CustomerSuggestionsService,
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
            'COMMON_SUGGESTIONS',
        );
        this.suggestionLookup.onObjectSelected = (e) =>
            this.updateTypeRequirement(e);
    }

    public override setupForm(b: CustomerSuggestion) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            centerId: [
                {
                    value: b.centerId || this.loginSrv.appCtx.center,
                    disabled: true,
                },
            ],
            agentId: [b.agentId || this.loginSrv.appCtx.agentId],
            suggestionId: [
                {
                    value: b.suggestionId,
                    disabled: this.loginSrv.appCtx.id > 0,
                },
                Validators.required,
            ],
            suggestionType: [
                {
                    value: b.suggestionType,
                    disabled: this.loginSrv.appCtx.id > 0,
                },
            ],
            suggestion: [
                {
                    value: b.suggestion,
                    disabled: this.loginSrv.appCtx.id > 0,
                },
                Validators.required,
            ],
            answer: [
                { value: b.answer, disabled: this.loginSrv.appCtx.id < 1 },
            ],
            agentDescription: [{ value: b.agentDescription, disabled: true }],
        });
    }

    override readForm(): CustomerSuggestion {
        const value = this.form.getRawValue();
        value.suggestionType = +value.suggestionType;
        return value;
    }

    private updateTypeRequirement(e: Lookup) {
        const ctrl = this.form?.controls['suggestionType'];
        if (ctrl && e) {
            if (e.id === 1) {
                ctrl.clearValidators();
            } else {
                ctrl.setValidators(Validators.required);
            }
            ctrl.updateValueAndValidity();
        }
    }
}
