import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {PaginationModel} from '@ss/common/api-common';
import {Total, TotalService} from '@ss/logistics/api-totals';
import {LanguageService} from '@ss/common/api-common';

@Component({
    selector: 'ss-total',
    styleUrls: ['./total.component.scss'],
    templateUrl: './total.component.html'
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
            const documentURL = param['documentURL'];

            if (documentId) {
                this.totalSrv.setParentsIds(documentId, documentURL);
                this.loadTotal();
                this.pagination.onChange = () => this.loadTotal();
            }
        });
    }

    loadTotal() {
        this.totalSrv.getPage(this.pagination)
            .subscribe((list: Total[]) => this.data = list.map(e => ({ description: this.langSrv.translate(e.description), value: e.value }) ));
    }
}
