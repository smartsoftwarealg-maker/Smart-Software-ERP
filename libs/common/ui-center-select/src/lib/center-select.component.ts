import {Component, OnInit, ViewChild} from '@angular/core';
import {CentersService} from './centers.service';
import {Router} from '@angular/router';
import {UserService, INDEX_PAGE_URL} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {PROFILE_PAGE_URL} from '@ss/common/api-common';
import {Center, Company} from '@ss/common/api-common';
import {MatStepper} from '@angular/material/stepper';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-company-center-login',
    templateUrl: './center-select.component.html',
    styleUrls: ['./center-select.component.scss']
})
export class CenterSelectComponent implements OnInit {

    companyList: Company[] = [];
    centerList: Center[] = [];

    selectedCompany = 0;
    selectedCenter = 0;

    selectedCompanyName: string;

    loading = false;
    loadingCenters = false;

    @ViewChild('stepper', {static: false}) stepper: MatStepper;

    constructor(private ccListSrv: CentersService,
                private loginSrv: LoginService,
                private router: Router) {
    }

    ngOnInit() {
        this.companyList = [];

        this.loading = true;
        this.ccListSrv.getCompanyList()
            .subscribe(r => {
                    this.companyList = r;
                    if (this.companyList.length === 1) {
                        this.selectCompany(this.companyList[0].id);
                    }
                    this.endLoading();
                }, err => {
                    this.endLoading();
                    throw err;
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
            this.ccListSrv.getCenterList(company).subscribe(r => {
                    this.centerList = r;
                    this.loadingCenters = false;
                    if (this.centerList.length === 1) {
                        this.selectCenter(this.centerList[0].id);
                        this.onDone();
                        // } else {
                        //     this.endLoading();
                    }
                }, err => {
                    //     // this.endLoading();
                    this.loadingCenters = false;
                    throw err;
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
                .pipe(switchMap(() => this.loginSrv.loadUser()))
                .subscribe(() => {
                        // this.endLoading(); // don't show shit, because we are leaving anyway
                        const dest = this.loginSrv.context && this.loginSrv.context.pwdExpired
                            ? PROFILE_PAGE_URL : INDEX_PAGE_URL;
                        this.router.navigate(['/' + dest]).then(() => {
                        });
                    }, err => {
                        this.endLoading();
                        throw err;
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

}
