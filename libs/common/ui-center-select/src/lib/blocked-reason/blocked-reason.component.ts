import { Component, inject, OnInit } from '@angular/core';
import { AgentService } from '@ss/logistics/api-agent';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { INDEX_PAGE_URL, LOGIN_URL, LoginService } from '@ss/common/api-common';
import { Router } from '@angular/router';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-blocking-reason',
    templateUrl: './blocked-reason.component.html',
    styleUrls: ['./blocked-reason.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatCardFooter,
        TranslateDirective,
        MatMiniFabButton,
    ],
})
export class BlockedReasonComponent implements OnInit {
    private agentSrv = inject(AgentService);
    private loginSrv = inject(LoginService);
    private router = inject(Router);
    public blockReason: string;

    constructor() {}

    ngOnInit() {
        if (!this.loginSrv?.appCtx?.agentId) {
            this.router.navigate(['/' + LOGIN_URL]); // when the page refresh appCtx is gone
        }
        this.agentSrv.currentCustomer().subscribe({
            next: (res) => {
                this.blockReason = res.blockingReason;
            },
        });
    }

    goBack() {
        this.router.navigate(['/' + INDEX_PAGE_URL]).then(() => {});
    }
}
