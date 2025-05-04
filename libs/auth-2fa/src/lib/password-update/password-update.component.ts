import { Component, inject, OnInit } from '@angular/core';
import { CENTER_SELECT_URL, LOGIN_URL, LoginService } from '@ss/common/api-common';
import { SnackBarService } from '@ss/common/ui-shell';
import { AgentService } from '@ss/logistics/api-agent';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-password-update',
    templateUrl: './password-update.component.html',
    styleUrls: ['./password-update.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule,
        TranslatePipe,
        TranslateDirective,
    ],
})
export class PasswordUpdateComponent implements OnInit {
    private router = inject(Router);
    private loginSrv = inject(LoginService);
    private snackBarSrv = inject(SnackBarService);
    private agentSrv = inject(AgentService);
    private fb = inject(FormBuilder);

    public minLength = 4

    form = this.fb.group({
        resetCode: ['', Validators.required],
        password: ['', Validators.minLength(this.minLength)],
        confirmation: ['', Validators.minLength(this.minLength)],
    });

    ngOnInit() {
        if (!this.loginSrv?.appCtx?.agentId) {
            this.router.navigate(['/' + LOGIN_URL]); // when the page refresh appCtx is gone
        }
    }

    submit(): void {
        this.loginSrv?.resetCode(this.loginSrv?.appCtx?.agentId).subscribe({
            next: res => {
                if (res.code == this.form.controls.resetCode.getRawValue()) {
                    this.updatePassword()
                }else {
                    this.snackBarSrv.showFailureMessage('ADMINISTRATION_RESET_CODE_NOT_CORRECT');
                }
            },
            error: err => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            }
        })
    }

    updatePassword() {
        const value = this.form.value;

        if (value.password === value.confirmation) {
            this.agentSrv
              .updatePassword({
                  id: 0,
                  agentId: this.loginSrv.appCtx.agentId,
                  password: value.password,
              })
              .pipe(
                switchMap((res) =>
                  res['count']
                    ? this.loginSrv.refresh({
                        username: this.loginSrv.appCtx.userName,
                        password: value.password,
                    })
                    : of(null),
                ),
              )
              .subscribe((res) => {
                  if (res) {
                      this.snackBarSrv.showMessage(
                        'COMMON_SUCCESS',
                        false,
                        false,
                      );
                      this.router.navigate(['/' + CENTER_SELECT_URL]).then();
                  } else {
                      this.snackBarSrv.showFailureMessage();
                  }
              });
        }
    }
}
