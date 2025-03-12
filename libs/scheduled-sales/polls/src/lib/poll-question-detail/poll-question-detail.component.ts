import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';

import {
    MatError,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    MatRadioButton,
    MatRadioGroup,
    MatRadioModule,
} from '@angular/material/radio';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Lookup } from '@ss/common/api-lookup';
import { PollQuestion, SalesPoll } from '@ss/scheduled-sales/api-scheduled-sales';
import { PollQuestionService } from '../poll-question.service';
import { AnswerTypes } from '../poll-question-list/poll-question-list.component';

@Component({
    selector: 'sch-poll-question-detail',
    standalone: true,
    imports: [
        CommonModule,
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
        TranslateDirective,
        DatePickerComponent,
        TranslatePipe,
    ],
    templateUrl: './poll-question-detail.component.html',
    styleUrl: './poll-question-detail.component.css',
})
export class PollQuestionDetailComponent extends BaseEntityDetailComponent<PollQuestion> {
    private loginSrv = inject(LoginService);
    private PollQuestionSrv = inject(PollQuestionService);
    complaintLookup = new DefaultAutoCompleteModel(this.PollQuestionSrv);

    constructor(
        public override entitySrv: PollQuestionService,
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
            'SCH_POLL_QUESTION',
        );
        // this.complaintLookup.onObjectSelected = (e) =>
        //     this.updateTypeRequirement(e);
    }

    public override setupForm(b: PollQuestion) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description],
            descriptionAr: [b.descriptionAr],
            descriptionEn: [b.descriptionEn],
            answerType: [b.answerType],
            showMemo: [b.showMemo],
        });
    }

    public AnswerTypes = AnswerTypes;
}
