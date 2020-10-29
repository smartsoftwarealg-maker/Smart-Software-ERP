import {AgentDetailComponent} from "@ss/logistics/ui-agent";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Agent} from "@ss/logistics/api-agent";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpService, MaterialModule} from "@ss/common/api-common";
import {LanguageService, UiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {RouterTestingModule} from "@angular/router/testing";
import {LookupTestService} from "../test/lookup-test.service";
import {LookupsService} from "@ss/common/api-lookup";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LanguageTestService} from "../test/language-test.service";
import {HttpTestService} from "../test/http-test.service";

describe("AgentDetailComponent", () => {

    let component: AgentDetailComponent;
    let fixture: ComponentFixture<AgentDetailComponent>;
    let formTemplate: HTMLElement;

    let agent: Agent = {
        activity: 1,
        address: "Agent first address",
        address2: "Agent second address",
        address2Ar: "Agent first address arabic",
        addressAr: "Agent second address arabic",
        agentType: 1,
        articleNo: "Article 01",
        bank: "Bank 01",
        bankAccount: "Bank Account 01",
        blockingReason: "Blocking reason 01",
        capital: "Capital 01",
        checkDueDays: 10,
        city: 1,
        code: "2",
        commRegister: "Comm Register 01",
        companyType: 1,
        contact: "Contact 01",
        country: 1,
        currency: 2,
        customerCode: "Customer Code 01",
        debtLimit: 20,
        debtTerm: 3,
        denomination: "Denomination 01",
        denominationAr: "Denomination ar",
        email: "email@email.com",
        fax: "fax",
        fiscalID: "fiscal id",
        id: 1,
        info: "info",
        isInternal: true,
        mobile: "0669788862",
        nif: "nif",
        nis: "nif",
        payMode: 1,
        phone: "0317618956",
        price: 51.06,
        recordBlocked: true,
        stampPayable: true,
        subcontractor: false,
        swift: "swift 01",
        taxPayable: true,
        tin: "tin",
        website: "website 01",
    } as Agent


    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [AgentDetailComponent],
            imports: [
                CommonModule,
                MaterialModule,
                UiLangModule,
                UiPaginationModule,
                ReactiveFormsModule,
                RouterTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: HttpService, useClass: HttpTestService},
                {provide: LookupsService, useClass: LookupTestService},
                {provide: LanguageService, useClass: LanguageTestService}
            ]
        });

        fixture = TestBed.createComponent(AgentDetailComponent);

        component = fixture.componentInstance; // BannerComponent test instance

        component.form = component.setupForm({} as Agent)

        fixture.detectChanges();

        formTemplate = fixture.nativeElement.querySelector('form');

        component.preload().subscribe()

    });


    it("should load agentType table", () => {
        expect(component.agentTypes.length).toBe(5)
    });

    it("should load payMode table", () => {
        expect(component.payModes.length).toBe(8)
    });

    it("should load activity table", () => {
        expect(component.agentTypes.length).toBe(5)
    });

    it("should load companyType table", () => {
        expect(component.companyTypes.length).toBe(49)
    });

    it("should load city table", () => {
        expect(component.cities.length).toBe(5)
    });

    it("should load country table", () => {
        expect(component.countries.length).toBe(4)
    });

    it("should load currency table", () => {
        expect(component.currencies.length).toBe(5)
    });

    it("should create an instance for form", () => {
        expect(component.form).not.toBeNull()
    });

    it("should display form view", () => {
        expect(formTemplate).not.toBeNull()
    });

    it('form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('customerCode field validity', () => {
        let customerCode = component.form.controls['customerCode'];
        expect(customerCode.valid).toBeFalsy();
    });

    it('denomination field validity', () => {
        let denomination = component.form.controls['denomination'];
        expect(denomination.valid).toBeFalsy();
    });

    it('agentType field validity', () => {
        let agentType = component.form.controls['agentType'];
        expect(agentType.valid).toBeFalsy();
    });

    it('submitting a form emits a agent', () => {
        expect(component.form.valid).toBeFalsy();

        component.form.setValue(agent)

        expect(component.form.valid).toBeTruthy();

        expect(agent).toStrictEqual(component.form.value);
    });



});
