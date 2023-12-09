import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Grid} from '../grid-api';
import {BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {GridService} from '../grid.service';

@Component({
  selector: 'ss-salary-grid-detail',
  templateUrl: './salary-grid-detail.component.html',
  styleUrls: ['./salary-grid-detail.component.scss']
})
export class SalaryGridDetailComponent extends BaseEntityDetailComponent<Grid> {

    constructor(
        public detailSrv: GridService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_SALARY_GRID');
    }

    setupForm(b: Grid): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            category: [b.category, Validators.required],
            sec: [b.sec, Validators.required],
            baseSalary: [b.base0, Validators.required],
            base0:  [b.base1|| 0, Validators.required],
            base2:  [b.base2|| 0, Validators.required],
            base3:  [b.base3|| 0, Validators.required],
            base4:  [b.base4|| 0, Validators.required],
            base5:  [b.base5|| 0, Validators.required],
            base6:  [b.base6|| 0, Validators.required],
            base7:  [b.base7|| 0, Validators.required],
            base8:  [b.base8|| 0, Validators.required],
            base9:  [b.base9|| 0, Validators.required],
            base10: [b.base10 || 0, Validators.required],
            base11: [b.base11 || 0, Validators.required],
            base12: [b.base12 || 0, Validators.required],
            base13: [b.base13 || 0, Validators.required],
            base14: [b.base14 || 0, Validators.required],
            base15: [b.base15 || 0, Validators.required],
            base16: [b.base16 || 0, Validators.required],
            base17: [b.base17 || 0, Validators.required],
            base18: [b.base18 || 0, Validators.required],
            base19: [b.base19 || 0, Validators.required],
            base20: [b.base20 || 0, Validators.required],
            base21: [b.base21 || 0, Validators.required],
            base22: [b.base22 || 0, Validators.required],
            base23: [b.base23 || 0, Validators.required],
            base24: [b.base24 || 0, Validators.required],
            base25: [b.base25 || 0, Validators.required],
            index0: [b.index0 || 0, Validators.required],
            index1: [b.index1 || 0, Validators.required],
            index2: [b.index2 || 0, Validators.required],
            index3: [b.index3 || 0, Validators.required],
            index4: [b.index4 || 0, Validators.required],
            index5: [b.index5 || 0, Validators.required],
            index6: [b.index6 || 0, Validators.required],
            index7: [b.index7 || 0, Validators.required],
            index8: [b.index8 || 0, Validators.required],
            index9: [b.index9 || 0, Validators.required],
            index10: [b.index10 || 0, Validators.required],
            index11: [b.index11 || 0, Validators.required],
            index12: [b.index12 || 0, Validators.required],
            index13: [b.index13 || 0, Validators.required],
            index14: [b.index14 || 0, Validators.required],
            index15: [b.index15 || 0, Validators.required],
            index16: [b.index16 || 0, Validators.required],
            index17: [b.index17 || 0, Validators.required],
            index18: [b.index18 || 0, Validators.required],
            index19: [b.index19 || 0, Validators.required],
            index20: [b.index20 || 0, Validators.required],
            index21: [b.index21 || 0, Validators.required],
            index22: [b.index22 || 0, Validators.required],
            index23: [b.index23 || 0, Validators.required],
            index24: [b.index24 || 0, Validators.required],
            index25: [b.index25 || 0, Validators.required],
        });
    }



}
