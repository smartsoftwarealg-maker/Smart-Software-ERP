import { Component, inject } from '@angular/core';

import { ConsolidationCenterService } from '../services/consolidation-center.service';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConsolidationCenter } from '../services/consolidation-api';
import { UserListService } from '@ss/common/api-users';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LookupsService } from '@ss/common/api-lookup';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CenterService } from '@ss/administration/api-center';

@Component({
    selector: 'ss-consolidation-centers-detail',
    imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MaterialModule,
    ReactiveFormsModule,
    TranslateDirective,
    UiAutoCompleteComponent
],
    templateUrl: './consolidation-centers-detail.component.html',
    styleUrl: './consolidation-centers-detail.component.scss',
    providers: [ConsolidationCenterService]
})
export class ConsolidationCentersDetailComponent extends BaseEntityDetailComponent<ConsolidationCenter> {
    #loginSrv = inject(LoginService);
    #centerSrv = inject(CenterService);

    centerLookup = new DefaultAutoCompleteModel(this.#centerSrv);

    constructor(
        public userListSrv: ConsolidationCenterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(userListSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ACC_CONSOLIDATION_CENTERS');
        this.#centerSrv.setParentId(this.#loginSrv.appCtx.company||0);
    }

    override setupForm(e: ConsolidationCenter): UntypedFormGroup {
        return this.formBuilder.group({
            id:          [e.id, Validators.required],
            percentage:  [e.percentage||100, Validators.required],
            headquarter: [e.headquarter||false, Validators.required],
            newRecord:   [e.id === 0]
        });
    }

}
