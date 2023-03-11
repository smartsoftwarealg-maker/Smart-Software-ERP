import { Component, OnInit, ViewChild } from '@angular/core';
import { CentersService } from './centers.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UserService } from '../login/user.service';
import {switchMap, tap} from 'rxjs/operators';
import { MAIN_PAGE_URL, PROFILE_PAGE_URL } from '../login/login-constants';
import { Center, Company } from '../../common/models';
import { MatStepper } from '@angular/material/stepper';
import {ShellService} from '@ss/common/ui-shell';

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

    @ViewChild('stepper', { static: false }) stepper: MatStepper;

    constructor(private ccListSrv: CentersService,
                private loginSrv: LoginService,
                private router: Router,
                private userService: UserService,
                private shellSrv: ShellService) {
    }

    ngOnInit() {
        this.companyList = [];

        this.loading = true;
        this.ccListSrv.getCompanyList()
            .subscribe({
                    next: r => {
                        this.companyList = r;
                        if (this.companyList.length === 1) {
                            this.selectCompany(this.companyList[0].id);
                            // } else {
                            this.endLoading();
                        }
                    }, error: err => {
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
                .pipe(switchMap(() => this.userService.load()))
                .subscribe({
                    next: () => {
                        // this.endLoading(); // don't show shit, because we are leaving anyway
                        const dest = this.userService.context && this.userService.context.pwdExpired
                            ? PROFILE_PAGE_URL : MAIN_PAGE_URL;
                        this.shellSrv.setCompanyName(this.centerList[this.selectedCenter].description);
                        this.router.navigate(['/' + dest]).then(() => {
                        });
                    }
                    , error:
                        err => {
                            this.endLoading();
                            throw err;
                        }
                });
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
