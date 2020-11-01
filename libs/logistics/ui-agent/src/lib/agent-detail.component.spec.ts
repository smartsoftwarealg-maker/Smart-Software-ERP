import {AgentDetailComponent} from "@ss/logistics/ui-agent";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Agent, AgentService} from "@ss/logistics/api-agent";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpService, MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule, LanguageService} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {RouterTestingModule} from "@angular/router/testing";
import {LookupTestService} from "../test/lookup-test.service";
import {LookupsService} from "@ss/common/api-lookup";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LanguageTestService} from "../test/language-test.service";
import {HttpTestService} from "../test/http-test.service";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatCheckboxHarness} from "@angular/material/checkbox/testing";
import {MatSelectHarness} from "@angular/material/select/testing";
import {MatExpansionPanelHarness} from "@angular/material/expansion/testing";
import {AgentTestService} from "../test/agent-test.service";

describe("AgentDetailComponent", () => {

    let component: AgentDetailComponent;
    let fixture: ComponentFixture<AgentDetailComponent>;
    let formTemplate: HTMLElement;
    let loader: HarnessLoader;
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
        price: 1,
        recordBlocked: true,
        stampPayable: true,
        subcontractor: true,
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
                CommonUiLangModule,
                UiPaginationModule,
                ReactiveFormsModule,
                RouterTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: HttpService, useClass: HttpTestService},
                {provide: LookupsService, useClass: LookupTestService},
                {provide: LanguageService, useClass: LanguageTestService},
                {provide: AgentService, useClass: AgentTestService}
            ]
        });

        fixture = TestBed.createComponent(AgentDetailComponent);

        component = fixture.componentInstance; // BannerComponent test instance

        loader = TestbedHarnessEnvironment.loader(fixture);

        component.form = component.setupForm(agent)

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

    it('should load price table', () => {
        expect(component.prices.length).toBe(6)
    });


    it("should create an instance for form", () => {
        expect(component.form).not.toBeNull()
    });

    it("should display form view", () => {
        expect(formTemplate).not.toBeNull()
    });


    it('customerCode field validity', () => {
        requiredFieldTest("customerCode")
    });

    it('currency field validity', () => {
        requiredFieldTest("currency")
    });

    it('price field validity', () => {
        requiredFieldTest("price")
    });

    it('agentType field validity', () => {
        requiredFieldTest("agentType")
    });

    it('denomination field validity', () => {
        requiredFieldTest("denomination")
    });


    it('email field validity', () => {


        let email = component.form.controls['email'];
        // valid when empty
        expect(email.valid).toBeTruthy();

        // invalid email
        email.setValue("invalidemail")
        expect(email.valid).toBeFalsy();

        component.form.markAllAsTouched()
        fixture.detectChanges()

        let formField = formTemplate.querySelector("#email");
        expect(formField.querySelector("mat-error")).not.toBeNull()

        let hasHeaderWarnClass = formField.closest("mat-expansion-panel")
            .classList.contains("b-warn-expansion-panel");

        expect(hasHeaderWarnClass).toBeTruthy();


        // a valid email
        email.setValue("invalid@email")
        expect(email.valid).toBeTruthy();


    });


    it('should update all fields', async () => {

        formTemplate
            .querySelectorAll("[type='text'],[type='email']")
            .forEach((x: HTMLInputElement) => {
                x.value = "updated";
                x.dispatchEvent(new Event('input'));
            })

        formTemplate
            .querySelectorAll("[type='number']")
            .forEach((x: HTMLInputElement) => {
                x.value = "-999";
                x.dispatchEvent(new Event('input'));
            })

        fixture.detectChanges()

        const checkboxHarnesses = await loader.getAllHarnesses(MatCheckboxHarness);
        for (const x of checkboxHarnesses) {
            await x.uncheck()
        }

        const selectHarnesses = await loader.getAllHarnesses(MatSelectHarness);
        for (const x of selectHarnesses) {
            await x.open();
            let options = await x.getOptions();
            await options[options.length - 1].click()
            await x.close()
        }
        fixture.detectChanges()

        let newAgent = {
            "activity": 5,
            "address": "updated",
            "address2": "updated",
            "address2Ar": "updated",
            "addressAr": "updated",
            "agentType": 3,
            "articleNo": "updated",
            "bank": "updated",
            "bankAccount": "updated",
            "blockingReason": "updated",
            "capital": "updated",
            "checkDueDays": -999,
            "city": 5,
            "code": "2",
            "commRegister": "updated",
            "companyType": 18,
            "contact": "updated",
            "country": 4,
            "currency": 5,
            "customerCode": "updated",
            "debtLimit": -999,
            "debtTerm": -999,
            "denomination": "updated",
            "denominationAr": "updated",
            "email": "updated",
            "fax": "updated",
            "fiscalID": "updated",
            "id": 1,
            "info": "updated",
            "isInternal": false,
            "mobile": "updated",
            "nif": "updated",
            "nis": "updated",
            "payMode": 4,
            "phone": "updated",
            "price": 6,
            "recordBlocked": false,
            "stampPayable": false,
            "subcontractor": false,
            "swift": "updated",
            "taxPayable": false,
            "tin": "updated",
            "website": "updated",
        }
        expect(component.form.value).toStrictEqual(newAgent);
    });

    it("should add primary color to expanded panel", async () => {
        let panels = await loader.getAllHarnesses(MatExpansionPanelHarness);
        for (const panel of panels) {
            await panel.expand();
            const host = await panel.host();
            const hasClass = await host.hasClass("b-primary-expansion-panel");
            expect(hasClass).toBeTruthy();
        }
    })

    function requiredFieldTest(name) {
        let field = component.form.controls[name];

        expect(field.valid).toBeTruthy();

        field.setValue(null)

        expect(field.valid).toBeFalsy();


        component.form.markAllAsTouched()
        fixture.detectChanges()

        let formField = formTemplate.querySelector(`#${name}`);
        expect(formField.querySelector("mat-error")).not.toBeNull()

        let hasHeaderWarnClass = formField.closest("mat-expansion-panel")
            .classList.contains("b-warn-expansion-panel");

        expect(hasHeaderWarnClass).toBeTruthy();

    }


});
