import { Component, inject, OnInit } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PostElement, PostElementsService } from '@ss/common/api-lookup';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-post-elements-detail',
    styleUrl: './post-elements-detail.component.scss',
    templateUrl: './post-elements-detail.component.html',
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatMiniFabButton,
        MatError,
        TranslateDirective,
    ],
})
export class PostElementsDetailComponent
    extends BaseChildEntityDetailComponent<PostElement>
    implements OnInit
{
    private formBuilder = inject(UntypedFormBuilder);

    constructor(protected detailSrv: PostElementsService) {
        super(detailSrv, 'PostElementsDetail');
    }

    setupForm(p: PostElement): UntypedFormGroup {
        return this.formBuilder.group({
            id: [p.id],
            parentId: [p.parentId || this.entitySrv.getParentId()],
            element: [p.element],
            description: [p.description, Validators.required],
            amount: [p.amount, Validators.required],
        });
    }
}
