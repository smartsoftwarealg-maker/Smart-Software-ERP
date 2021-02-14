import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Circulation, CirculationService} from "@ss/stock/api-circulation";
import {ArticleService} from "@ss/stock/api-article";
import {PaginationModel} from "@ss/common/ui-pagination";
import {LanguageService} from "@ss/common/ui-lang";
import {Observable} from "rxjs";

@Component({
    selector: 'ss-circulation',
    styleUrls: ['./circulation.component.scss'],
    templateUrl: './circulation.component.html'
})
export class CirculationComponent implements OnInit {
    public readonly pagination = PaginationModel.newInstance();


    data: Circulation[];

    displayedColumns = [
        "document",
        "number",
        "date",
        "qty",
        "price",
        "pprice",
        "customer",
        "store"
    ];


    constructor(public circulationSrv: CirculationService,
                // public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleSrv: ArticleService,
                public langServ: LanguageService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            // if no reference found go for id
            if (x.reference || +x.id) {
                const loader: Observable<Circulation[]> = x.find ? this.loadByReference(x.find) : this.loadById(+x.id);
                this.load(loader);
            }
        });
    }

    loadById(id: number): Observable<Circulation[]> {
        this.circulationSrv.setParentId(id);
        return this.circulationSrv.getPage(this.pagination, null, null, null);
    }

    loadByReference(reference: string) {
        return this.circulationSrv.loadByReference(this.pagination, null, null, reference);
    }

    load(observable: Observable<Circulation[]>) {
         observable.subscribe((x: Circulation[]) => this.data = x);
    }
}
