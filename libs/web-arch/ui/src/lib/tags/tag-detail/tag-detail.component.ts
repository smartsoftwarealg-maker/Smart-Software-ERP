import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {slideToLeft} from '../../animations';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormSaveToolbarComponent, MyHttpService} from 'shared-module';
import {RoleService} from 'shared-module/app/modules/roles/role.service';
import {TagService} from '../tag-list/tag.service';

@Component({
  selector: 'ss-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css'],
  animations: [slideToLeft]
})
export class TagDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @ViewChild(FormSaveToolbarComponent) saveToolbar: FormSaveToolbarComponent;

  saveAction = this.save.bind(this);
  loaded = false;
  public form: FormGroup = null;
  private id: number = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpSrv: MyHttpService,
              private srv: TagService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loaded = false;
    this.srv.setDetailCloser(this.cancel.bind(this));
    this.route.params.pipe(
      tap(res => this.id = +res['id']),
      switchMap(() => this.srv.getById(this.id))
    ).subscribe(res => {
      this.form = this.fb.group({
          id: [this.id],
          description: [res.description]
        }
      );
      this.loaded = true;
    }, err => {
      this.cancel();
      throw err;
    });
  }

  save(): Observable<any> {
    return this.srv.save(this.form.value)
      .pipe(tap(res => {
        if (!this.form.value.id) {
          this.form.value.id = +res;
        }
      }));
  }

  cancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
