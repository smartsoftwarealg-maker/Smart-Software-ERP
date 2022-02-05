import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Language} from 'angular-l10n';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {tap, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormSaveToolbarComponent} from 'shared-module';
import {LookupsService} from './lookups.service';
import {slideToRight} from '../animations';

@Component({
  selector: 'ss-lookups-detail.component',
  templateUrl: './lookups-detail.component.html',
  styleUrls: ['./lookups-detail.component.css'],
  animations: [slideToRight]
})
export class LookupsDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @Language() lang;
  @ViewChild(FormSaveToolbarComponent) saveToolbar: FormSaveToolbarComponent;
  loaded = false;
  public saveAction = this.save.bind(this);
  public form: FormGroup = null;
  private id: number = null;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: LookupsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loaded = false;
    this
      .route
      .params
      .pipe(tap(res => this.id = +res['id']),
        switchMap(rs => this.service.getById(this.id)))
      .subscribe(res => {
        this.form = this.fb.group({
            id: [this.id],
            description: [res.description, Validators.required],
          }
        );
        this.loaded = true;
      });
  }

  save(): Observable<any> {
    return null;
  }

  cancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
