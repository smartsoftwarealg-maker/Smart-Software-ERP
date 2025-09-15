import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '@ss/common/api-common';
import { OptionService } from '@ss/logistics/ui-options';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import {
    Validators,
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';
import {ActivatedRoute} from "@angular/router";
import {switchMap, takeWhile, tap, timer} from "rxjs";

interface EvalDocument {
    id: number;
    name: string;
}

@Component({
    selector: 'ss-document-recalculation',
    templateUrl: './document-recalculation.component.html',
    styleUrls: ['./document-recalculation.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        DatePickerComponent,
        MatButton,
        TranslatePipe,
        TranslateDirective,
    ],
})
export class DocumentRecalculationComponent implements OnInit {
    #optionSrv = inject(OptionService);
    #shellSrv = inject(ShellService);
    #formBuilder = inject(FormBuilder);
    #snackBarSrv = inject(SnackBarService);
    #route = inject(ActivatedRoute);

    private readonly POLL_INTERVAL_MS = 3000; // Poll every 3 seconds
    private readonly MAX_POLL_TIME_MS = 5 * 60 * 1000; // Max 5 minutes

    evalDocumentOptions: EvalDocument[] = [
        { id: 514, name: 'PURCHASES' },
        { id: 258, name: 'SALES' },
    ];

    form: UntypedFormGroup | null = null;

    processing = signal(false);

    ngOnInit() {
        this.form = this.#formBuilder.group({
            document: [null, Validators.required],
            inventory_date: [
                new Date(new Date().getFullYear(), 0, 1),
                Validators.required,
            ],
        });
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('STOCK_DOCUMENT_RECALCULATION');
    }

    recalculate() {
        if (this.form.valid) {
            this.#shellSrv.setLoading(true);
            const value = this.form.value;
            if (value.document > 0) {
                this.processing.set(true);

                this.#optionSrv
                    .recalculateDocument2(value.inventory_date, value.document)
                    .pipe(
                        switchMap((jobId) => {
                            // Start polling
                            return timer(0, this.POLL_INTERVAL_MS)
                                .pipe(
                                    switchMap(() => this.#optionSrv.getStatus(jobId)),
                                    takeWhile((statusRes, index) => statusRes.status === 102 && index < 100,
                                        true // Include the last emission (when Completed/Failed)
                                ),
                            );
                        }),
                    ).subscribe({
                    next: res => {
                        if (res.status === 200) {
                            this.#shellSrv.setLoading(false);
                            this.processing.set(false);
                            this.#snackBarSrv.showSuccessMessage();
                        }
                    }, error: err => {
                        this.#shellSrv.setLoading(false);
                        this.processing.set(false);
                        throw err;
                    }
                });
            }
        }
    }
    recalculate_save() {
        if (this.form.valid) {
            this.#shellSrv.setLoading(true);
            const value = this.form.value;
            if (value.document > 0) {
                this.processing.set(true);
                this.#optionSrv
                    .recalculateDocument(value.inventory_date, value.document)
                    .subscribe({
                        next: res => {
                            this.#snackBarSrv.showSuccessMessage();
                            this.#shellSrv.setLoading(false);
                            this.processing.set(false);
                        },
                        error: (err) => {
                            this.#shellSrv.setLoading(false);
                            this.processing.set(false);
                            if (err.status === 0 || err.status === 502) {
                                this.#snackBarSrv.showSuccessMessage();
                            } else {
                                throw err;
                            }
                        },
                    });
            }
        }
    }
}
