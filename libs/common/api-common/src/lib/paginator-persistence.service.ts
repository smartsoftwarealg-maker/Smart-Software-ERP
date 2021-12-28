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

    get(title: string): PaginationModel {
        return this.paginatorMap.get(title) || PaginationModel.newInstance();
    }

    set(title: string, model: PaginationModel) {
        this.paginatorMap.set(title, model);
    }
}

