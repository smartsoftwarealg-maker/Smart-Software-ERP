export const QUICK_ORDER_URL = '/quick-order';

export interface QuickOrder {
    id: number;
    centerId: number;
    document: number;
    number: number; // Default = 1
    date: Date; // Default = current date
    agent?: number; // Option[Int] = None → ?
    userID?: number; // Option[Int] = None → ?
    dealer?: number; // Option[Int] = None → ?
    payMethod?: number; // Option[Int] = None → ?
    locked: boolean; // Default = false
    creationTime?: Date; // Option[Timestamp] = Some → ?
    currency?: number; // Option[Int] = None → ?
    currencyRate: number; // Default = 0.0
    dirty: boolean; // Default = false
    payMethodName?: string; // Option[String] = None → ?
    project?: number; // Option[Int] = None → ?
    projectDescription?: string; // Option[String] = None → ?
    docStatus?: string; // Option[String] = None → ?
    isValidated: boolean; // Default = false
    transporter?: number; // Option[Int] = None → ?
    driver?: string; // Option[String] = None → ?
    license?: string; // Option[String] = None → ?
    licenseDate?: Date; // Option[Date] = None → ?
    licenseIssuer?: string; // Option[String] = None → ?
    plateNumber?: string; // Option[String] = None → ?
    plateNumber2?: string; // Option[String] = None → ?
    reference?: string; // Option[String] = None → ?
    qty: number; // Default = 0.0
    agentDescription?: string; // Option[String] = None → ?
    duplicateCount?: number;
    from?: Date;
    to?: Date;
    invoiceType: 1 | 2;
    altAgent?: string;
    footer?: string;
    discountDescription?: string;
    discount?: number;
    fixedDiscountVAT?: number;
    paymentId?: number;
}

export interface InvoiceInfo {
    id: number;
    invoiceNumber?: number;
}
