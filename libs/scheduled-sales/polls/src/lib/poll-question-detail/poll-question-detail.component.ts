import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatRadioModule, } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PollQuestion } from '@ss/scheduled-sales/api-scheduled-sales';
import { PollQuestionService } from '../poll-question.service';
import { AnswerTypes } from '@ss/scheduleds-sales/polls'

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
        TranslateDirective,
    ],
    templateUrl: './poll-question-detail.component.html',
    styleUrl: './poll-question-detail.component.css',
})
export class PollQuestionDetailComponent extends BaseEntityDetailComponent<PollQuestion> {
    private loginSrv = inject(LoginService);
    private PollQuestionSrv = inject(PollQuestionService);

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
            isUsed: [false],
            isBlocked: [false],
        });
    }

    public AnswerTypes = AnswerTypes;
}
