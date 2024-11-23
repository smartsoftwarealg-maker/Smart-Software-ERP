import {Component} from '@angular/core';
import {LoginService, UserRightsService} from '@ss/common/api-common';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'ss-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    standalone: true,
    imports: [MatIconButton]
})
export class LogoutComponent {
    constructor(private loginSrv: LoginService, private rightsSrv: UserRightsService) {
    }

    logout() {
        this.loginSrv
            .logout()
            .then(() => this.rightsSrv.clear());
    }

    public click(): void {
        this.logout();
    }
}
