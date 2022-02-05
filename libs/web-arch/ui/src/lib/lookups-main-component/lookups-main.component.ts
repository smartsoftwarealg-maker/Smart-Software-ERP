import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslationService} from 'angular-l10n';
import {GenericDataService, GenericDataSource, MyHttpService, PaginationModel, Right, SortEvent, UserService} from 'shared-module';
import {ActivatedRoute, Router} from '@angular/router';
import {ILookup} from 'shared-module/app/modules/lookups-module/ILookup';
import {LookupsMainDatasource} from './lookups-main-datasource';
import {LookupsMainService} from './lookups-main-service';

@Component({
  selector: 'ss-lookups-main-component',
  templateUrl: './lookups-main.component.html',
  styleUrls: ['./lookups-main.component.css']
})
export class LookupsMainComponent implements OnInit {
  public displayedColumns = ['description'];
  public pModel: PaginationModel;
  public filter: string = null;
  public sort: string = null;
  public selectedId: number = null;
  public rights: Right = null;
  public selectedURL: string;
  public dataSource: LookupsMainDatasource;

  constructor(protected snackBar: MatSnackBar,
              protected trans: TranslationService,
              protected service: UserService,
              protected route: Router,
              protected parent: ActivatedRoute,
              protected http: MyHttpService) {
    const url = '/warch/lookups';
    this.dataSource = new LookupsMainDatasource(new LookupsMainService(http));
    this.pModel = {page: 1, pageSize: 5, elementsCount: this.dataSource.itemCount, scroll: 1};
    this.dataSource
      .load(0, this.pModel.pageSize, null, null)
      .subscribe(cnt => {
        this.pModel.elementsCount = cnt;
      });
  }

  ngOnInit(): void {
  }

  select(id: number): void {
    this.selectedId = id;
  }

  public pageChange(model: PaginationModel) {
    if (this.pModel.page !== model.page || this.pModel.pageSize !== model.pageSize) {
      this.select(0);
      this.pModel.page = model.page;
      this.pModel.scroll = model.scroll;
      this.pModel.pageSize = model.pageSize;
      this.afterPageChange();
      this.dataSource.filter(x => false);
      this.dataSource
        .load(model.page, model.pageSize, this.filter, this.sort)
        .subscribe(cnt => {
          this.pModel.elementsCount = cnt;
        });
    }
  }

  public afterPageChange(): void {
  }

  onFilter(str: string): void {
   if (typeof str === 'string') {
      this.filter = str && str.length > 0 ? str : null;
      this.dataSource.filter(x => false);
      this
        .dataSource
        .load(this.pModel.page, this.pModel.pageSize, this.filter, this.sort)
        .subscribe(cnt => this.pModel.elementsCount = cnt);
    }
  }

  sortData(event: SortEvent) {
    const sign = event && event.direction === 'asc' ? '' : '-';
    this.sort = event ? sign + event.active : null;
    this.dataSource.filter(x => false);
    this
      .dataSource
      .load(this.pModel.page, this.pModel.pageSize, this.filter, this.sort)
      .subscribe(cnt => this.pModel.elementsCount = cnt);
  }

  refresh(str: string) {
    this.filter = str || '';
    this.dataSource.filter(_ => false);
    this
      .dataSource
      .load(this.pModel.page, this.pModel.pageSize, this.filter, this.sort)
      .subscribe(cnt => this.pModel.elementsCount = cnt);
  }

  edit(): void {
    this.route.navigate(['.', this.selectedId], {relativeTo: this.parent});
  }

  add(): void {
    this.select(0);
    this.route.navigate(['.', 0], {relativeTo: this.parent});
  }

  cancel(): void {
    this.route.navigate(['../'], {relativeTo: this.parent});
  }

  showSaveMessage() {
    this.openSnackBar(this.trans.translate('RECORD_SAVED'));
  }

  showDeletedMessage() {
    this.openSnackBar(this.trans.translate('RECORD_DELETED'));
  }

  openSnackBar(message: string) {
    this.snackBar.open(this.trans.translate(message), null, {
      duration: 2000,
    });
  }
  selectURL(url: string): void {
    this.selectedURL = url;
    this.route.navigate(['detail'], { relativeTo: this.parent, queryParams: {id: this.selectedId } });
  }
}
