import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * This component is a hack to add a go to parent redirect to angular routes
 */
@Component({
    selector: 'ss-hack-go-back-to-parent',
    template: '',
    standalone: true
})
export class RedirectToParentComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.router.navigate(['..'], { relativeTo: this.route }).then();
    }

}
