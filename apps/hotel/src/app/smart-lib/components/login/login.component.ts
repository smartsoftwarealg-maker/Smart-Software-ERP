import { LoginService, LicenseErrorType } from './login.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { VCenterDirective } from '../../common/v-center.directive';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatPrefix, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ThemeSelectComponent } from '../theme/theme-select.component';
import { LanguageSelectComponent } from '../language/language-select.component';

@Component({
    selector: 'ss-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [NgIf, LoadingSpinnerComponent, VCenterDirective, FormsModule, MatFormField, TranslateDirective, MatPrefix, MatError, MatInput, MatHint, MatButton, ThemeSelectComponent, LanguageSelectComponent]
})
export class LoginComponent implements OnInit {
    private readonly USER_DATA = 'USER_DATA';
    public user: { username: string, password: string } = { username: '', password: '' };
    public license: string = null;
    public updating = false;
    loading = false;
    private readonly isPhone;
    onLoadingFinished = this.loadingFinished.bind(this);

    constructor(public loginSrv: LoginService,
        protected deviceSrv: DeviceDetectorService) {
        const os = deviceSrv.getDeviceInfo().os.toLocaleLowerCase();
        this.isPhone = os === 'android' || os === 'ios';
    }

    public onSubmit() {
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
            }
        } else {
            this.loginSrv.userLogin(this.user, this.isPhone, this.onLoadingFinished);
            localStorage.setItem(this.USER_DATA, JSON.stringify(this.user));
        }
    }

    ngOnInit(): void {
        const storage = localStorage.getItem(this.USER_DATA);
        if (storage) {
            try {
                this.user = JSON.parse(storage);
            } catch (e) {
                alert(e);
            }
        }
    }

    loadingFinished() {
        this.loading = false;
    }

}
