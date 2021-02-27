import {Component, OnInit,} from '@angular/core';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Circulation, CirculationService} from "@ss/logistics/api-circulation";
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
    articleReference: string;
    articleId: number;


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
            this.articleReference = x.articleReference;
            this.articleId = +x.articleId;
            this.loadCirculation();
        });

        this.pagination.onChange = () => this.loadCirculation();
    }

    loadCirculation() {
        if (this.articleReference || this.articleId) {
            const loader: Observable<Circulation[]> = this.articleReference ?
                this.loadByReference(this.articleReference)
                : this.loadById(this.articleId);
            this.load(loader);
        } else {
            throw new Error('I could not find an id or a ref, plz fix me');
        }
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
