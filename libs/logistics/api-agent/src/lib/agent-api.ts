export const AGENT_URL = "/agents";

export interface Agent {
    id: number,
    center: number,
    customerCode: string,
    isnumberernal: boolean,
    denomination: String,
    code: string,
    address: string,
    address2: string,
    city: number,
    country: number,
    phone: string,
    mobile: string,
    fax: string,
    contact: string,
    info: string,
    currency: number,
    taxPayable: boolean,
    commRegister: string,
    fiscalID: string,
    articleNo: string,
    stampPayable: boolean,
    price: number,
    denominationAr: string,
    addressAr: string,
    address2Ar: string,
    capital: string,
    bank: string,
    bankAccount: string,
    swift: string,
    agentType: number,
    companyType: number,
    email: string,
    website: string,
    nis: string,
    nif: string,
    debtLimit: number
    debtTerm: number
    payMode: number,
    checkDueDays: number,
    activities: string,
    activity: number,
    recordBlocked: boolean,
    blockingReason: string,
    subcontractor: boolean,
    creationTime: number,
    tin: string,
    // FIXME:: remove this field

    /**
     * @deprecated This field doesn't exist in the backend, it will be removed
     */
    license: string
}
