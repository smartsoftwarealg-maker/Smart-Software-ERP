import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Class, ClassService} from '@ss/common/api-lookup';
import {map, Observable} from 'rxjs';

@Component({
    selector: 'ss-main-page',
    standalone: true,
    imports: [CommonModule],
    providers: [ClassService],
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    private classSrv = inject(ClassService);
    classes$: Observable<Class[]> = null;
    constructor() {}

    ngOnInit(): void {
        this.classes$ = this.classSrv
            .getList(0, 100)
            .pipe(map(res => res.body));
    }
}
