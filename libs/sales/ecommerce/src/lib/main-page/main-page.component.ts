import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription, switchMap, tap} from 'rxjs';
import {HttpService, ImageUploaderUtil} from '@ss/common/api-common';
import {ArticleService, AvailableArticle, AvailableStock} from '@ss/master-data/api-article';
import {ImageModel} from '@ss/common/ui-image-input';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Lookup} from '@ss/common/api-lookup';
import {SalesAdsService} from '../sales-ads.service';
import {ADImage} from '../ecommerce-api';
import {CartService} from '../cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, NgIf, AsyncPipe, DecimalPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { ImageInputComponent } from '@ss/common/ui-image-input';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-main-page',
    providers: [],
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    standalone: true,
    imports: [
        HeaderPageComponent,
        MatList,
        NgFor,
        MatListItem,
        NgIf,
        MatButton,
        TranslateDirective,
        MatCard,
        ImageInputComponent,
        MatIconButton,
        AsyncPipe,
        DecimalPipe,
        TranslatePipe,
    ],
})
export class MainPageComponent implements OnInit, OnDestroy {
    private jobId: any = null;
    private subscriptions: Subscription[] = [];
    private httpSrv    = inject(HttpService);
    private articleSrv = inject(ArticleService);
    private adSrv      = inject(SalesAdsService);
    private router     = inject(Router);
    private route      = inject(ActivatedRoute);
    private filter     = '';

    cartSrv    = inject(CartService);
    uploadUtil = new ImageUploaderUtil();
    articles$: Observable<AvailableStock[]> = null;
    classes$: Observable<Lookup[]>          = null;
    ads: ADImage[] = [];
    adsLoaded = false;
    adIndex = 0;
    selectedId = 0;
    selectedClass = 0;

    constructor() {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
        if (this.jobId) {
            clearInterval(this.jobId);
        }
    }

    ngOnInit(): void {
        this.refresh('');

        this.classes$ = this.articles$
            .pipe(map(res =>  res.map(e => <Lookup> {id: e.classId, description: e.classDescription})));

        this.adSrv
            .getList(0, 5)
            .pipe(map(res => res.body))
            .subscribe(res => {
                this.ads = res;
                this.ads.forEach(e => {
                    this.adSrv
                        .image(e.id)
                        .subscribe(
                            img => {
                                e.imageBlob = img;
                                ImageUploaderUtil.toBase64(img, (s: string) => e.imageSrc = s);
                            });
                });
            });

        this.jobId = setInterval(() => {
                this.adIndex = this.ads.length == 0 ? 0 : ++this.adIndex % this.ads.length;
                this.uploadUtil.imgSrc = this.ads[this.adIndex].imageSrc;
                // ImageUploaderUtil.toBase64(this.ads[this.adIndex].imageBlob, (s: string) => this.uploadUtil.imgSrc = s);
                this.adsLoaded = true;
            },
            5000);
    }

    select(id: number) {
        this.selectedId = id;
    }

    refresh(filter: string) {
        this.filter = filter;
        this.articles$ =
            this.httpSrv
                .init()
                .pipe(switchMap(_ => this.articleSrv.availableStock(this.selectedClass, filter)),
                    tap(res => {
                        res.forEach(s => {
                            s.articles.forEach(a => {
                                a.imageModel = new ImageModel(this.httpSrv);
                                a.imageModel.readOnly = true;
                                a.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(a.partId), false);
                            });
                        })
                    }));
    }

    selectClass(classId: number) {
        this.selectedClass = classId;
        this.refresh(this.filter);
    }

    removeFromCart(a: AvailableArticle) {
        this.cartSrv.removeFromCart(a);
    }

    addToCart(a: AvailableArticle) {
        this.cartSrv.addToCart(a);
    }

    showCart() {
        this.router.navigate(['./cart'], { relativeTo: this.route });
    }
}
