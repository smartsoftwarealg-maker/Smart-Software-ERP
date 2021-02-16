import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {ArticleService} from "@ss/stock/api-article";
import {PaginationModel} from "@ss/common/ui-pagination";
import {Total, TotalService} from "@ss/stock/api-totals";
import {combineLatest} from "rxjs";

@Component({
    selector: 'ss-total',
    styleUrls: ['./total.component.scss'],
    templateUrl: './total.component.html'
})
export class TotalComponent implements OnInit {
    public readonly pagination = PaginationModel.newInstance();


    data: Total[];

    displayedColumns = [
        "description",
        "value",
    ];


    constructor(public totalSrv: TotalService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleSrv: ArticleService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        combineLatest([this.route.data, this.route.params])
            .subscribe(([data, param]) => {
                const documentId = +param.id;
                const documentUrl = data.documentURL;
                if (documentId) {
                    this.totalSrv.setParentsIds(documentId, documentUrl);
                    this.loadTotal();
                }
            });
    }

    loadTotal() {
        this.totalSrv.getPage(this.pagination)
            .subscribe((x: Total[]) => this.data = x);
    }
}
