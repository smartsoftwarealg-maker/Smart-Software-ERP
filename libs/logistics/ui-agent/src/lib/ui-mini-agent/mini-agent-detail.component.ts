import {Component} from '@angular/core';
import {AgentDetailComponent} from '../agent-detail.component';
import {Observable} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";


@Component({
    selector: 'ss-mini-agent-detail',
    styleUrls: ['./mini-agent-detail.component.scss'],
    templateUrl: './mini-agent-detail.component.html'
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
}
