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
                    .recalculateDocument(value.inventory_date, value.document)
                    .subscribe({
                        next: () => {
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
