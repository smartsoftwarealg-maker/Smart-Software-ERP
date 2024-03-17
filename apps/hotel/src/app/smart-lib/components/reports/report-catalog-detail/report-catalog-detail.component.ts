import { Component, inject, OnInit } from "@angular/core";
import { ReportCatalogService } from '../report-catalog/report-catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { switchMap, tap } from 'rxjs/operators';
import { ReportCatalog } from '../report-catalog';
import { SnackBarService } from '../../../../common/snack-bar.service';

@Component({
    selector: 'ss-report-catalog-detail',
    templateUrl: './report-catalog-detail.component.html',
    styleUrls: ['./report-catalog-detail.component.css']
})
export class ReportCatalogDetailComponent implements OnInit {
    private fb = inject(FormBuilder);
    form: UntypedFormGroup = null;

    private id: number = null;
    private appName = 'hotel';
    reports: string[] = [];

    constructor(private service: ReportCatalogService,
        private route: Router,
        private snackBarSrv: SnackBarService,
        private parent: ActivatedRoute) {
    }

    ngOnInit() {
        this
            .parent
            .params
            .pipe(
                switchMap(res => {
                    this.id = +res['id'];
                    return this.service.getCatalogById(this.id);
                }),
                tap((res: ReportCatalog) => {
                    this.form = this.fb.group({
                        id: [res.id],
                        fileName: [res.fileName, Validators.required],
                        description: [res.description, Validators.required]
                    });
                }),
                switchMap(res => this.service.loadByApp(this.appName)))
            .subscribe(res => {
                this.reports = this.service.getReports(res, this.appName);
            });
    }

    save() {
        this.service.save(this.form.value).subscribe(res => {
            this.route.navigate(['..'], { relativeTo: this.parent });
            this.snackBarSrv.showSuccessMessage();
        });
    }

    cancel() {
        this.route.navigate(['..'], { relativeTo: this.parent });
    }
}
