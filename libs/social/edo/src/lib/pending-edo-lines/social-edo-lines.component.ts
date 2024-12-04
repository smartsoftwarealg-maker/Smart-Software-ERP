import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import {EDOLine} from '@social/social-api';
import { EdoLineService } from '@social/social-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-social-edo-lines',
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        TranslateDirective,
        MaterialModule
    ],
    templateUrl: './social-edo-lines.component.html',
    styleUrl: './social-edo-lines.component.scss',
})
export class SocialEdoLinesComponent extends BaseChildEntityListComponent<EDOLine> {
    lineRemoved = output<number>();
    override displayedColumns = [
        'action',
        'firstName',
        'lastName',
        'amount',
    ];

    constructor(public entitySrv: EdoLineService) {
        super(entitySrv, 'SocialAid');
    }

    remove(line: EDOLine) {
        this.entitySrv
            .remove(line?.id)
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                    this.lineRemoved.emit(res.count);
                }
            });
    }
}
