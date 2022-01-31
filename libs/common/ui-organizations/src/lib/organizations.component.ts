import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ss-organizations',
    styleUrls: ['./organizations.component.scss'],
    templateUrl: 'organizations.component.html'
})
export class OrganizationsComponent implements OnInit {

        title = '';
        type = 'OrgChart';
        data = [
            // {v: id, f = text}, parent, tooltip
           [{v:'Mike2', f:'Mike'}, '', 'The President'],
           [{v:'Jim', f:'Jim'}, 'Mike2', 'VP'],
           ['Alice', 'Mike2', ''],
           ['Bob', 'Jim', 'Bob Sponge'],
           ['Carol', 'Bob', '']
        ];
        columnNames = ["Name","Manager","Tooltip"];
        options = {   
           allowHtml: true
        };
        width = 550;
        height = 400;

        ngOnInit() { }
}