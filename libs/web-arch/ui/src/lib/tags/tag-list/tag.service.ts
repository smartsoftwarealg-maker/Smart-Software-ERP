import {Injectable} from '@angular/core';
import {Tag} from '../tag';
import {MyHttpService} from 'shared-module';
import {BaseListServiceService} from '../../base-list-service.service';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseListServiceService<Tag> {

  constructor(public http: MyHttpService) {
    super(http, '/warch/tags');
  }

  public emptyObject(): Tag {
    return {id: 0, description: null};
  }
}
