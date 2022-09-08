import { NgModule } from "@angular/core";
import { LookupDescriptionPipe } from './lookup-description.pipe';

@NgModule({
    declarations: [LookupDescriptionPipe],
    exports: [LookupDescriptionPipe]
})
export class LookupModule {
}
