import {Injectable} from '@angular/core';
import {Tag} from '../tag';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseEntityService<Tag> {

  constructor(public http: HttpService) {
    super(http, '/warch/tags');
  }
}
