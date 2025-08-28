import { Component, inject, OnInit } from '@angular/core';

import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MaterialModule, UserService } from '@ss/common/api-common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { Agent, CustomerService } from '@ss/logistics/api-agent';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-password-reset',
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    UiAutoCompleteComponent
],
    templateUrl: './password-reset.component.html',
    styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent implements OnInit {
    #password: string|null = null;
    #snackBarSrv = inject(SnackBarService);
    #shellSrv =  inject(ShellService);
    #route =  inject(ActivatedRoute);
    #fb =  inject(FormBuilder);
    #userSrv = inject(UserService);
    #customerSrv = inject(CustomerService);

    customerLookup = new DefaultAutoCompleteModel<Agent>(this.#customerSrv, 'id', 'denomination');
    form = this.#fb.group ({
        id:           [0],
        agentId:      [null],
        resetCode:    [],
        password:     [this.#password],
        confirmation: [this.#password]
    });

    ngOnInit() {
        this.#shellSrv.setTitle('COMMON_PASSWORD_RESET');
        this.#shellSrv.setGoBackPath('../..', this.#route);
    }

    updatePassword() {
        const value = this.form.getRawValue();
        this.#userSrv
            .updatePassword(value)
            .subscribe(res => {
                if (res.count > 0) {
                    this.#snackBarSrv.showSuccessMessage();
                }
            });
    }
}
