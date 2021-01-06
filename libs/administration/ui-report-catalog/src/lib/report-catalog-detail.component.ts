import {Component, OnInit} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {ReportCatalogService, ReportsCatalog} from "@ss/administration/api-report-catalog";
import {FormValidators, LIST_URL} from "@ss/common/api-common";
import {ReportListService} from "@ss/administration/api-reports";


@Component({
    selector: 'ss-report-catalog-detail',
    styleUrls: ['./report-catalog-detail.component.scss'],
    templateUrl: './report-catalog-detail.component.html'
})
export class ReportCatalogDetailComponent extends BaseEntityDetailComponent<ReportsCatalog> implements OnInit {

    app: string;
    reportList: [] = [];


    constructor(
        public reportCatalogService: ReportCatalogService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public reportListsService: ReportListService) {
        super(reportCatalogService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_REPORT_CATALOG');
    }


    ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../' + LIST_URL, this.route, {app: this.app});
    }


    finishLoading(e: ReportsCatalog) {
        this.reportListsService.getListByApp(this.app).subscribe((res: []) => {
            this.reportList = res;
            super.finishLoading(e);
        });
    }

    log($log){
        console.log($log);
    }

    assignQueryParams(p: any) {
        if (!p.app) {
            this.shellSrv.goBack();
        } else {
            super.assignQueryParams(p);
            this.app = p.app
        }
    }

    public setupForm(b: ReportsCatalog) {

        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            filename: [b.filename, Validators.compose([Validators.required, FormValidators.autoCompleteValidator(this.reportList)])]
        });
    }

}
