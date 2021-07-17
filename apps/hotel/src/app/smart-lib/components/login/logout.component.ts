import {Component} from '@angular/core';
import {LoginService} from './login.service';

@Component({
    selector: 'ss-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
    constructor(public loginSrv: LoginService) {
    }

    logout() {
        this.loginSrv.logout();
    }

    public click(): void {
        this.logout();
    }
}
