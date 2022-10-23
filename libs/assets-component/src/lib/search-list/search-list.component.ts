import {Component, OnDestroy} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Asset, SearchCriteria} from '../assets-api';
import {AssetsService} from '../assets.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {IsParamService, LanguageService, PaginatorPersistenceService} from '@ss/common/api-common';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {UntypedFormBuilder} from '@angular/forms';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ConsumerService, SupplierService} from '@ss/logistics/api-agent';
import {AssetLocationService} from '../asset-location.service';
import {OfficeSearchComponent} from '../office-search/office-search.component';
import {MatDialog} from '@angular/material/dialog';
import {Office, OfficeService} from '@ss/common/api-lookup';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'ss-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent extends BaseEntityListComponent<Asset> implements OnDestroy {
    private EPOCH: Date | null = new Date(0);
    private FUTURE: Date | null = new Date(9999, 11, 31);
    private DEF_COLS = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'depreciationRate',
        'useful_life',
        'residualValue',
    ];

    private AQS_COLS = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'geolocation',
        'beneficiary',
        'serial_no',
        'depreciationRate',
        'useful_life',
        'residualValue',
    ];

    supplierLookup = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    beneficiaryLookup = new DefaultAutoCompleteModel(this.beneficiarySrv, 'id', 'denomination');

    displayedColumns = this.DEF_COLS;
    form = this.fb.group( {
        reference:         [''],
        reference2:        [''],
        description:       [''],
        supplier:          [0],
        beneficiary:       [0],
        accountNo:         [''],
        serialNo:          [''],
        acquisitionDate:   [this.EPOCH],
        serviceDate:       [this.EPOCH],
        acquisitionDateTo: [this.FUTURE],
        serviceDateTo:     [this.FUTURE],
        acquisitionValue:  [0],
        location:          [0]
    });
    officeAutoCompleteModel  = new OfficeAutoComplete(this.officeSrv);

    constructor(public listSrv: AssetsService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override defReportSrv: DefaultReportService,
                public override confirmationSrv: ConfirmationDialogService,
                public override pagPersistSrv: PaginatorPersistenceService,
                private beneficiarySrv: ConsumerService,
                private supplierSrv: SupplierService,
                private isParamSrv: IsParamService,
                private locationSrv: AssetLocationService,
                private officeSrv: OfficeService,
                private dialog: MatDialog,
                private fb: UntypedFormBuilder,
                private langSrv: LanguageService) {
        super(listSrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
            'ASSETS');
        this.pagination.pageSize = 10;
    }

    override preload(): Observable<any> {
        return this.isParamSrv
            .is('AQS')
            .pipe(tap(res => res? this.displayedColumns = this.AQS_COLS : this.DEF_COLS));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.editButton.visible = false;
        this.addButton.visible = false;
        this.shellSrv.disableSearch();
        this.subscriptions.push(
            this.form
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                )
                .subscribe(_ => this.refresh()));
    }


    openSearchDlg() {
        const dialogRef = this.dialog.open(OfficeSearchComponent,
            {
                disableClose: true,
                data: {id: 0, description: null}
            });
        dialogRef
            .afterClosed()
            .subscribe(res => this.form.controls['location']?.setValue(res?.id));
    }


    override getPage(): Observable<Asset[]> {
        return this.listSrv
            .search(this.pagination, <SearchCriteria>this.form.value)
            .pipe(tap(res => this.pagination.elementCount = res.itemCount),
                  map(res => res.body));
    }

    override ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }

    private format(key: string, value: string) {
        return (key.indexOf('Date') > 0) ? this.langSrv.formatDate(value) : value;
    }

    public override excel() {
        const criteria = <SearchCriteria>this.form.value;
        const params = Object.entries(criteria)
            .filter(([key, value]) => value && value !== '' && value !== 0)
            .reduce((a, b) => a.set(b[0], this.format(b[0], b[1])), new HttpParams());

        this.entitySrv
            .excel(this.form.value['reference'])
            .subscribe(blob => {
                // saveAs(blob, this.entitySrv.constructor.name + '.xlsx');
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = this.entitySrv.constructor.name + '.xlsx';
                link.click();
                setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
            });
    }
}

class OfficeAutoComplete extends DefaultAutoCompleteModel<Office> {
    constructor(public override entitySrv: BaseEntityService<Office>) {
        super(entitySrv, 'id', 'description');
    }

    override toString = (x:Office) => x ? `${x.description.substring(0, 50)} (${x.code})`  : null;
}
