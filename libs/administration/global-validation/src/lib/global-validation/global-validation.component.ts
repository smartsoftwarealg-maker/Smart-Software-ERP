import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';
import { ValidationService } from '../api/validation.service';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { of, switchMap, tap } from 'rxjs';

@Component({
    selector: 'ss-global-validation',
    imports: [CommonModule, MaterialModule, MatCard, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatLabel, TranslateDirective, MatFormField, TranslatePipe],
    templateUrl: './global-validation.component.html',
    styleUrl: './global-validation.component.scss',
    providers: [ValidationService]
})
export class GlobalValidationComponent {
    #snackBarSrv = inject(SnackBarService);
    #confirmationSrv = inject(ConfirmationDialogService);
    #shellSrv = inject(ShellService);
    #fb = inject(FormBuilder);
    #today = new Date();
    #route = inject(ActivatedRoute);
    #validationSrv = inject(ValidationService);

    processing = signal(false);

    form = this.#fb.group( {
        year:  [{ value: this.#today.getMonth() == 12? this.#today.getFullYear() - 1 : this.#today.getFullYear(), disabled: true }],
        month: [{ value: this.#today.getMonth() == 12? 1 : this.#today.getMonth() - 1, disabled: true }],
    });

    ngOnInit() {
        this.#shellSrv.setTitle('ADMINISTRATION_GLOBAL_VALIDATION');
        this.#shellSrv.setGoBackPath('..', this.#route);
    }

    validateAll() {
        const value = this.form.getRawValue();
        this.#confirmationSrv
            .confirm('ADMINISTRATION_GLOBAL_VALIDATION', 'ADMINISTRATION_VALIDATE_ALL')
            .pipe(
                tap(res => this.processing.set(res)),
                switchMap(res => res? this.#validationSrv.validateAll(value) : of({count: 0}))
            ).subscribe({
                next: res => {
                    if (res.count > 0) {
                        this.#snackBarSrv.showSuccessMessage();
                    }
                    this.processing.set(false);
                },
                error: err => {
                    this.processing.set(false);
                    throw err;
                }
            });
    }
}
