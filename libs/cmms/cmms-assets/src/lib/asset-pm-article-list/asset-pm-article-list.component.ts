import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

import { MatTableModule } from '@angular/material/table';

import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { PMPart } from '../services/asset-api';
import { CmmsAssetPmArticleService } from '../services/cmms-asset-pm-article.service';
import { AssetPmService } from '../services/asset-pm.service';
import { PM } from '@ss/cmms/cmms-api';

@Component({
    selector: 'ss-work-order-article-list',
    standalone: true,
    imports: [
        CommonModule,

        MatTableModule,

        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule
    ],
    templateUrl: './asset-pm-article-list.component.html',
    styleUrls: ['./asset-pm-article-list.component.css'],
})
export class AssetPmArticleListComponent extends BaseChildEntityListComponent<PMPart> {
    private pmSrv = inject(AssetPmService);
    // private dialog = inject(MatDialog);

    pmLookup = new DefaultAutoCompleteModel(this.pmSrv);

    override displayedColumns = ['reference', 'description', 'qty'];
    parentId = new FormControl<number>(0);
    constructor(protected override detailSrv: CmmsAssetPmArticleService) {
        super(detailSrv, 'PMPart');
        this.pmLookup.onObjectSelected = p => this.onPM(p);
    }

    onPM(p: PM) {
        this.detailSrv.setParentId(p?.id || 0);
        this.refresh();
    }
    // reserve() {
    //     const dialogRef = this.dialog.open(WorkOrderArticleReservationComponent, {
    //         width: '60em',
    //         height: '600px',
    //         data: { data: this.data$, id: this.detailSrv.getParentId() }
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result && result['success']) {
    //             this.snackBarSrv.showSuccessMessage();
    //         } else {
    //             this.snackBarSrv.showFailureMessage();
    //         }
    //     });
    // }
}
