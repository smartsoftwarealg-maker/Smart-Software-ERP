import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpProgressEvent } from '@angular/common/http';
import { catchError, filter, last, map, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {LoginInfo, PaginationModel} from './models';
import {AppConfigService} from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class PaginatorPersistenceService {
    private paginatorMap = new Map<string, PaginationModel>();
    private searchMap    = new Map<string, string>();

    get(title: string): PaginationModel {
        return this.paginatorMap.get(title) || PaginationModel.newInstance();
    }

    set(title: string, model: PaginationModel, search: string) {
        this.paginatorMap.set(title, model);
        this.searchMap.set(title, search);
    }

    getSearch(title: string) {
        return this.searchMap.get(title) || '';
    }
}

