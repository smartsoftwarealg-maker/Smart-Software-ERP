import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpService, MaterialModule} from "@ss/common/api-common";
import {HttpTestService} from "../test/http-test.service";
import {Agent, AgentService} from "@ss/logistics/api-agent";
import {CommonModule} from "@angular/common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AutoCompleteModel} from "./auto-complete-model";
import {UiAutoCompleteComponent} from './ui-auto-complete.component';


describe('AutoCompleteComponent', () => {
    let component: UiAutoCompleteComponent;
    let fixture: ComponentFixture<UiAutoCompleteComponent>;
    let testingService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UiAutoCompleteComponent],
            imports: [
                CommonModule,
                MaterialModule,
                CommonUiLangModule,
                UiPaginationModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: HttpService, useClass: HttpTestService},
                AgentService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiAutoCompleteComponent);
        testingService = TestBed.inject(AgentService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data on filter change', (done) => {
        component.model = new AutoCompleteModel<Agent>(testingService);
        component.descriptionFieldName = 'denomination';
        component.model.getDataByFilter('')
            .subscribe(x => {
                expect(x.length).toBeGreaterThan(0);
                done();
            })

    })

    it('should clear input when no option is selected', () => {

    });

    it('should correspond to form validation', () => {

    });


});
