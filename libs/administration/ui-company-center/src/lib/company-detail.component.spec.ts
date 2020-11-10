import {CompanyCenterTreeComponent} from "./company-center-tree.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {CommonModule} from "@angular/common";
import {HttpService, MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule, LanguageService} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpTestService} from "../test/http-test.service";
import {LanguageTestService} from "../test/language-test.service";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";

describe("BankDetailComponent", () => {

    let component: CompanyCenterTreeComponent;
    let fixture: ComponentFixture<CompanyCenterTreeComponent>;
    let loader: HarnessLoader;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [CompanyCenterTreeComponent],
            imports: [
                CommonModule,
                MaterialModule,
                CommonUiLangModule,
                UiPaginationModule,
                ReactiveFormsModule,
                RouterTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: HttpService, useClass: HttpTestService},
                {provide: LanguageService, useClass: LanguageTestService}
            ]
        });

        fixture = TestBed.createComponent(CompanyCenterTreeComponent);

        component = fixture.componentInstance;

        loader = TestbedHarnessEnvironment.loader(fixture);

    });


    it('should load companies by page', () => {


    });

    it('should load centers by virtual scroll', () => {


    });

    it('should load centers by virtual scroll', () => {


    });


});

