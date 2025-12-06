import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {CenterService} from './center.service';
import {Router} from '@angular/router';
import {
    BLOCKED_REASON_PAGE_URL,
    Center,
    Company,
    INDEX_PAGE_URL, LanguageService, LoginService, MainPageService,
    PROFILE_PAGE_URL
} from '@ss/common/api-common';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap, tap
} from 'rxjs/operators';
import { MatStepper, MatStepperIcon, MatStep, MatStepLabel } from '@angular/material/stepper';
import {UserRightsService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { NgClass, AsyncPipe } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';
import { AgentService } from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-company-center-login',
    templateUrl: './center-select.component.html',
    styleUrls: ['./center-select.component.scss'],
    standalone: true,
    imports: [MatStepper, NgClass, MatStepperIcon, MatStep, MatStepLabel, TranslateDirective, MatFormField, MatSelect, MatOption, MatLabel, MatInput, FormsModule, MatAutocompleteTrigger, ReactiveFormsModule, MatAutocomplete, MatButton, AsyncPipe, TranslatePipe]
})
export class CenterSelectComponent implements OnInit {
    #langSrv = inject(LanguageService);

    private ccListSrv = inject(CenterService);
    private mainPageSrv = inject(MainPageService);
    private agentSrv = inject(AgentService);
    private loginSrv  = inject(LoginService);
    private router  = inject(Router);
    private rightsSrv  = inject(UserRightsService);
    private shellSrv  = inject(ShellService);
    companyList: Company[] = [];
    centerList: Center[] = [];

    selectedCompany = 0;
    selectedCenter = 0;

    selectedCompanyName: string;

    loading = false;
    loadingCenters = false;

    centerControl = new FormControl<string>('');
    filteredCenters: Observable<Center[]>;

    @ViewChild('stepper', {static: false}) stepper: MatStepper;


    ngOnInit() {
        this.companyList = [];
        this.mainPageSrv.clear();
        this.filteredCenters = this.centerControl
            .valueChanges
            .pipe(
                startWith(''),
                debounceTime(300),
                distinctUntilChanged(),
                map(value => this.centerList.filter(c => c.description?.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
            );

        this.loading = true;
        this.ccListSrv.getCompanyList()
            .subscribe({
                    next: r => {
                        this.companyList = r;
                        if (this.companyList.length === 1) {
                            this.selectCompany(this.companyList[0].id);
                        }
                        this.endLoading();
                    },
                    error: err => {
                        this.endLoading();
                        throw err;
                    }
                }
            );
    }

    selectCompany(company: number) {
        this.selectedCompany = company;
        this.centerList = [];
        if (company > 0) {
            this.selectedCompanyName = this.companyList.filter(c => c.id === company).map(c => c.description)[0];
            setTimeout(() => {
                if (this.stepper) {
                    this.stepper.next();
                }
            });
            // this.loading = true;
            this.loadingCenters = true;
            this.ccListSrv.getCenterList(company)
                .subscribe({
                    next: r => {
                        this.centerList = r;
                        this.loadingCenters = false;
                        if (this.centerList.length === 1) {
                            this.selectCenter(this.centerList[0].id);
                            this.onDone();
                        }
                    },
                    error: err => {
                        this.loadingCenters = false;
                        throw err;
                    }
                }
                );
        } else {
            this.selectedCompanyName = null;
        }
    }

    selectCenter(center: number) {
        this.selectedCenter = center;
    }

    onDone() {
        if (this.selectedCenter > 0) {
            this.loading = true;
            this.loginSrv
                .centerLogin(this.selectedCenter)
                .pipe(switchMap(_ => this.rightsSrv.load()),
                    tap(res => this.rightsSrv.loadMap(res))
                ).subscribe({
                    next: () => {
                        // this.endLoading(); // don't show shit, because we are leaving anyway
                        const dest = !this.loginSrv.appCtx? PROFILE_PAGE_URL : INDEX_PAGE_URL;
                        this.shellSrv.setCompanyName(this.centerList.filter(c => c.id === this.selectedCenter)[0]?.description);
                        this.loginSrv.appCtx.accPeriod = this.loginSrv.appCtx.accFile = 0;
                        this.shellSrv.setLabels([]);
                        if (this.loginSrv.appCtx.id) {
                            this.router.navigate(['/' + dest]).then(() => {});
                        } else {
                            this.agentSrv.currentCustomer().subscribe({
                                next: (cst) => {
                                    const dest1 = cst.recordBlocked
                                        ? BLOCKED_REASON_PAGE_URL
                                        : dest;
                                    this.router
                                        .navigate(['/' + dest1])
                                        .then(() => {});
                                },
                                error: () => {
                                    this.router
                                        .navigate(['/' + dest])
                                        .then(() => {});
                                },
                            });
                        }
                    }, error: err => {
                        this.endLoading();
                        throw err;
                    }
                }
                );
        }
    }

    endLoading() {
        setTimeout(() => this.loading = false, 125);
    }

    onStepSelectionChanged(e: any) {
        if (e.selectedIndex === 0) {
            this.selectedCompany = 0;
            this.selectedCompanyName = null;
            this.centerList = [];
        }
    }

    select(e: MatAutocompleteSelectedEvent) {
        const search = e.option.value;
        const selection = this.centerList.find(c => c.description === search);
        this.selectedCenter = selection?.id || 0;
    }
}
