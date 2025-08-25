import { Component, inject } from '@angular/core';
import {
    CMMSWorkDetail,
    INSPECTION,
    IS_INSPECTION,
    Work,
    WORK_TYPES,
} from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { CMMSWorkOrderArticleService } from '../services/c-m-m-s-work-order-article.service';
import { CMMSWorkPersonService } from '../services/c-m-m-s-work-person.service';
import { CMMSInspectionOrderService } from '../services/c-m-m-s-inspection-order.service';
import { CMMSInspectionService } from '../services/c-m-m-s-inspection.service';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-work-order-detail',
    templateUrl: './inspection-order-detail.component.html',
    styleUrls: ['./inspection-order-detail.component.css'],
    standalone: true,
    imports: [
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        DatePickerComponent,
        MatButtonModule,
        MaterialModule,
        RouterOutlet,
        UiAutoCompleteComponent,
        TranslatePipe,
        TranslateDirective,
    ],
})
export class InspectionOrderDetailComponent extends CMMSWorkDetail {
    inspectionSrv = inject(CMMSInspectionService);
    private workPersonSrv = inject(CMMSWorkPersonService);
    private articleSrv = inject(CMMSWorkOrderArticleService);
    private router = inject(Router);

    private URLS = ['inspections'];
    readonly INSPECTION_PANEL = 0;

    cmmsTypes = WORK_TYPES.filter((e) => e.id === INSPECTION);

    activePanel = -1;

    constructor(
        public override entitySrv: CMMSInspectionOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            DOC_WORK_ORDER,
            'CMMS_INSPECTION_ORDERS',
            IS_INSPECTION,
        );
    }

    override loadEntity(id: number): Observable<Work> {
        this.inspectionSrv.setParentId(id);
        this.workPersonSrv.setParentId(id);
        this.articleSrv.setParentId(id);
        return super.loadEntity(id);
    }

    showPanel(index: 0 | 1) {
        this.activePanel = index;
        const url = this.URLS[index];
        if (this.router.url.indexOf(url) < 0) {
            this.router.navigate([url], { relativeTo: this.route }).then();
        }
    }
}
