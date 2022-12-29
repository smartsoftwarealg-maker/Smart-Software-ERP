import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {AccountService} from "./account.service";
import {Account, GenerationAccount} from "./account-api";
import {GenerationAccountService} from "./generation-account.service";


export class AccountAutocompleteModel extends DefaultAutoCompleteModel<Account> {
    constructor(public accountSrv: AccountService) {
        super(accountSrv);
    }

    override toString = (x: any) => x ?  `${x['accountNo']} ${x[this.descriptionField]}` : null;
}

export class GenerationAccountAutocompleteModel extends DefaultAutoCompleteModel<GenerationAccount> {
    constructor(public accountSrv: GenerationAccountService) {
        super(accountSrv);
    }

    override toString = (x: any) => x ?  `${x['account']} ${x['description'] || ''}` : null;
}
