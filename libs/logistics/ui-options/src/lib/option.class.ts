export class Option {
    id: number;
    mainStore: number;
    passingClient: number;
    salesPrice1Factor: number;
    salesPrice2Factor: number;
    salesPrice3Factor: number;
    calculateSalesPrices: boolean;
    monitorClientCredit: boolean;
    monitorUnitCredit: boolean;
    fiscalDataRequired: boolean;
    discountManagement: boolean;
    discountThreshold1: number;
    discountThreshold2: number;
    discountThreshold3: number;
    discountRate1: number;
    discountRate2: number;
    discountRate3: number;
    ownDocumentsOnly: boolean;
    defaultCurrency: number;
    autoSelectStore: boolean;
    checkPrices: boolean;
    checkOrderedQty: boolean;
    inventoryDate: Date;
    inventoryYear: number;
    disallowNonStockedOrder: boolean;
    lock_printed_documents: boolean;
    usesUnits: boolean;
    arbitrary_uninvoicing: boolean;
    usesLots: boolean;
    art_accno_required: boolean;
    two_step_reception: boolean;
    check_chron_order: boolean;
    SalesPrice4Factor: number;
    SalesPrice5Factor: number;
    generate_GL: boolean;
    blockNewLots: boolean;
    severe: boolean;
    evalPrice: number;
    allow_dupl_ref: boolean;
    service_invoice_only: boolean;
    require_invoice_cost_center: boolean;
    current_year: number;
    hide_purch_price: boolean;
    count_year: number;
    raw_store: number;
    returnInvoiceMerge: boolean;
    prodStore: number;
    qtyDiscount: boolean;
    serviceInvoiceOnly: boolean;
    balanceTolerance: number
    complementaryInvoice: boolean
}

export interface MiniLine {
    center: number;
    store: number;
    reference: string;
    transacId: number;
    id: number;
    price: number;
}

export interface ERR {
    document: string;
    number: number;
    date: Date;
    reference: string;
    description: string;
}
