import { OnInit } from '@angular/core';
import { CentersService } from './centers.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UserService } from '../login/user.service';
import { Center, Company } from '../../common/models';
import { MatStepper } from '@angular/material';
export declare class CenterSelectComponent implements OnInit {
    private ccListSrv;
    private loginSrv;
    private router;
    private userService;
    companyList: Company[];
    centerList: Center[];
    selectedCompany: number;
    selectedCenter: number;
    selectedCompanyName: string;
    loading: boolean;
    loadingCenters: boolean;
    stepper: MatStepper;
    constructor(ccListSrv: CentersService, loginSrv: LoginService, router: Router, userService: UserService);
    ngOnInit(): void;
    selectCompany(company: number): void;
    selectCenter(center: number): void;
    onDone(): void;
    endLoading(): void;
    onStepSelectionChanged(e: any): void;
}
