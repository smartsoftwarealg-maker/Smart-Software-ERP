import { Component, inject } from '@angular/core';
import { CMMSWorkDetail, Work } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { CMMSWorkOrderArticleService } from '../services/c-m-m-s-work-order-article.service';
import { CMMSWorkPersonService } from '../services/c-m-m-s-work-person.service';
import { CMMSInspectionOrderService } from '../services/c-m-m-s-inspection-order.service';

@Component({
    selector: 'ss-work-order-detail',
    templateUrl: './inspection-order-detail.component.html',
    styleUrls: ['./inspection-order-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatTableModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule,
        RouterOutlet
    ]
})
export class InspectionOrderDetailComponent extends CMMSWorkDetail {
    private workPersonSrv = inject(CMMSWorkPersonService);
    private articleSrv = inject(CMMSWorkOrderArticleService);
    private router = inject(Router);

    private URLS = ['inspections'];
    readonly INSPECTION_PANEL = 0;

    activePanel = -1;

    constructor(
        public override entitySrv: CMMSInspectionOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            DOC_WORK_ORDER,
            'CMMS_INSPECTION');
    }

    override loadEntity(id: number): Observable<Work> {
        this.workPersonSrv.setParentId(id);
        this.articleSrv.setParentId(id);
        return super.loadEntity(id);
    }

    showPanel(index: 0|1) {
        this.activePanel = index;
        const url = this.URLS[index];
        if (this.router.url.indexOf(url) < 0) {
            this.router.navigate([url], { relativeTo: this.route }).then();
        }
    }
}
