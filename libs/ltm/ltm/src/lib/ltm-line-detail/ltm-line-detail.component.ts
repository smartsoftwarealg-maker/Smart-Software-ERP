import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmLineService} from '../ltm-line.service';
import {LTMLine} from '../ltm-api';
import {LoginService} from '@ss/common/api-common';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'ss-prod-line-detail',
    templateUrl: './ltm-line-detail.component.html',
    styleUrls: ['./ltm-line-detail.component.scss'],
})
export class LtmLineDetailComponent extends BaseEntityDetailComponent<LTMLine> {
    constructor(
        public override entitySrv: LtmLineService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService,
        private matterSrv: LtmLineMatterService,
        private router: Router) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_LINES');
    }

    override ngOnInit() {
        super.ngOnInit();
        const subs = this.router
            .events
            .pipe(filter(ev => ev instanceof NavigationEnd))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    const visible = (event.url === '/app/ltm/ltm-lines');
                    this.saveButton.visible = visible;
                }
            });
        this.subscriptions.push(subs);

    }

    public override setupForm(b: LTMLine) {
        return this.formBuilder.group({
            id: [b.id],
            centerId: [this.loginSrv.appCtx.center],
            description: [b.description, Validators.required],
        });
    }

    override loadEntity(id: number): Observable<LTMLine> {
        this.matterSrv.setParentId(id || 0);
        return super.loadEntity(id);
    }

    override readForm(): LTMLine {
        return this.form.getRawValue();
    }
}

