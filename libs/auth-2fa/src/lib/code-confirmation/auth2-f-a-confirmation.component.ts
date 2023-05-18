import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AgentService } from '@ss/logistics/api-agent';
import { SnackBarService } from '@ss/common/ui-shell';
import { ESender, LanguageService, LoginService } from '@ss/common/api-common';
import { Router } from '@angular/router';

@Component({
    selector: 'ss-code-confirmation',
    templateUrl: './auth2-f-a-confirmation.component.html',
    styleUrls: ['./auth2-f-a-confirmation.component.scss'],
})
export class Auth2FAConfirmationComponent {
    private THIRTY_MINUTES = 30 * 30;
    private router = inject(Router);
    private langSrv = inject(LanguageService);
    private loginSrv = inject(LoginService);
    private snackBarSrv = inject(SnackBarService);
    private agentSrv = inject(AgentService);
    private fb = inject(FormBuilder);
    private sendingDate = new Date();


    code = 0;
    codeSent = false;
    verified = false;
    sendingEmail = false;

    form = this.fb.group({
        code:  [''],
        email: [{ value: this.loginSrv?.appCtx?.email || '', disabled: true}, [Validators.required, Validators.email]],
    });

    sendEmail() {
        this.sendingDate = new Date();
        this.code = Math.floor(Math.random() * 1000000);
        this.sendingEmail = true;
        const message: ESender = {
            'email': '(_^_)',
            'pwd': '(^_^)',
            'to': this.loginSrv.appCtx.email,
            'subject': this.langSrv.translate('COMMON_VERIFICATION_CODE'),
            'body': this.code + ''
        };
        this.loginSrv
            .sendCode(this.code, message)
            .subscribe({
                next: () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.codeSent = true;
                    this.sendingEmail = false;
                },
                error: err => {
                    this.sendingEmail = false;
                    throw err;
                }
            });
    }

    verify() {
        const timeLapse = (new Date().getTime() - this.sendingDate.getTime()) / 1000;
        if (timeLapse > this.THIRTY_MINUTES) {
            this.snackBarSrv.showMessage('COMMON_CODE_EXPIRED');
        } else {
            if (+this.form.value.code === this.code) {
                this.loginSrv
                    .setVerified()
                    .subscribe(() => {
                        this.loginSrv.appCtx.verified = true;
                        this.verified = true;
                        this.snackBarSrv.showSuccessMessage();
                    });
            } else {
                this.snackBarSrv.showMessage('COMMON_INVALID_CODE');
            }
        }
    }

    continue() {
        this.router.navigate(['/']).then();
    }
}
