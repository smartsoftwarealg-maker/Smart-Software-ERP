import { Component, OnInit } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { DIVISIONS_URL, Division } from '@ss/common/api-organizations';

@Component({
    selector: 'ss-organizations',
    styleUrls: ['./organizations.component.scss'],
    templateUrl: 'organizations.component.html'
})
export class OrganizationsComponent implements OnInit {

    constructor(private httpSrv: HttpService) { }

    title = '';

    type = 'OrgChart';

    data: any[] = [];

/*    data = [
        // {v: id, f = text}, parent, tooltip
        [{ v: 'Mike2', f: 'Mike' }, '', 'The President'],
        [{ v: 'Jim', f: 'Jim' }, 'Mike2', 'VP'],
        [{ v: 'ID', f: 'Some nice text' }, 'Mike2', ''],
        [{ v: 'Bob', f: 'Some nice text 2' }, 'Jim', 'Bob Sponge'],
        [{ v: 'id2_lol', f: 'text' }, 'Bob', '']
    ];
    */

    columnNames = ["Name", "Manager", "Tooltip"];

    options = {
        allowHtml: true
    };
    width = 550;
    height = 400;

    ngOnInit() {
        this.httpSrv.get<Division[]>(DIVISIONS_URL)
            .subscribe((divs: Division[]) => {
                this.data = divs.map(d => [{v: d.id + '', f: d.description}, '', '']);
            });
    }
}