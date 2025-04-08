import { Component, inject, OnInit } from '@angular/core';
import {
    PostElement,
    PostElementsService,
    PostService,
} from '@ss/common/api-lookup';
import { NgIf } from '@angular/common';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationModel } from '@ss/common/api-common';

@Component({
    selector: 'ss-post-elements-list',
    templateUrl: './post-elements-list.component.html',
    styleUrl: './post-elements-list.component.scss',
    standalone: true,
    imports: [
        MatTooltip,
        TranslatePipe,
        MatMiniFabButton,
        NgIf,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatCellDef,
        MatHeaderCellDef,
        MatIconButton,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatHeaderRowDef,
        PaginationComponent,
    ],
})
export class PostElementsListComponent
    extends BaseChildEntityListComponent<PostElement>
    implements OnInit
{
    displayedColumns = ['description', 'amount'];
    entitySrv = inject(PostService);

    constructor(public override detailSrv: PostElementsService) {
        super(detailSrv, 'elementsLists');
    }

    showDetail(id: number) {
        this.router.navigate(['elements-detail', id || 0], { relativeTo: this.route.parent, }).then();
    }

    public readonly pagination = PaginationModel.newInstance();
}
