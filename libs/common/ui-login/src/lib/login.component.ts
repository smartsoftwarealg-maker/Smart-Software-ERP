import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService, LicenseErrorType } from '@ss/common/api-common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'ss-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private readonly USER_DATA = 'USER_DATA';
    public user: { username: string, password: string } = {username: '', password: ''};
    public license: string = null;
    readonly isPhone: boolean;
    form: FormGroup = null;
    loading = false;
    updating = false;

    constructor(private loginSrv: LoginService, private formBuilder: FormBuilder, protected deviceSrv: DeviceDetectorService) {
        const os = this.deviceSrv.getDeviceInfo().os.toLocaleLowerCase();
        this.isPhone = this.deviceSrv.isMobile() || this.deviceSrv.isTablet() || os === 'android' || os === 'ios';
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            user: [null, Validators.required],
            pass: [null],
            license: [null]
        });
        const storage = localStorage.getItem(this.USER_DATA);
        if (storage) {
            try {
                this.user = JSON.parse(storage);
            } catch (e) {
                alert(e);
                this.user = {username: '', password: ''};
            }
        }
        this.loginSrv.skipLogin();
    }

    public onSubmit() {
        const tmp = this.form.value;
        this.user.username = tmp.user;
        this.user.password = tmp.pass;
        //
        this.loading = true;
        if (this.license && this.loginSrv.licenseErrorType) {
            if (this.loginSrv.licenseErrorType === LicenseErrorType.UserLicense) {
                this.updating = true;
                this.loginSrv
                    .updateUserLicense(this.license)
                    .pipe(finalize(() => this.updating = false))
                    .subscribe(() => {
                        this.updating = false;
                        this.license = null;
                        this.loginSrv.userLogin(this.user, this.isPhone, this.onLoadingFinished);
                    });
            } else {
                if (this.loginSrv.licenseErrorType === LicenseErrorType.PersonLicense) {
                    this.updating = true;
                    this.loginSrv
                        .updatePersonLicense(this.license)
                        .pipe(finalize(() => this.updating = false))
                        .subscribe(() => {
                            this.updating = false;
                            this.license = null;
                            this.loginSrv.personLogin(this.user, this.isPhone, this.onLoadingFinished);
                        });
                } else if (this.loginSrv.licenseErrorType === LicenseErrorType.AgentLicense) {
                    this.updating = true;
                    this.loginSrv
                        .updateAgentLicense(this.license)
                        .pipe(finalize(() => this.updating = false))
                        .subscribe(() => {
                            this.updating = false;
                            this.license = null;
                            this.loginSrv.agentLogin(this.user, this.isPhone, this.onLoadingFinished);
                        });
                }
            }
        } else {
            this.loginSrv.userLogin(this.user, this.isPhone, this.onLoadingFinished);
            localStorage.setItem(this.USER_DATA, JSON.stringify(this.user));
        }
    }

    onLoadingFinished = () => {
        this.loading = false;
    }
}
