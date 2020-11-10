// import {ComponentFixture, TestBed} from "@angular/core/testing";
// import {ReactiveFormsModule} from "@angular/forms";
// import {CommonModule} from "@angular/common";
// import {HttpService, MaterialModule} from "@ss/common/api-common";
// import {UiPaginationModule} from "@ss/common/ui-pagination";
// import {RouterTestingModule} from "@angular/router/testing";
// import {NoopAnimationsModule} from "@angular/platform-browser/animations";
// import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
// import {HarnessLoader} from "@angular/cdk/testing";
// import {CommonUiLangModule, LanguageService} from "@ss/common/ui-lang";
// import {MatInputHarness} from "@angular/material/input/testing";
// import {BankDetailComponent} from "@ss/administration/ui-bank";
// import {DB_AGENT} from "../../../../logistics/ui-agent/src/test/data";
//
// describe("BankDetailComponent", () => {
//
//     let component: BankDetailComponent;
//     let fixture: ComponentFixture<BankDetailComponent>;
//     let loader: HarnessLoader;
//
//     beforeEach(() => {
//
//         TestBed.configureTestingModule({
//             declarations: [BankDetailComponent],
//             imports: [
//                 CommonModule,
//                 MaterialModule,
//                 CommonUiLangModule,
//                 UiPaginationModule,
//                 ReactiveFormsModule,
//                 RouterTestingModule,
//                 NoopAnimationsModule
//             ],
//             providers: [
//                 {provide: HttpService, useClass: HttpTestService},
//                 {provide: LanguageService, useClass: LanguageTestService}
//             ]
//         });
//
//         fixture = TestBed.createComponent(BankDetailComponent);
//
//         component = fixture.componentInstance;
//
//         loader = TestbedHarnessEnvironment.loader(fixture);
//
//         // override so no initialisation happens when calling harness components
//         component.ngOnInit = () => {
//         };
//
//     });
//
//
//     it("should load bank with id 2", done => {
//         component.loadEntity(2).subscribe(x => {
//
//             expect(x).toBeDefined();
//
//             done();
//         });
//     });
//
//     it('should setup form', function () {
//
//         component.form = component.setupForm(DB_BANK);
//
//         expect(component.form).toBeDefined()
//     });
//
//     it("should display form view", () => {
//         component.form = component.setupForm(DB_BANK);
//         fixture.detectChanges();
//         const formTemplate = fixture.nativeElement.querySelector("form");
//
//         expect(formTemplate).not.toBeNull()
//     });
//
//     it('should check that description is required', () => {
//         component.form = component.setupForm(DB_BANK);
//         TestUtilsSpec.shouldBeInvalidWhenEmpty(fixture, component.form, "description")
//     });
//
//     it('should check that code is less than maxLength', () => {
//         component.form = component.setupForm(DB_BANK);
//         TestUtilsSpec.shouldBeInvalidWhenPassMaxLength(fixture, component.form, "code", 4)
//     });
//
//     it('should update all fields in view and save them', async done => {
//         component.form = component.setupForm(DB_BANK);
//         fixture.detectChanges()
//
//         const inputs = await loader.getAllHarnesses(MatInputHarness)
//
//         for (const input of inputs) {
//             const type: string = await input.getType();
//             const host = await input.host();
//             await input.setValue("updt");
//         }
//
//         expect(component.form.value).toStrictEqual(UPDATED_BANK);
//
//         component.entitySrv.update(component.form.value)
//             .subscribe(updated => {
//                 component.entitySrv.get(component.form.value.id)
//                     .subscribe(loaded => {
//                         expect(loaded).toStrictEqual(component.form.value)
//                         component.entitySrv.update(DB_BANK)
//                             .subscribe(d => {
//                                 done();
//                             })
//                     })
//             })
//
//     });
//
//     it('should add and delete an bank', done => {
//         component.entitySrv.add(ADDED_DELETED_BANK)
//             .subscribe(x => {
//                 expect(x).not.toBeNaN();
//                 component.entitySrv.remove(x)
//                     .subscribe((d: { count: number }) => {
//                         expect(d.count).toEqual(1)
//                         done();
//                     })
//             });
//     })
// });
//
