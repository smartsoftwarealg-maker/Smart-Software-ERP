import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { TranslateDirective } from '@ss/common/ui-lang';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { ElementsInfoService } from '@ss/remuneration/elementsinfo';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ABSENCE_FIELDS_URL, AbsenceFiled } from '../attendance-api';
import { AbsenceFieldsService } from '../absence-fields.service';
import { HttpService } from '@ss/common/api-common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ss-absence-fields',
    templateUrl: './absence-fields.component.html',
    styleUrls: ['./absence-fields.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatFormField,
        ReactiveFormsModule,
        TranslateDirective,
        MatLabel,
        UiAutoCompleteComponent,
        MatButton,
    ],
})
export class AbsenceFieldsComponent implements OnInit {
    private elementSrv = inject(ElementsInfoService);
    private shellSrv = inject(ShellService);
    private snackBarSrv = inject(SnackBarService);
    private httpSrv = inject(HttpService);
    private route = inject(ActivatedRoute);
    private formBuilder = inject(UntypedFormBuilder);
    private absenceSrv = inject(AbsenceFieldsService);
    public form: UntypedFormGroup | null;
    escapeElementLookup = new DefaultAutoCompleteModel(
        this.elementSrv,
        'field',
        'description',
    );
    absenceElementLookup = new DefaultAutoCompleteModel(
        this.elementSrv,
        'field',
        'description',
    );
    latenessElementLookup = new DefaultAutoCompleteModel(
        this.elementSrv,
        'field',
        'description',
    );

    ngOnInit(): void {
        this.shellSrv.setTitle('ATT_ABSENCE_FIELDS');
        this.shellSrv.setGoBackPath('../..', this.route);
        this.absenceSrv
            .absenceFields()
            .subscribe({
                next: (data) => {
                    this.form = this.setupForm(data);
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    public setupForm(b: AbsenceFiled): UntypedFormGroup {
        return this.formBuilder.group({
            id:              [b.id],
            escapeElement:   [b.escapeElement, Validators.required],
            absenceElement:  [b.absenceElement, Validators.required],
            latenessElement: [b.latenessElement, Validators.required],
        });
    }

    public save() {
        this.shellSrv.setLoading(true);
        const obs = this.httpSrv.put(
            ABSENCE_FIELDS_URL,
            this.form.getRawValue(),
        );
        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.snackBarSrv.showSuccessMessage();
                this.shellSrv.goBack();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                throw err;
            },
        });
    }
}
