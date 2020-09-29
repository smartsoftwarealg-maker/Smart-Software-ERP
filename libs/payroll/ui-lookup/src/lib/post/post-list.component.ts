import { Component } from '@angular/core';
import { Post, PostService } from '@ss/payroll/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-post-list',
    styleUrls: ['./post-list.component.scss'],
    templateUrl: './post-list.component.html'
})
export class PostListComponent extends BaseEntityListComponent<Post> {

    displayedColumns = ['description'];

    constructor(
        public postSrv: PostService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(postSrv, shellSrv, snackBarSrv, route, router, 'PAYROLL_POSTS');
    }

}
