import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {slideToLeft} from '../../animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslationService} from 'angular-l10n';
import {BaseListComponent, GenericDataService, GenericDataSource, MyHttpService, UserService} from 'shared-module';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from './tag.service';
import {Tag} from '../tag';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'ss-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  animations: [slideToLeft]
})
export class TagListComponent extends BaseListComponent<Tag> implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;

  public displayedColumns = ['description'];
  public deleteAction = this.deleteRole.bind(this);

  constructor(protected snackBar: MatSnackBar,
              protected trans: TranslationService,
              protected service: UserService,
              protected route: Router,
              protected parent: ActivatedRoute,
              protected http: MyHttpService, protected srv: TagService) {
    super(snackBar, trans, service, route, parent,
      new GenericDataSource<Tag>(new GenericDataService<Tag>(http, srv.url))
    );
    this.pModel.pageSize = 5;
  }

  private deleteRole(): Observable<any> {
    return this.selectedId ? this.srv.removeById(this.selectedId) : of(0);
  }

  select(id: number): void {
    super.select(id);
    this.edit();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.srv.setListUpdater(this.updateList.bind(this));
  }

  ngOnDestroy(): void {
    this.srv.setListUpdater(null);
  }

  public updateList() {
    this.refresh(this.filter);
  }

  public afterPageChange(): void {
    this.srv.closeDetail();
  }
}
