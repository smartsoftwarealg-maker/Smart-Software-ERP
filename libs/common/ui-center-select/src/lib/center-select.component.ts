import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {CenterService} from './center.service';
import {Router} from '@angular/router';
import {
    Center,
    Company,
    INDEX_PAGE_URL, LoginService, MainPageService,
    PROFILE_PAGE_URL
} from '@ss/common/api-common';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap
} from 'rxjs/operators';
import {MatStepper} from '@angular/material/stepper';
import {UserRightsService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'ss-company-center-login',
    templateUrl: './center-select.component.html',
    styleUrls: ['./center-select.component.scss']
})
export class CenterSelectComponent implements OnInit {
    private ccListSrv = inject(CenterService);
    private mainPageSrv = inject(MainPageService);

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

    constructor(private loginSrv: LoginService,
                private router: Router,
                private rightsSrv: UserRightsService,
                private shellSrv: ShellService) {
    }

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
                .pipe(switchMap(_ => this.rightsSrv.load()))
                .subscribe({
                    next: () => {
                        // this.endLoading(); // don't show shit, because we are leaving anyway
                        const dest = !this.loginSrv.appCtx? PROFILE_PAGE_URL : INDEX_PAGE_URL;
                        this.shellSrv.setCompanyName(this.centerList.filter(c => c.id === this.selectedCenter)[0]?.description);
                        this.router.navigate(['/' + dest]).then(() => {});
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
