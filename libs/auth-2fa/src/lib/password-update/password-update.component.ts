import { Component, inject } from '@angular/core';
import { LoginService } from '@ss/common/api-common';
import { SnackBarService } from '@ss/common/ui-shell';
import { AgentService } from '@ss/logistics/api-agent';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
    selector: 'ss-password-update',
    templateUrl: './password-update.component.html',
    styleUrls: ['./password-update.component.scss'],
})
export class PasswordUpdateComponent {
    private router = inject(Router);
    private loginSrv = inject(LoginService);
    private snackBarSrv = inject(SnackBarService);
    private agentSrv = inject(AgentService);
    private fb = inject(FormBuilder);

    form = this.fb.group({
        password:     ['', Validators.required],
        confirmation: ['', Validators.required],
    });

    updatePassword() {
        const value = this.form.value;
        if (value.password === value.confirmation) {
            this.agentSrv
                .updatePassword({ id: 0, agentId: this.loginSrv.appCtx.agentId, password: value.password })
                .pipe(switchMap(res => res['count']?
                    this.loginSrv.refresh({username: this.loginSrv.appCtx.userName, password: value.password}) :
                    of(null)))
                .subscribe(res => {
                    if (res) {
                        this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false);
                        this.router.navigate(['/']).then();
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                });
        }
    }
}
