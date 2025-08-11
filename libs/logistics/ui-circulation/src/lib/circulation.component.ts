import {Component, OnInit,} from '@angular/core';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {Circulation, CirculationService} from '@ss/logistics/api-circulation';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import {LanguageService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-circulation',
    styleUrls: ['./circulation.component.scss'],
    templateUrl: './circulation.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        PaginationComponent
    ]

})
export class CirculationComponent implements OnInit {

    public readonly pagination = PaginationModel.newInstance();

    data: Circulation[];
    articleReference: string;
    articleId: number;


    displayedColumns = [
        'document',
        'number',
        'date',
        'qty',
        'price',
        'pPrice',
        'customer',
        'storeName',
        'store'
    ];


    constructor(public circulationSrv: CirculationService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                // public override articleSrv: ArticleService,
                public langServ: LanguageService) {}


    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            // if no reference found go for id
            this.articleReference = x['articleReference'];
            this.articleId = +x['articleId'];
            this.loadCirculation();
        });

        this.pagination.onChange = () => this.loadCirculation();
    }

    loadCirculation() {
        const loader: Observable<Circulation[]> = this.articleReference ?
            this.loadByReference(this.articleReference) : this.loadById(this.articleId || 0);
        this.load(loader);
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
