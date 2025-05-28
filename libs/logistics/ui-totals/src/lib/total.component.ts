import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/master-data/api-article';
import {PaginationModel} from '@ss/common/api-common';
import {Total, TotalService} from '@ss/logistics/api-totals';
import {LanguageService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-total',
    styleUrls: ['./total.component.scss'],
    templateUrl: './total.component.html',
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DecimalPipe
    ]
})
export class TotalComponent implements OnInit {

    public readonly pagination = PaginationModel.newInstance();

    data: Total[];

    displayedColumns = [
        'description',
        'value',
    ];


    constructor(public totalSrv: TotalService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleSrv: ArticleService,
                public langSrv: LanguageService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(param => {
            const documentId = +param['documentId'];

            if (documentId) {
                this.totalSrv.setParentsIds(documentId);
                this.loadTotal();
                this.pagination.onChange = () => this.loadTotal();
            }
        });
    }

    loadTotal() {
        this.totalSrv.getPage(this.pagination)
            .subscribe((list: Total[]) => {
                this.data = list.map(e => ({ description: this.langSrv.translate(e.description), value: e.value }));
                if (list.length > 1 && list[1].description?.startsWith('LOGISTICS_DISCOUNT')) {
                    const tmp =  ((+this.data[1].value / (+this.data[0].value)) * 100).toFixed(2);
                    this.data[1].description = this.data[1].description + ' ' + tmp + '%';
                    console.log(this.data[1].description);
                }
            });
    }
}
