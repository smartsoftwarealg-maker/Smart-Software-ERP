import {UserListService} from '@ss/common/api-users';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {User} from '@ss/common/api-common';
import {map} from 'rxjs/operators';

export class UserLookup extends DefaultAutoCompleteModel<User> {
    constructor(usersSrv: UserListService) {
        super(usersSrv, 'id', 'fullName');
    }


    filter = (filter: string) => this.entitySrv
        .getList(0, 50, filter, this.descriptionField)
        .pipe(map(x => x.body.filter(u => !u.blocked && u.fullName)));
}
