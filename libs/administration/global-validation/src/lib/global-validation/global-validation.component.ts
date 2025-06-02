import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService } from '@ss/common/ui-shell';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-global-validation',
    imports: [CommonModule, MaterialModule, MatCard, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatLabel, TranslateDirective, MatFormField, TranslatePipe],
    templateUrl: './global-validation.component.html',
    styleUrl: './global-validation.component.scss',
})
export class GlobalValidationComponent {
    #shellSrv = inject(ShellService);
    #fb = inject(FormBuilder);
    #today = new Date();
    #route = inject(ActivatedRoute);

    form = this.#fb.group( {
        year:  [{ value: this.#today.getMonth() == 12? this.#today.getFullYear() - 1 : this.#today.getFullYear(), disabled: true }],
        month: [{ value: this.#today.getMonth() == 12? 1 : this.#today.getMonth() - 1, disabled: true }],
    });

    ngOnInit() {
        this.#shellSrv.setTitle('ADMINISTRATION_GLOBAL_VALIDATION');
        this.#shellSrv.setGoBackPath('..', this.#route);
    }

    validateAll() {
        console.log('validation');
    }
}
