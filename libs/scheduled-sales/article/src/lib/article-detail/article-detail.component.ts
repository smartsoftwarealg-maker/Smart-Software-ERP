import { Component, inject, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ImageModel } from '@ss/common/ui-image-input';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import {
    ClassService,
    LookupsService,
    TypeService,
    UnitService,
    Vat,
    VatService,
} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    AbstractControl,
    ReactiveFormsModule,
    UntypedFormBuilder,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
    Article,
    SSArticleService,
} from '@ss/scheduled-sales/api-scheduled-sales';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ColorPickerDirective } from 'ngx-color-picker';

@Component({
    selector: 'ss-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        RouterModule,
        UiAutoCompleteComponent,
        ColorPickerDirective,
    ],
})
export class ArticleDetailComponent
    extends BaseEntityDetailComponent<Article>
    implements OnInit
{
    private classSrv = inject(ClassService);
    private typeSrv = inject(TypeService);
    private unitSrv = inject(UnitService);

    imageModel: ImageModel;
    aid = 0;
    classLookup = new DefaultAutoCompleteModel(this.classSrv);
    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);
    unitLookup = new DefaultAutoCompleteModel(this.unitSrv);
    color: string = '';
    vats: Vat[];
    selectedRow: Article;
    private formValidator: ValidatorFn = (
        group: AbstractControl,
    ): ValidationErrors | null => {
        const discountFF = group.get('discount');
        const invalid =
            group.get('discountable').value === false && discountFF.value > 0.0;

        const errors = invalid ? { invalid: true } : null;
        group.get('discount').setErrors(errors);

        return errors;
    };

    constructor(
        public articleSrv: SSArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public router: Router,
    ) {
        super(
            articleSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'STOCK_EDIT_ARTICLE',
        );
        this.imageModel = new ImageModel(this.httpSrv);
    }

    override finishLoading(e: Article) {
        super.finishLoading(e);
        this.selectedRow = e;
    }

    public override setupForm(a: Article) {
        // this.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(a.id), false);
        const color = (a?.rgb || 0).toString(16);
        this.color = '#' + '0'.repeat(6-color.length) + color; // hex color must contain exactly 6 digits
        this.aid = a.id;
        const form = this.formBuilder.group({
            description2: [a.description2, Validators.required],
            id: [a.id],
            pClass: [a.pClass],
            aType: [a.aType],
            price1: [a.price1 || 0],
            discount: [
                a.discount || 0,
                [Validators.max(50), Validators.min(0)],
            ],
            appId: [a.appId || 1],
            blocked: [a.blocked || false],
            discountable: [a.discountable || false],
            accountNo: [a.accountNo],
            rgb: [a.rgb || 0],
            reference: [a.reference, Validators.required],
            vat: [a.vat],
            unit: [a.unit, Validators.required],
        });
        form.setValidators([this.formValidator]);
        return form;
    }

    public override preload(): Observable<any> {
        return this.lookupsSrv.getVats().pipe(tap((res) => (this.vats = res)));
    }

    select(c: string) {
        this.color = c;
        this.form.get('rgb').setValue(parseInt(c.substring(1), 16));
    }
}
