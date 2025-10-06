import { Component, OnInit, inject, effect } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe, TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { LoginService, MaterialModule, User } from '@ss/common/api-common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CRMQuote } from '../quotes-api';
import { CrmQuotesService } from '../crm-quotes.service';
import { UserListService } from '@ss/common/api-users';
import { CurrencyService } from '@ss/common/api-lookup';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { AgentService } from '@ss/logistics/api-agent';
import { ShellService } from '@ss/common/ui-shell';
import { filter } from 'rxjs';

@Component({
    selector: 'ss-crm-quotes-detail',
    templateUrl: './crm-quotes-detail.component.html',
    styleUrls: ['./crm-quotes-detail.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        TranslatePipe,
        TranslateDirective,
        DatePickerComponent,
        UiAutoCompleteComponent,
        MaterialModule,
        RouterOutlet
    ]
})
export class CrmQuotesDetailComponent
    extends BaseChildEntityDetailComponent<CRMQuote>
    implements OnInit {
    private fb = inject(FormBuilder);
    private userSrv = inject(UserListService);
    private agentSrv = inject(AgentService);
    protected loginSrv = inject(LoginService);
    private currencySrv = inject(CurrencyService);
    userLookup = new DefaultAutoCompleteModel(this.userSrv);
    agentLookup = new DefaultAutoCompleteModel(this.agentSrv);
    currencyLookup = new DefaultAutoCompleteModel(this.currencySrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.userSrv);
    public formId = 0;
    constructor(protected detailSrv: CrmQuotesService) {
        super(detailSrv, 'CRMQuoteDetail');
    }

    override setupForm(q: CRMQuote): UntypedFormGroup {
        this.formId = q?.id || 0;
        const parentAgent = this.detailSrv.getParentId();
        return this.fb.group({
            id: [q?.id || 0],
            parentId: [q?.parentId || this.detailSrv.getParentId()],
            number: [q?.number],
            date: [q.date || new Date(), Validators.required],
            userId: [q?.userId || null],
            agent: [q?.agent || parentAgent],
            center: [q?.center || this.loginSrv.appCtx?.center],
            // Uncomment if you’ll need them later
            // currencyRate: [q?.currencyRate || 1],
            // dealer: [q?.dealer || null, Validators.required],
            // locked: [q?.locked || false]
        });
    }
    protected disableSave = false;
    override ngOnInit(): void {
        super.ngOnInit();

        // Listen to route changes
        this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .subscribe((event) => {
                // If the URL contains '/items/', disable save
                this.disableSave = event.url.includes('/items/');
            });
    }


}
