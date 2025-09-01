import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule, FormBuilder
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { CRMTeamMember } from '../crm-teams-api.class';
import { TeamsLineService } from '../teams-line.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';

@Component({
    selector: 'ss-crm-teams-lines-detail',
    templateUrl: 'crm-teams-lines-detail.component.html',
    styleUrl: 'crm-teams-lines-detail.component.scss',
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
        TranslatePipe,
        UiAutoCompleteComponent
    ]
})
export class CrmTeamsLinesDetailComponent extends BaseChildEntityDetailComponent<CRMTeamMember> {
    private formBuilder = inject(FormBuilder);
    #usersSrv = inject(UserListService);
    usersLookup = new DefaultAutoCompleteModel(this.#usersSrv);
    constructor(
        public override entitySrv: TeamsLineService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute
    ) {
        super(
            entitySrv,
            'CRM_TEAMS_DETAIL'
        );
    }

    public override setupForm(e: CRMTeamMember): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            userId: [e.userId, Validators.required],
            parentId: [e.parentId || this.entitySrv.getParentId()],
        });
    }

}
