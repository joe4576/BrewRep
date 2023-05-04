/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 5
 */

export interface AccountPostingAddress {
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  line5County?: string;
  line6Country?: string;
  postcode?: string;
}

export interface AccountPostingCredit {
  /**
   *
   * - Format: double
   */
  creditTotalNet: number;
  /**
   *
   * - Format: double
   */
  creditTotalVat: number;
  /**
   *
   * - Format: uuid
   */
  id: string;
  invoiceAddress: AccountPostingAddress;
  invoiceOutletDetails: AccountPostingInvoiceOutletDetails;
  invoiceOutletGroupDetails: AccountPostingInvoiceOutletGroupDetails;
  outletDetails: AccountPostingInvoiceOutletDetails;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  creditDate?: string;
  creditNumber?: string;
  lines?: AccountPostingCreditLine[];
  notes?: string;
  /**
   *
   * The Code of the outlet for which the credit was placed. This always comes from the outlet, even if the invoice should go to the outlet's parent group.
   */
  outletCode?: string;
  /**
   *
   * The BusinessName for invoicing of the outlet for which the credit was placed. This always comes from the outlet, even if the invoice should go to the outlet's parent group. Will be the outlet's Custom Invoice Business Name if the outlet has a custom invoice address, else the Outlet's Business Name.
   */
  outletInvoiceBusinessName?: string;
}

export interface AccountPostingCreditLine {
  glCode: AccountPostingGlCode;
  /**
   *
   * The Amount to be credited for this line, excluding Vat.
   * - Format: double
   */
  lineTotalNet: number;
  /**
   *
   * The actual total Vat amount for this line. Vat is calculated on a line-by-line basis per order. In the case of a summary order where lots of small retail orders are combined into one, this will be the sum of the vat from the relevant small order lines. Individual line rounding may therefore mean that this value is not direct value which would be calculated as VatPercentage of LineTotalNet (but it should be very close). The value in this field should be honoured as it represents the actual Vat amount charged to customers.
   * - Format: double
   */
  lineTotalVat: number;
  /**
   *
   * The Quantity of the stock item ordered on this line.
   * - Format: double
   */
  quantity: number;
  /**
   *
   * The Id of the Stock Item being credited.
   * - Format: uuid
   */
  stockItemId: string;
  vatCode: AccountPostingVatCode;
  /**
   *
   * The Vat Percentage chargable for this line. Note this may differ from the current Vat Percentage of the Vat Code if there has been a change in the Vat Rate between the time of order and time of posting.
   * - Format: double
   */
  vatPercentage: number;
  /**
   *
   * The name of the product (stock item) being credited, as it is on the credit. This may be different to the current name of the stock item, either because the stock item name has been edited since the credit was created, or because the name of the item for this line has been directly edited, which is a common scenario for Eg miscellaneous products.
   */
  productName?: string;
  /**
   *
   * The current code (at time of file creation) of the Stock Item being credited.
   */
  stockItemCode?: string;
}

export interface AccountPostingCreditTerm {
  /**
   *
   * - Format: int32
   */
  creditCalculationDay: number;
  creditCalculationType: EnumCreditCalculationType;
  /**
   *
   * - Format: uuid
   */
  id: string;
  name?: string;
}

export interface AccountPostingGlCode {
  /**
   *
   * - Format: uuid
   */
  id: string;
  code?: string;
  name?: string;
}

export interface AccountPostingInvoiceOutletDetails {
  /**
   *
   * - Format: uuid
   */
  id: string;
  code?: string;
  /**
   *
   * The Business Name for invoicing for this outlet. May be the Outlet's standard business name, or the Custom Invoicing Business Name if Custom Invoicing Address used.
   */
  invoiceBusinessName?: string;
}

export interface AccountPostingInvoiceOutletGroupDetails {
  /**
   *
   * - Format: uuid
   */
  id: string;
  code?: string;
  /**
   *
   * The Business Name for invoicing for this group. Comes from group's standard Name.
   */
  invoiceBusinessName?: string;
}

export interface AccountPostingItems {
  creditTerms?: AccountPostingCreditTerm[];
  credits?: AccountPostingCredit[];
  deliveryOutlets?: AccountPostingOutlet[];
  glCodes?: AccountPostingGlCode[];
  orders?: AccountPostingOrder[];
  outletGroups?: AccountPostingOutletGroup[];
  outlets?: AccountPostingOutlet[];
  purchaseOrderIdsGoingDirectToHistory?: string[];
  purchaseOrders?: AccountPostingPurchaseOrder[];
  stockItems?: AccountPostingStockItem[];
  suppliers?: AccountPostingSupplier[];
  vatCodes?: AccountPostingVatCode[];
}

export interface AccountPostingOrder {
  deliveryAddress: AccountPostingAddress;
  deliveryOutletDetails: AccountPostingInvoiceOutletDetails;
  invoiceAddress: AccountPostingAddress;
  invoiceOutletDetails: AccountPostingInvoiceOutletDetails;
  invoiceOutletGroupDetails: AccountPostingInvoiceOutletGroupDetails;
  /**
   *
   * Identifies if this order was a retail summary, Ie a combination of several small retail orders rolled into a single larger summary.
   */
  isRetailSummary: boolean;
  /**
   *
   * - Format: double
   */
  orderTotalNet: number;
  /**
   *
   * - Format: double
   */
  orderTotalVat: number;
  createdBy?: string;
  customerReference?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  deliveryDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  despatchDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  dueDate?: string;
  invoiceEmailAddresses?: string[];
  invoiceNumber?: string;
  lines?: AccountPostingOrderLine[];
  orderDeliveryNotes?: string;
  orderNumber?: string;
  orderSalesNotes?: string;
  /**
   *
   * The Code of the outlet for which the order was placed. This always comes from the outlet, even if the invoice should go to the outlet's parent group.
   */
  outletCode?: string;
  /**
   *
   * The BusinessName for invoicing of the outlet for which the order was placed. This always comes from the outlet, even if the invoice should go to the outlet's parent group. Will be the outlet's Custom Invoice Business Name if the outlet has a custom invoice address, else the Outlet's Business Name.
   */
  outletInvoiceBusinessName?: string;
  /**
   *
   * - Format: uuid
   */
  tradeOrderId?: string;
}

export interface AccountPostingOrderLine {
  glCode: AccountPostingGlCode;
  /**
   *
   * The Price of the line, after any discounts but excluding Vat.
   * - Format: double
   */
  lineTotalNet: number;
  /**
   *
   * The actual total Vat amount for this line. Vat is calculated on a line-by-line basis per order. In the case of a summary order where lots of small retail orders are combined into one, this will be the sum of the vat from the relevant small order lines. Individual line rounding may therefore mean that this value is not direct value which would be calculated as VatPercentage of LineTotalNet (but it should be very close). The value in this field should be honoured as it represents the actual Vat amount charged to customers.
   * - Format: double
   */
  lineTotalVat: number;
  /**
   *
   * The Quantity of the stock item ordered on this line.
   * - Format: double
   */
  quantity: number;
  /**
   *
   * The Id of the Stock Item being ordered.
   * - Format: uuid
   */
  stockItemId: string;
  vatCode: AccountPostingVatCode;
  /**
   *
   * The Vat Percentage chargable for this line. Note this may differ from the current Vat Percentage of the Vat Code if there has been a change in the Vat Rate between the time of order and time of posting.
   * - Format: double
   */
  vatPercentage: number;
  /**
   *
   * The name of the product (stock item) being ordered, as it is on the order. This may be different to the current name of the stock item, either because the stock item name has been edited since the order was created, or because the name of the item for this line has been directly edited, which is a common scenario for Eg miscellaneous products.
   */
  productName?: string;
  /**
   *
   * The current code (at time of file creation) of the Stock Item being ordered.
   */
  stockItemCode?: string;
}

export interface AccountPostingOutlet {
  /**
   *
   * - Format: int32
   */
  accountsDepartmentNumber: number;
  creditTerm: AccountPostingCreditTerm;
  /**
   *
   * Indicates whether credit terms are set for the outlet. Will normally be true, but could be false for example if re-posting an old record where the outlet has since been changed.
   */
  creditTermsSet: boolean;
  deliveryAddress: AccountPostingAddress;
  emailInvoices: boolean;
  /**
   *
   * - Format: uuid
   */
  id: string;
  invoiceAddress: AccountPostingAddress;
  code?: string;
  contactEmailAddress?: string;
  contactForename?: string;
  contactMobile?: string;
  contactSurname?: string;
  contactTelephoneNumber?: string;
  countryCode?: string;
  /**
   *
   * Outlet's credit limit, if defined. Note distinction between null (no limit defined) and 0 (limit of 0, Ie no credit allowed)
   * - Format: double
   */
  creditLimit?: number;
  emailAddresses?: string[];
  /**
   *
   * The Code of the Outlet Group if this outlet belongs to a group.
   */
  groupCode?: string;
  /**
   *
   * The Business Name for invoicing for this outlet. May be the Outlet's standard business name, or the Custom Invoicing Business Name if Custom Invoicing Address used.
   */
  invoiceBusinessName?: string;
  outletRatingName?: string;
  outletTypeName?: string;
  salesAreaName?: string;
  salesCodeName?: string;
  telephoneNumber?: string;
  vatNumber?: string;
}

export interface AccountPostingOutletGroup {
  /**
   *
   * - Format: int32
   */
  accountsDepartmentNumber: number;
  emailInvoices: boolean;
  /**
   *
   * - Format: uuid
   */
  id: string;
  invoiceAddress: AccountPostingAddress;
  code?: string;
  contactEmailAddress?: string;
  contactForename?: string;
  contactMobile?: string;
  contactSurname?: string;
  contactTelephoneNumber?: string;
  emailAddresses?: string[];
  invoiceBusinessName?: string;
  salesCodeName?: string;
  telephoneNumber?: string;
  vatNumber?: string;
}

export interface AccountPostingPurchaseOrder {
  deliveryAddress: AccountPostingAddress;
  /**
   *
   * - Format: uuid
   */
  purchaseOrderId: string;
  /**
   *
   * The id of the supplier this purchase order was sent to
   * - Format: uuid
   */
  supplierId: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  createdOn?: string;
  lines?: AccountPostingPurchaseOrderLine[];
  notes?: string;
  purchaseNumber?: string;
}

export interface AccountPostingPurchaseOrderLine {
  glCode: AccountPostingGlCode;
  /**
   *
   * The Price of the line, after any discounts but excluding Vat.
   * - Format: double
   */
  lineTotalNet: number;
  /**
   *
   * The actual total Vat amount for this line. Vat is calculated on a line-by-line basis per order. In the case of a summary order where lots of small retail orders are combined into one, this will be the sum of the vat from the relevant small order lines. Individual line rounding may therefore mean that this value is not direct value which would be calculated as VatPercentage of LineTotalNet (but it should be very close). The value in this field should be honoured as it represents the actual Vat amount charged to customers.
   * - Format: double
   */
  lineTotalVat: number;
  /**
   *
   * The Quantity of the stock item ordered on this line.
   * - Format: double
   */
  quantity: number;
  /**
   *
   * The Id of the Stock Item being ordered.
   * - Format: uuid
   */
  stockItemId: string;
  vatCode: AccountPostingVatCode;
  /**
   *
   * The Vat Percentage chargable for this line. Note this may differ from the current Vat Percentage of the Vat Code if there has been a change in the Vat Rate between the time of order and time of posting.
   * - Format: double
   */
  vatPercentage: number;
  /**
   *
   * The current code (at time of file creation) of the Stock Item being ordered.
   */
  stockItemCode?: string;
}

export interface AccountPostingStockItem {
  /**
   *
   * - Format: double
   */
  costPrice: number;
  /**
   *
   * - Format: uuid
   */
  id: string;
  isMaterial: boolean;
  purchaseGlCode: AccountPostingGlCode;
  salesGlCode: AccountPostingGlCode;
  code?: string;
  name?: string;
}

export interface AccountPostingSupplier {
  address: AccountPostingAddress;
  /**
   *
   * - Format: uuid
   */
  supplierId: string;
  awrsNumber?: string;
  code?: string;
  contactName?: string;
  emailAddresses?: string[];
  mobile?: string;
  supplierName?: string;
  telephoneNumber?: string;
  vatNumber?: string;
}

export interface AccountPostingVatCode {
  /**
   *
   * - Format: double
   */
  currentVatPercentage: number;
  /**
   *
   * - Format: uuid
   */
  id: string;
  accountsCodeForPurchases?: string;
  accountsCodeForSales?: string;
  name?: string;
}

export interface AlcoholDuty {
  /**
   *
   * Abv.
   * - Format: double
   */
  abv: number;
  alcoholType: EnumAlcoholType;
  germanBeerDutyProductType: EnumGermanBeerDutyProductType;
  /**
   *
   * Set true if this item is brewed by members of the public for their personal use by borrowing the Brewery's equipment. This is a service offered by breweries in some countries, such as Australia, and can affect duty.
   */
  isBrewedForPersonalUse: boolean;
  spiritDutyExemptionReason: EnumSpiritDutyExemptionReason;
  /**
   *
   * Dutiable Litres
   * - Format: double
   */
  dutiableLitres?: number;
  /**
   *
   * - Format: double
   */
  germanBeerMixedProductPercentageA?: number;
  /**
   *
   * Manufacturer.
   * - Format: uuid
   */
  manufacturerId?: string;
  /**
   *
   * Plato Value
   * - Format: double
   */
  plato?: number;
}

export interface AnnualProductionEntry {
  /**
   *
   * Estimate of Beer Production Figure over the next calendar year. Typically equal to last calendar year's actual production figure, unless good reason to believe otherwise.
   * - Format: double
   */
  annualBeerProductionLitres: number;
  /**
   *
   * Annual Ethanol Production figure for use in duty calculations. For UK this is the actual production in the previous year (year to 31st Jan), or the estimate of production for the current year if that is above the small production limit (450000 Litres in 2023)..
   * - Format: double
   */
  annualEthanolProductionLitres?: number;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  effectiveDate?: string;
}

export interface AutoAssemblyBomLine {
  /**
   *
   * Item which is a component of the auto assembled item.
   * - Format: uuid
   */
  itemId: string;
  /**
   *
   * The quantity of Item required for each ParentAutoAssembledItem created.
   * - Format: double
   */
  quantity: number;
  readOnly: AutoAssemblyBomLineReadOnly;
}

export interface AutoAssemblyBomLineReadOnly {
  /**
   *
   * Auto assembled item which this line is a part of.
   * - Format: uuid
   */
  parentAutoAssembledItemId: string;
  /**
   *
   * Sequence for presenting Bom Lines in consistent order.
   * - Format: int32
   */
  sequence: number;
}

export interface Behaviours {
  /**
   *
   * True if this item is invoicable, therefore able to appear on orders / credits.
   */
  isInvoiceable: boolean;
  /**
   *
   * True if this item is a physical item.
   */
  isPhysical: boolean;
  /**
   *
   * True if this item is priced using the standard price lists and discounts structure. Typically all invoiceable items except those which have flat pricing.
   */
  isPricedByPriceLists: boolean;
  /**
   *
   * True if this item is purchasable.
   */
  isPurchasable: boolean;
  /**
   *
   * True if this item is stock tracked.
   */
  isStockTracked: boolean;
}

export interface BuildCreditHeaderRequest {
  creditType: EnumCreditType;
  /**
   *
   * Outlet ID
   * - Format: uuid
   */
  outletId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  originalDespatchDate?: string;
}

export interface BuildCreditHeaderResponse {
  header: CreditHeader;
}

export interface BuildCreditLinesRequest {
  header: CreditHeader;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  items?: CreditLineBuildItem[];
}

export interface BuildCreditLinesResponse {
  results: Credit;
}

export interface BuildOrderLinesRequest {
  orderHeader: OrderHeader;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  items?: ProductQuantity[];
}

export interface BuildOrderLinesResponse {
  results: Order;
}

export interface CalculateNextDespatchDateByCourierRequest {
  /**
   *
   * - Format: uuid
   */
  courierId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface CalculateNextDespatchDateByCourierResponse {
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  despatchDate?: string;
}

export interface CalculateNextDespatchDateByDeliveryAreaRequest {
  /**
   *
   * - Format: uuid
   */
  deliveryAreaId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface CalculateNextDespatchDateByDeliveryAreaResponse {
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  despatchDate?: string;
}

export interface CollectionTime {
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * True if this is the default collection time. Simply a marker for the FE to use. Will be automatically set false if another CollectionTime is saved with IsDefault true, thus ensuring there will always be 0 or 1 but no more CollectionTimes with IsDefault set true.
   */
  isDefault: boolean;
  /**
   *
   * Sequence, for ordering CollectionTimes.
   * - Format: int32
   */
  sequence: number;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Name
   */
  name?: string;
}

export interface Courier {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * Lead Time in Days.
   * - Format: int32
   */
  leadTimeDays: number;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Delivery Service, if any, to apply by default to orders for delivery by this courier. May be overriden by settings at outlet or group level.
   * - Format: uuid
   */
  deliveryServiceId?: string;
  /**
   *
   * Array of days of week on which orders are typically despatched. Will always read in order Monday to Sunday.
   */
  despatchDays?: EnumDayOfWeek[];
  /**
   *
   * Name
   */
  name?: string;
  /**
   *
   * Notes
   */
  notes?: string;
}

export interface CreateCreditRequest {
  credit: Credit;
  /**
   *
   * Outlet ID
   * - Format: uuid
   */
  outletId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface CreateCreditResponse {
  credit: Credit;
}

export interface CreateOrderRequest {
  orderSource: EnumOrderSource;
  /**
   *
   * Outlet which the order is for. Shown on docs. Used to determine which contact in accounts the order is sent to (if not invoiced to group). Outlet is required at order create and then Not editable.
   * - Format: uuid
   */
  outletId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * Reference of Order in External system. (OrderSource identifies which system the order was imported from eg WooCommerce / Shopify). Not editable.
   */
  externalReference?: string;
}

export interface CreateOrderResponse {
  order: Order;
}

export interface CreateTenantGroupForIntegrationTestsRequest {
  gipIdToken?: string;
}

export interface CreateTenantGroupForIntegrationTestsResponse {
  tenantGroupIntegrationTestData: TenantGroupIntegrationTestData;
}

export interface Credit {
  header: CreditHeader;
  /**
   *
   * - Format: uuid
   */
  id: string;
  lines?: CreditLine[];
}

export interface CreditFilter {
  creditNumbers?: string[];
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  fromCreditDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  fromOriginalDespatchDate?: string;
  groupIds?: string[];
  /**
   *
   * - Format: int32
   */
  maximumResults?: number;
  outletIds?: string[];
  statuses?: EnumOrderStatus[];
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  toCreditDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  toOriginalDespatchDate?: string;
}

export interface CreditHeader {
  /**
   *
   * Whether an credit note has been sent for this credit.
   */
  creditNoteSent: boolean;
  creditType: EnumCreditType;
  eireDutyMovementType: EnumEireMovementType;
  germanBeerDutyMovementType: EnumGermanBeerDutyMovementType;
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * Outlet Rating of Outlet at Time of credit. Stored for potential future reporting.
   * - Format: uuid
   */
  outletRatingId: string;
  /**
   *
   * Price List used for the credit. Stored for potential future reporting.
   * - Format: uuid
   */
  priceListId: string;
  readOnly: CreditHeaderReadOnly;
  standardOrderType: EnumStandardOrder;
  /**
   *
   * VAT Code
   * - Format: uuid
   */
  vatCodeId: string;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Reference name or number from the Accounts Link posting.
   */
  accountsLinkReferenceName?: string;
  /**
   *
   * Credit Address Line 1
   */
  creditAddress1?: string;
  /**
   *
   * Credit Address Line 2
   */
  creditAddress2?: string;
  /**
   *
   * Credit Address Line 3
   */
  creditAddress3?: string;
  /**
   *
   * Credit Address Line 4
   */
  creditAddress4?: string;
  /**
   *
   * Credit Address Line 5
   */
  creditAddress5?: string;
  /**
   *
   * Credit Address Line 6
   */
  creditAddress6?: string;
  /**
   *
   * Credit Business Name
   */
  creditAddressBusiness?: string;
  /**
   *
   * Credit Recipient Name
   */
  creditAddressRecipient?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  creditDate?: string;
  /**
   *
   * Credit Post Code
   */
  creditPostcode?: string;
  /**
   *
   * Credit Terms Description - Frozen at credit entry so historic invoices can print original details.
   */
  creditTermsDescription?: string;
  /**
   *
   * The email address credit notes will be sent to. Copied from Outlet by default.
   */
  emailAddress?: string;
  /**
   *
   * Email Recipient Name. Copied from Outlet / Group by default.
   */
  emailRecipient?: string;
  /**
   *
   * Credit Notes
   */
  notes?: string;
  /**
   *
   * Order header id of which the credit is associated to.
   * - Format: uuid
   */
  orderHeaderId?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  originalDespatchDate?: string;
  /**
   *
   * Our Reference
   */
  ourReference?: string;
  /**
   *
   * Outlet Type of Outlet at Time of credit. Stored for potential future reporting.
   * - Format: uuid
   */
  outletTypeId?: string;
  /**
   *
   * The Sales Area which the outlet was in at the time of the credit. Stored for potential future reporting.
   * - Format: uuid
   */
  salesAreaId?: string;
  /**
   *
   * The Sales Code which the outlet was in at the time of the credit. Stored for potential future reporting.
   * - Format: uuid
   */
  salesCodeId?: string;
  /**
   *
   * Optional Ullage ID to link to where the spoilt product came from.
   * - Format: uuid
   */
  ullageId?: string;
}

export interface CreditHeaderReadOnly {
  /**
   *
   * User who initially created the credit. Captured by system not user editable.
   * - Format: uuid
   */
  createdByUserId: string;
  /**
   *
   * Set to true when stock is adjusted for this credit (occurs once posting to accounts succeeds). When true it implies that the items on the credit should not be modified.
   */
  hasStockBeenAdjusted: boolean;
  /**
   *
   * Outlet ID
   * - Format: uuid
   */
  outletId: string;
  status: EnumOrderStatus;
  /**
   *
   * The approximate amount of duty which has/will be reclaimed in fulfilling this credit. This represents the amount of duty included in the total net price, regardless of whether that duty would be reclaimed directly due to this specific credit. For example, if the credit is to non-bonded then the duty is not being reclaimed but that duty element will be included in the duty cost of sale. It is approximate because actual duty return calculations will be rounded across multiple orders/credits so cannot be exactly attributed to each individual credit.
   * - Format: double
   */
  totalApproximateDutyCostOfSale: number;
  /**
   *
   * Total Cost Price of Credit. (Inc Duty as applicable, Ex VAT).
   * - Format: double
   */
  totalCostNet: number;
  /**
   *
   * Total Net Price of Credit.
   * - Format: double
   */
  totalNetPrice: number;
  /**
   *
   * Total VAT of Credit.
   * - Format: double
   */
  totalVat: number;
  /**
   *
   * Reason Credit Cancelled
   */
  cancellationReason?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  cancelledAt?: string;
  /**
   *
   * User who cancelled the credit.
   * - Format: uuid
   */
  cancelledByUserId?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  createdAt?: string;
  /**
   *
   * Credit Number
   */
  creditNumber?: string;
  /**
   *
   * Description of the current error which is preventing this credit from being posted to accounts. Ie the error (if any) which occurred  when this was last attempted to post. The presence of text in this field implies there is a known current error so posting will not be reattempted. To reattempt posting this field must be cleared.
   */
  currentPostingError?: string;
  /**
   *
   * Group (if any)
   * - Format: uuid
   */
  groupId?: string;
}

export interface CreditLine {
  /**
   *
   * Product ABV
   * - Format: double
   */
  abv: number;
  alcoholType: EnumAlcoholType;
  /**
   *
   * Credit ID
   * - Format: uuid
   */
  creditId: string;
  germanBeerDutyProductType: EnumGermanBeerDutyProductType;
  /**
   *
   * General Ledger Code of Product at time of credit. Stored for potential future reporting.
   * - Format: uuid
   */
  glCodeId: string;
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * Set true if this item is brewed by members of the public for their personal use by borrowing the Brewery's equipment. This is a service offered by breweries in some countries, such as Australia, and can affect duty.
   */
  isBrewedForPersonalUse: boolean;
  /**
   *
   * Set true if this item is designed to be connected to a pump or pressurised gas system, such as those used in pubs. Some duty systems have different duty rates for beer packaged in these manners for selling to pubs.
   */
  isDesignedForPump: boolean;
  /**
   *
   * This is Spoilt Beer - Duty reclaimable
   */
  isSpoilt: boolean;
  /**
   *
   * Line Cost Price (Inc Duty, Exc Vat)
   * - Format: double
   */
  lineCostNetPrice: number;
  /**
   *
   * Net (no VAT) Price refunded for the line.
   * - Format: double
   */
  lineNetPrice: number;
  /**
   *
   * Total VAT
   * - Format: double
   */
  lineVat: number;
  /**
   *
   * Quantity Credited
   * - Format: double
   */
  quantity: number;
  /**
   *
   * Quantity to Re-Stock
   * - Format: double
   */
  quantityToRestock: number;
  readOnly: CreditLineReadOnly;
  spiritDutyExemptionReason: EnumSpiritDutyExemptionReason;
  /**
   *
   * Stock Item Id
   * - Format: uuid
   */
  stockItemId: string;
  /**
   *
   * Product Cost Price
   * - Format: double
   */
  unitCostNetPrice: number;
  /**
   *
   * Product Dutyable Litres
   * - Format: double
   */
  unitDutiableLitres: number;
  /**
   *
   * Product Unit List Price
   * - Format: double
   */
  unitListNetPrice: number;
  /**
   *
   * Product Litres
   * - Format: double
   */
  unitLitres: number;
  /**
   *
   * Unit Discount Price
   * - Format: double
   */
  unitNetPrice: number;
  /**
   *
   * Unit of Measure Id
   * - Format: uuid
   */
  unitOfMeasureId: string;
  /**
   *
   * Vat Code Applicable to the line. May come from Product or Order Header.
   * - Format: uuid
   */
  vatCodeId: string;
  /**
   *
   * Product VAT percentage
   * - Format: double
   */
  vatPercentage: number;
  /**
   *
   * Litres held by the final consumable packaged unit, if relevant. For example, a case of 12 x 500ml bottles would have a final unit litres of 0.5. Some duty systems have different rates depending upon this value.
   * - Format: double
   */
  finalUnitLitres?: number;
  /**
   *
   * - Format: double
   */
  germanBeerMixedProductPercentageA?: number;
  /**
   *
   * Manufacturer of the product - Required for lines with Alcohol.
   * - Format: uuid
   */
  manufacturerId?: string;
  /**
   *
   * Plato Value
   * - Format: double
   */
  plato?: number;
  /**
   *
   * Pricing Category.
   * - Format: uuid
   */
  pricingCategoryId?: string;
  /**
   *
   * Product Brand at time of Credit. Stored for potential future reporting.
   * - Format: uuid
   */
  productBrandId?: string;
  /**
   *
   * Product Code
   */
  productCode?: string;
  /**
   *
   * Product Name
   */
  productName?: string;
  /**
   *
   * Stock Location Id - For Restocking.
   * - Format: uuid
   */
  stockLocationId?: string;
}

export interface CreditLineBuildItem {
  /**
   *
   * Id of the InvoiceableItem being credited
   * - Format: uuid
   */
  invoiceableItemId: string;
  /**
   *
   * - Format: double
   */
  quantity: number;
  /**
   *
   * Stock location Id for line if explicit one desired. If not provided then outlet's default stock location will be used.
   * - Format: uuid
   */
  stockLocationId?: string;
}

export interface CreditLineReadOnly {
  /**
   *
   * The approximate amount of duty which has/will be reclaimed in fulfilling this credit. This represents the amount of duty included in the total net price, regardless of whether that duty would be reclaimed directly due to this specific credit. For example, if the credit is to non-bonded then the duty is not being reclaimed but that duty element will be included in the duty cost of sale. It is approximate because actual duty return calculations will be rounded across multiple orders/credits so cannot be exactly attributed to each individual credit.
   * - Format: double
   */
  approximateDutyCostOfSale: number;
  /**
   *
   * Quantity for Duty Reclaim
   * - Format: double
   */
  quantityForDutyReclaim: number;
}

export interface CreditTerm {
  /**
   *
   * Day or Days for Terms Calculation
   * - Format: int32
   */
  calculationDay: number;
  calculationType: EnumCreditCalculationType;
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * Show Balance on Delivery Notes
   */
  showBalance: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Accounts Analysis Code
   */
  accountsAnalysisCode?: string;
  /**
   *
   * Credit Terms Description
   */
  name?: string;
}

export interface DeliveryArea {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * Lead Time in Days.
   * - Format: int32
   */
  leadTimeDays: number;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Delivery Service, if any, to apply by default to orders for delivery in this delivery area. May be overriden by settings at outlet or group level.
   * - Format: uuid
   */
  deliveryServiceId?: string;
  /**
   *
   * Array of days of week on which orders are typically despatched. Will always read in order Monday to Sunday.
   */
  despatchDays?: EnumDayOfWeek[];
  /**
   *
   * Name
   */
  name?: string;
  /**
   *
   * Notes
   */
  notes?: string;
}

export interface Details {
  behaviours: Behaviours;
  /**
   *
   * Cost Price - Used for GrossProfit calculations when goods are sold.
   * - Format: double
   */
  costPrice: number;
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  mainPurpose: EnumItemMainPurpose;
  /**
   *
   * Unit of Measure. Immutable
   * - Format: uuid
   */
  unitOfMeasureId: string;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Code
   */
  code?: string;
  /**
   *
   * Name
   */
  name?: string;
  /**
   *
   * Notes.
   */
  notes?: string;
}

export interface EntireItem {
  alcoholDuty: AlcoholDuty;
  details: Details;
  externalCodes: ExternalCodes;
  flatPricing: FlatPricing;
  invoicing: Invoicing;
  labelling: Labelling;
  packaging: Packaging;
  purchasing: Purchasing;
  stock: Stock;
  vat: Vat;
}

export enum EnumAlcoholType {
  None = "None",
  Beer = "Beer",
  StillCiderPerry = "StillCiderPerry",
  SparklingCiderPerry = "SparklingCiderPerry",
  StillWine = "StillWine",
  SparklingWine = "SparklingWine",
  Spirits = "Spirits",
  ScotchWhisky = "ScotchWhisky",
  IrishWhiskey = "IrishWhiskey",
  TraditionalAfricanBeer = "TraditionalAfricanBeer",
  Brandy = "Brandy",
  SpiritsFromGrape = "SpiritsFromGrape",
  Whisky = "Whisky",
  RumAndSugarSpirits = "RumAndSugarSpirits",
  Gin = "Gin",
  Vodka = "Vodka",
  Other = "Other",
}

export enum EnumCreditCalculationType {
  None = "None",
  OfFollowingMonth = "OfFollowingMonth",
  DaysAfterInvoice = "DaysAfterInvoice",
  DaysAfterInvoiceMonth = "DaysAfterInvoiceMonth",
  OfCurrentMonth = "OfCurrentMonth",
}

export enum EnumCreditType {
  None = "None",
  CreditNoDutyReclaim = "CreditNoDutyReclaim",
  DutyOnlyReclaim = "DutyOnlyReclaim",
  CreditWithDutyReclaim = "CreditWithDutyReclaim",
}

export enum EnumDayOfWeek {
  None = "None",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export enum EnumDeliveryNotificationSetting {
  Unknown = "Unknown",
  Off = "Off",
  ToDeliveryRecipient = "ToDeliveryRecipient",
  ToSpecifiedAddress = "ToSpecifiedAddress",
}

export enum EnumDiscountBasis {
  None = "None",
  Percent = "Percent",
  CurrencyPerUnit = "CurrencyPerUnit",
  CurrencyPerBarrel = "CurrencyPerBarrel",
}

export enum EnumDistributionType {
  None = "None",
  Delivery = "Delivery",
  Courier = "Courier",
  Collection = "Collection",
}

export enum EnumEireMovementType {
  Unknown = "Unknown",
  OtherMemberStatesOfEu = "OtherMemberStatesOfEu",
  ThirdCountries = "ThirdCountries",
  OtherWarehouses = "OtherWarehouses",
  Distillery = "Distillery",
  Operations = "Operations",
  IncreasesInOperations = "IncreasesInOperations",
  DeficienciesReturned = "DeficienciesReturned",
  HomeConsumption = "HomeConsumption",
  LossesInOperations = "LossesInOperations",
  DutyFreeShops = "DutyFreeShops",
  ShipsStores = "ShipsStores",
  InFlightCatering = "InFlightCatering",
  DiplomaticPrivilege = "DiplomaticPrivilege",
  OtherDutyFreeUse = "OtherDutyFreeUse",
  Denaturing = "Denaturing",
  Destruction = "Destruction",
  DutiableDeficiencies = "DutiableDeficiencies",
  DutyExemptDeficiencies = "DutyExemptDeficiencies",
  Other = "Other",
}

export enum EnumEmailDocumentGrouping {
  Unknown = "Unknown",
  MultipleDocumentsPerAttachment = "MultipleDocumentsPerAttachment",
  MultipleSingleDocumentAttachmentsPerEmail = "MultipleSingleDocumentAttachmentsPerEmail",
  SingleDocumentPerEmail = "SingleDocumentPerEmail",
}

export enum EnumExportIncotermCode {
  None = "None",
  EXW = "EXW",
  FCA = "FCA",
  FAS = "FAS",
  FOB = "FOB",
  CFR = "CFR",
  CIF = "CIF",
  CIP = "CIP",
  DPU = "DPU",
  DDP = "DDP",
  CPT = "CPT",
  DAP = "DAP",
}

export enum EnumGermanBeerDutyMovementType {
  None = "None",
  DutiableRemoval = "DutiableRemoval",
  DutyReclaimableReturn = "DutyReclaimableReturn",
  DutyExemptRemovalForEmployees = "DutyExemptRemovalForEmployees",
  DutySuspendedRemovalStayingInGermany = "DutySuspendedRemovalStayingInGermany",
  DutyExemptRemovalGoingToEU = "DutyExemptRemovalGoingToEU",
  OtherDutyExemptRemoval = "OtherDutyExemptRemoval",
  DutyUnpaidReturn = "DutyUnpaidReturn",
}

export enum EnumGermanBeerDutyProductType {
  None = "None",
  OwnBrewedBeer_E = "OwnBrewedBeer_E",
  BrewedByUsFor3rdParty_L = "BrewedByUsFor3rdParty_L",
  BrewedBy3rdPartyForUs_F = "BrewedBy3rdPartyForUs_F",
  MixedProduct_M = "MixedProduct_M",
}

export enum EnumItemMainPurpose {
  Unknown = "Unknown",
  Material = "Material",
  Product = "Product",
  DeliveryService = "DeliveryService",
  BottleDepositCharge = "BottleDepositCharge",
  BottleDepositRedemption = "BottleDepositRedemption",
  AutoAssembledItem = "AutoAssembledItem",
  PoDeliveryService = "PoDeliveryService",
}

export enum EnumKegstarContainerType {
  None = "None",
  KegstarKeg50L = "KegstarKeg50L",
  KegstarKeg30L = "KegstarKeg30L",
  KegstarKeg20L = "KegstarKeg20L",
  KegstarCask9G = "KegstarCask9G",
}

export enum EnumOrderSource {
  None = "None",
  BrewMan = "BrewMan",
  WooCommerce = "WooCommerce",
  Shopify = "Shopify",
  Sellar = "Sellar",
  Zettle = "Zettle",
  Other = "Other",
  EposNow = "EposNow",
  Beerflex = "Beerflex",
  Square = "Square",
  Squarespace = "Squarespace",
}

export enum EnumOrderStatus {
  None = "None",
  Open = "Open",
  Complete = "Complete",
  Historic = "Historic",
  Cancelled = "Cancelled",
  Posting = "Posting",
}

export enum EnumPackageTypeCategoryType {
  Unknown = "Unknown",
  Cask = "Cask",
  Keg = "Keg",
  Case = "Case",
  Bottle = "Bottle",
  Other = "Other",
}

export enum EnumRetailPaymentMethod {
  None = "None",
  DebitCreditCard = "DebitCreditCard",
  Other = "Other",
  Cash = "Cash",
}

export enum EnumSpiritDutyExemptionReason {
  None = "None",
  ForFortifyingWine = "ForFortifyingWine",
  SoldForExemptUse = "SoldForExemptUse",
  ForExemptUse = "ForExemptUse",
  Denatured = "Denatured",
}

export enum EnumStandardOrder {
  FullPriceDutyPaid = "FullPriceDutyPaid",
  PriceExcludingDutyDutySuspended = "PriceExcludingDutyDutySuspended",
  FullPriceDutyPaidElsewhere = "FullPriceDutyPaidElsewhere",
  ExportDutySuspended = "ExportDutySuspended",
  ConsumeOnPremisesNoDuty = "ConsumeOnPremisesNoDuty",
}

export enum EnumUserTenantGroupLevel {
  Member = "Member",
  Administrator = "Administrator",
  SuperAdministrator = "SuperAdministrator",
}

export interface ExternalCodes {
  /**
   *
   * Beerflex Product Code
   */
  beerflexCode?: string;
  /**
   *
   * EAN 13/14 Product Code
   */
  eanBarcodeNumber?: string;
  /**
   *
   * Export Commodity Code
   */
  exportCommodityCode?: string;
}

export interface FilteredCreditsResult {
  /**
   *
   * - Format: int32
   */
  matchingCount: number;
  credits?: Credit[];
}

export interface FilteredEntireItems {
  /**
   *
   * - Format: int32
   */
  matchingCount: number;
  entireItems?: EntireItem[];
}

export interface FilteredItems {
  /**
   *
   * - Format: int32
   */
  matchingCount: number;
  items?: Item[];
}

export interface FilteredOrdersResult {
  /**
   *
   * - Format: int32
   */
  matchingCount: number;
  orders?: Order[];
}

export interface FlatPricing {
  /**
   *
   * - Format: double
   */
  flatSalesPrice: number;
  /**
   *
   * Determines if the Flat Sales price, if defined, is gross (includes VAT) or Net (of VAT).
   */
  isFlatSalesPriceGross: boolean;
}

export interface GetAllCollectionTimesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllCollectionTimesResponse {
  collectionTimes?: CollectionTime[];
}

export interface GetAllCouriersRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllCouriersResponse {
  couriers?: Courier[];
}

export interface GetAllCreditTermsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllCreditTermsResponse {
  creditTerms?: CreditTerm[];
}

export interface GetAllDeliveryAreasRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllDeliveryAreasResponse {
  deliveryAreas?: DeliveryArea[];
}

export interface GetAllGlCodeOverridesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllGlCodeOverridesResponse {
  glCodeOverrides?: GlCodeOverride[];
}

export interface GetAllGlCodesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllGlCodesResponse {
  glCodes?: GlCode[];
}

export interface GetAllGroupsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllGroupsResponse {
  groups?: Group[];
}

export interface GetAllOutletRatingsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllOutletRatingsResponse {
  outletRatings?: OutletRating[];
}

export interface GetAllOutletTypesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllOutletTypesResponse {
  outletTypes?: OutletType[];
}

export interface GetAllOutletsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllOutletsResponse {
  outlets?: Outlet[];
}

export interface GetAllPackageTypesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllPackageTypesResponse {
  packageTypes?: PackageType[];
}

export interface GetAllPriceListsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllPriceListsResponse {
  priceLists?: PriceList[];
}

export interface GetAllPricingCategoriesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllPricingCategoriesResponse {
  pricingCategories?: PricingCategory[];
}

export interface GetAllProductBrandsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllProductBrandsResponse {
  productBrands?: ProductBrand[];
}

export interface GetAllSalesAreasRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllSalesAreasResponse {
  salesAreas?: SalesArea[];
}

export interface GetAllSalesCodesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllSalesCodesResponse {
  salesCodes?: SalesCode[];
}

export interface GetAllStockGroupsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllStockGroupsResponse {
  stockGroups?: StockGroup[];
}

export interface GetAllStockLocationsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllStockLocationsResponse {
  stockLocations?: StockLocation[];
}

export interface GetAllSupplierManufacturersRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllSupplierManufacturersResponse {
  supplierManufacturers?: SupplierManufacturer[];
}

export interface GetAllUnitsOfMeasureRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllUnitsOfMeasureResponse {
  unitsOfMeasure?: UnitOfMeasure[];
}

export interface GetAllVatCodesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetAllVatCodesResponse {
  vatCodes?: VatCode[];
}

export interface GetCollectionTimeRequest {
  /**
   *
   * - Format: uuid
   */
  collectionTimeId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetCollectionTimeResponse {
  collectionTime: CollectionTime;
}

export interface GetCollectionTimesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  collectionTimeIds?: string[];
}

export interface GetCollectionTimesResponse {
  collectionTimes?: CollectionTime[];
}

export interface GetCourierRequest {
  /**
   *
   * - Format: uuid
   */
  courierId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetCourierResponse {
  courier: Courier;
}

export interface GetCouriersRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  courierIds?: string[];
}

export interface GetCouriersResponse {
  couriers?: Courier[];
}

export interface GetCreditRequest {
  /**
   *
   * - Format: uuid
   */
  creditId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetCreditResponse {
  credit: Credit;
}

export interface GetCreditTermRequest {
  /**
   *
   * - Format: uuid
   */
  creditTermId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetCreditTermResponse {
  creditTerm: CreditTerm;
}

export interface GetCreditTermsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  creditTermIds?: string[];
}

export interface GetCreditTermsResponse {
  creditTerms?: CreditTerm[];
}

export interface GetCreditsByFilterRequest {
  filter: CreditFilter;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetCreditsByFilterResponse {
  results: FilteredCreditsResult;
}

export interface GetCreditsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  creditIds?: string[];
}

export interface GetCreditsResponse {
  credits?: Credit[];
}

export interface GetCurrentPostingItemsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetCurrentPostingItemsResponse {
  accountPostingItems: AccountPostingItems;
}

export type GetCurrentUserContextRequest = { [x in string | number]: any };

export interface GetCurrentUserContextResponse {
  userContext: UserContext;
}

export interface GetDeliveryAreaRequest {
  /**
   *
   * - Format: uuid
   */
  deliveryAreaId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetDeliveryAreaResponse {
  deliveryArea: DeliveryArea;
}

export interface GetDeliveryAreasRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  deliveryAreaIds?: string[];
}

export interface GetDeliveryAreasResponse {
  deliveryAreas?: DeliveryArea[];
}

export interface GetEntireItemRequest {
  /**
   *
   * - Format: uuid
   */
  itemId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetEntireItemResponse {
  entireItem: EntireItem;
}

export interface GetEntireItemsByFilterRequest {
  filter: ItemFilter;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetEntireItemsByFilterResponse {
  results: FilteredEntireItems;
}

export interface GetEntireItemsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  itemIds?: string[];
}

export interface GetEntireItemsResponse {
  entireItems?: EntireItem[];
}

export interface GetGlCodeRequest {
  /**
   *
   * - Format: uuid
   */
  glCodeId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetGlCodeResponse {
  glCode: GlCode;
}

export interface GetGlCodesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  glCodeIds?: string[];
}

export interface GetGlCodesResponse {
  glCodes?: GlCode[];
}

export interface GetGroupRequest {
  /**
   *
   * - Format: uuid
   */
  groupId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetGroupResponse {
  group: Group;
}

export interface GetGroupsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  groupIds?: string[];
}

export interface GetGroupsResponse {
  group?: Group[];
}

export interface GetItemAtLocationsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  limitItemIds?: string[];
  limitStockLocationIds?: string[];
}

export interface GetItemAtLocationsResponse {
  itemAtLocations?: ItemAtLocation[];
}

export interface GetItemsByFilterRequest {
  filter: ItemFilter;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetItemsByFilterResponse {
  results: FilteredItems;
}

export interface GetLinesForPriceListRequest {
  /**
   *
   * - Format: uuid
   */
  priceListId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetLinesForPriceListResponse {
  lines?: PriceListLine[];
}

export interface GetOrderRequest {
  /**
   *
   * - Format: uuid
   */
  orderId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetOrderResponse {
  order: Order;
}

export interface GetOrdersByFilterRequest {
  filter: OrderFilter;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetOrdersByFilterResponse {
  results: FilteredOrdersResult;
}

export interface GetOrdersRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  orderIds?: string[];
}

export interface GetOrdersResponse {
  orders?: Order[];
}

export interface GetOutletRatingRequest {
  /**
   *
   * - Format: uuid
   */
  outletRatingId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetOutletRatingResponse {
  outletRating: OutletRating;
}

export interface GetOutletRatingsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  outletRatingIds?: string[];
}

export interface GetOutletRatingsResponse {
  outletRatings?: OutletRating[];
}

export interface GetOutletRequest {
  /**
   *
   * - Format: uuid
   */
  outletId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetOutletResponse {
  outlet: Outlet;
}

export interface GetOutletTypeRequest {
  /**
   *
   * - Format: uuid
   */
  outletTypeId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetOutletTypeResponse {
  outletType: OutletType;
}

export interface GetOutletTypesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  outletTypeIds?: string[];
}

export interface GetOutletTypesResponse {
  outletTypes?: OutletType[];
}

export interface GetOutletsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  outletId?: string[];
}

export interface GetOutletsResponse {
  outlets?: Outlet[];
}

export interface GetPackageTypeRequest {
  /**
   *
   * - Format: uuid
   */
  packageTypeId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetPackageTypeResponse {
  packageType: PackageType;
}

export interface GetPackageTypesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  packageTypeIds?: string[];
}

export interface GetPackageTypesResponse {
  packageTypes?: PackageType[];
}

export interface GetPriceListRequest {
  /**
   *
   * - Format: uuid
   */
  priceListId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetPriceListResponse {
  priceList: PriceList;
}

export interface GetPriceListsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  priceListIds?: string[];
}

export interface GetPriceListsResponse {
  priceLists?: PriceList[];
}

export interface GetPricingCategoriesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  pricingCategoryIds?: string[];
}

export interface GetPricingCategoriesResponse {
  pricingCategory?: PricingCategory[];
}

export interface GetPricingCategoryRequest {
  /**
   *
   * - Format: uuid
   */
  pricingCategoryId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetPricingCategoryResponse {
  pricingCategory: PricingCategory;
}

export interface GetProductBrandRequest {
  /**
   *
   * - Format: uuid
   */
  productBrandId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetProductBrandResponse {
  productBrand: ProductBrand;
}

export interface GetProductBrandsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  productBrandIds?: string[];
}

export interface GetProductBrandsResponse {
  productBrands?: ProductBrand[];
}

export interface GetSalesAreaRequest {
  /**
   *
   * - Format: uuid
   */
  salesAreaId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetSalesAreaResponse {
  salesArea: SalesArea;
}

export interface GetSalesAreasRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  salesAreaIds?: string[];
}

export interface GetSalesAreasResponse {
  salesAreas?: SalesArea[];
}

export interface GetSalesCodeRequest {
  /**
   *
   * - Format: uuid
   */
  salesCodeId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetSalesCodeResponse {
  salesCode: SalesCode;
}

export interface GetSalesCodesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  salesCodeIds?: string[];
}

export interface GetSalesCodesResponse {
  salesCodes?: SalesCode[];
}

export interface GetStockGroupRequest {
  /**
   *
   * - Format: uuid
   */
  stockGroupId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetStockGroupResponse {
  stockGroup: StockGroup;
}

export interface GetStockGroupsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  stockGroupIds?: string[];
}

export interface GetStockGroupsResponse {
  stockGroups?: StockGroup[];
}

export interface GetStockItemsQuantityCurrentlyInStockRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  limitStockItemIds?: string[];
  limitStockLocationIds?: string[];
}

export interface GetStockItemsQuantityCurrentlyInStockResponse {
  stockLevels?: StockItemStockSum[];
}

export interface GetStockLocationRequest {
  /**
   *
   * - Format: uuid
   */
  stockLocationId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetStockLocationResponse {
  stockLocation: StockLocation;
}

export interface GetStockLocationsRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  stockLocationIds?: string[];
}

export interface GetStockLocationsResponse {
  stockLocations?: StockLocation[];
}

export interface GetSupplierManufacturerRequest {
  /**
   *
   * - Format: uuid
   */
  supplierManufacturerId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface GetSupplierManufacturerResponse {
  supplierManufacturer: SupplierManufacturer;
}

export interface GetSupplierManufacturersRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  supplierManufacturerIds?: string[];
}

export interface GetSupplierManufacturersResponse {
  supplierManufacturers?: SupplierManufacturer[];
}

export interface GetUnitOfMeasureRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * - Format: uuid
   */
  unitOfMeasureId: string;
}

export interface GetUnitOfMeasureResponse {
  unitOfMeasure: UnitOfMeasure;
}

export interface GetUnitsOfMeasureRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  unitOfMeasureIds?: string[];
}

export interface GetUnitsOfMeasureResponse {
  unitsOfMeasure?: UnitOfMeasure[];
}

export interface GetVatCodeRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * - Format: uuid
   */
  vatCodeId: string;
}

export interface GetVatCodeResponse {
  vatCode: VatCode;
}

export interface GetVatCodesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  vatCodeIds?: string[];
}

export interface GetVatCodesResponse {
  vatCodes?: VatCode[];
}

export interface GlCode {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * General Ledger Code
   */
  code?: string;
  /**
   *
   * General Ledger Code Name
   */
  name?: string;
}

export interface GlCodeOverride {
  /**
   *
   * Outlet Type ID
   * - Format: uuid
   */
  outletTypeId: string;
  /**
   *
   * Stock Item Id
   * - Format: uuid
   */
  stockItemId: string;
  /**
   *
   * GL Code ID
   * - Format: uuid
   */
  glCodeId?: string;
}

export interface Group {
  /**
   *
   * Accounts Department No (1-999)
   * - Format: int32
   */
  accountsDepartmentNumber: number;
  emailDocumentGrouping: EnumEmailDocumentGrouping;
  /**
   *
   * Email Invoices
   */
  emailInvoices: boolean;
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * The number of invoice copies to print. (Not used if SendInvoiceToOutlet is true).
   * - Format: int32
   */
  invoiceCopiesToPrint: number;
  isHidden: boolean;
  readOnly: GroupReadOnly;
  /**
   *
   * Send Invoices to the outlet rather than the group
   */
  sendInvoiceToOutlet: boolean;
  /**
   *
   * If true, then this Group's product requirements apply to all outlets in the group.
   */
  useGroupProductRequirementsForAllOutlets: boolean;
  /**
   *
   * If true, then this Group's sales code applies to all outlets in the group.
   */
  useGroupSalesCodeForAllOutlets: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Bank Account No
   */
  bankAccountNumber?: string;
  /**
   *
   * Bank Name
   */
  bankName?: string;
  /**
   *
   * Bank Sort Code
   */
  bankSortCode?: string;
  /**
   *
   * Default Invoice Template Id
   * - Format: uuid
   */
  defaultInvoiceTemplateId?: string;
  /**
   *
   * Delivery Service, if any, to apply by default to orders for outlets in this group. May be overriden by outlet setting, but will have priority over courier / delivery area settings.
   * - Format: uuid
   */
  deliveryServiceId?: string;
  /**
   *
   * Email Address
   */
  emailAddress?: string;
  /**
   *
   * On optional invoice data exchange template that can be used to send a list of invoices to the group
   * - Format: uuid
   */
  invoiceDataExchangeTemplateId?: string;
  /**
   *
   * Email Address that receives invoices
   */
  invoiceEmailAddress?: string;
  /**
   *
   * Main Address
   */
  mainAddressLine1?: string;
  /**
   *
   * Main Address
   */
  mainAddressLine2?: string;
  /**
   *
   * Main Address
   */
  mainAddressLine3?: string;
  /**
   *
   * Main Address
   */
  mainAddressLine4?: string;
  /**
   *
   * Main Address
   */
  mainAddressLine5?: string;
  /**
   *
   * Main Address
   */
  mainAddressLine6?: string;
  /**
   *
   * Main Address
   */
  mainAddressPostcode?: string;
  /**
   *
   * Group Name
   */
  name?: string;
  /**
   *
   * Product Requirements, eg minimum batch expiry lifetime.
   */
  productRequirements?: string;
  /**
   *
   * Sales Code Id. if UseGroupSalesCodeForAllOutlets is true then this applies to all outlets in group.
   * - Format: uuid
   */
  salesCodeId?: string;
  /**
   *
   * Tax number for posting to accounts. Only shown for countries which require a Tax Number of invoice recipients such as Germany (Steuernummer).
   */
  taxNumber?: string;
  /**
   *
   * Telephone number
   */
  telephoneNumber?: string;
  /**
   *
   * VAT Registration No.
   */
  vatNumber?: string;
}

export interface GroupReadOnly {
  /**
   *
   * Outlet Group Code
   */
  code?: string;
}

export interface Invoicing {
  /**
   *
   * Are sales currently allowed for this product? (Use to prevent selling of Eg out-of-season products).
   */
  allowSales: boolean;
  /**
   *
   * To indicate that Urn should be captured when printing labels or using in onward assemblies.
   */
  deliveryBatchTracked: boolean;
  /**
   *
   * Gl Code
   * - Format: uuid
   */
  salesGlCodeId: string;
  /**
   *
   * Country Of Origin
   */
  countryOfOrigin?: string;
  /**
   *
   * Pricing Category Id. Required for Products.
   * - Format: uuid
   */
  pricingCategoryId?: string;
  /**
   *
   * Product Brand Id. Optional even for Products.
   * - Format: uuid
   */
  productBrandId?: string;
}

export interface Item {
  alcoholDuty: AlcoholDuty;
  details: Details;
  externalCodes: ExternalCodes;
  flatPricing: FlatPricing;
  /**
   *
   * - Format: uuid
   */
  id: string;
  invoicing: Invoicing;
  labelling: Labelling;
  packaging: Packaging;
  purchasing: Purchasing;
  stock: Stock;
  vat: Vat;
  autoAssemblyBom?: AutoAssemblyBomLine[];
}

export interface ItemAtLocation {
  /**
   *
   * Whether this item should be offered for sale from this location (applicable to sales-type items).
   */
  allowSales: boolean;
  /**
   *
   * Stock Item Id
   * - Format: uuid
   */
  stockItemId: string;
  /**
   *
   * Stock Location Id
   * - Format: uuid
   */
  stockLocationId: string;
  /**
   *
   * The level at which users should re-order stock.
   * - Format: double
   */
  reorderLevel?: number;
  /**
   *
   * The default amount that the user should order.
   * - Format: double
   */
  reorderQuantity?: number;
  /**
   *
   * The level at which the user should be notified that more stock is required.
   * - Format: double
   */
  stockLevelAlert?: number;
}

export interface ItemFilter {
  codes?: string[];
  itemIds?: string[];
  mainPurposes?: EnumItemMainPurpose[];
  /**
   *
   * - Format: int32
   */
  maximumResults?: number;
  packageTypeIds?: string[];
  productBrandIds?: string[];
  purchaseGlCodeIds?: string[];
  salesGlCodeIds?: string[];
  stockGroupIds?: string[];
  supplierIds?: string[];
  vatCodeIds?: string[];
}

export interface Labelling {
  /**
   *
   * Use the Product Brand Ingredients and Allergens
   */
  labelUsesBrandIngredientsAndAllergens: boolean;
  /**
   *
   * Use the Product Brand Tasting Notes
   */
  labelUsesBrandTastingNotes: boolean;
  /**
   *
   * Ingredients and Allergens
   */
  labelIngredientsAndAllergens?: string;
  /**
   *
   * Tasting Notes (May be overridden by branding).
   */
  labelTastingNotes?: string;
}

export interface LogOutOfSessionRequest {
  /**
   *
   * - Format: uuid
   */
  tenantGroupId: string;
}

export type LogOutOfSessionResponse = { [x in string | number]: any };

export interface LoginWithCredentialsRequest {
  tenantGroupName?: string;
  userEmail?: string;
  userPassword?: string;
}

export interface LoginWithCredentialsResponse {
  sessionToken?: string;
}

export interface LoginWithGipIdTokenRequest {
  /**
   *
   * - Format: uuid
   */
  tenantGroupId: string;
  gipIdToken?: string;
}

export interface LoginWithGipIdTokenResponse {
  sessionToken?: string;
}

export interface Order {
  header: OrderHeader;
  /**
   *
   * - Format: uuid
   */
  id: string;
  lines?: OrderLine[];
}

export interface OrderFilter {
  courierIdsForCourierOrders?: string[];
  distributionTypes?: EnumDistributionType[];
  externalReferences?: string[];
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  fromDeliveryDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  fromDespatchDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  fromDutyReturnDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  fromOrderDate?: string;
  groupIds?: string[];
  invoiceNumbers?: string[];
  /**
   *
   * If provided only matching statuses are returned
   */
  limitStatuses?: EnumOrderStatus[];
  /**
   *
   * - Format: int32
   */
  maximumResults?: number;
  orderIds?: string[];
  orderNumbers?: string[];
  outletIds?: string[];
  sources?: EnumOrderSource[];
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  toDeliveryDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  toDespatchDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  toDutyReturnDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  toOrderDate?: string;
}

export interface OrderHeader {
  distributionType: EnumDistributionType;
  eireDutyMovementType: EnumEireMovementType;
  germanBeerDutyMovementType: EnumGermanBeerDutyMovementType;
  /**
   *
   * Whether an invoice has been sent for this order. Just for user information.
   */
  invoiceSent: boolean;
  /**
   *
   * - Format: uuid
   */
  orderId: string;
  /**
   *
   * Outlet Rating of Outlet at Time of order. No current Function - Stored for potential future reporting. Captured from outlet at order creation. Not editable.
   * - Format: uuid
   */
  outletRatingId: string;
  /**
   *
   * Price List used for the order. Affects price calculations and discounts. Controls which products are allowed.
   * - Format: uuid
   */
  priceListId: string;
  readOnly: OrderHeaderReadOnly;
  retailPaymentMethod: EnumRetailPaymentMethod;
  standardOrderType: EnumStandardOrder;
  /**
   *
   * Expected duration required for a delivery stop, in minutes. Used in distribution planning. Copied from Outlet by default.
   * - Format: int32
   */
  stopMinutes: number;
  /**
   *
   * Vat Code Id applicable to the order. If this is zero-rated then it will be used for lines added to the order instead of the individual product's Vat Code Id. Copied from Outlet by default.
   * - Format: uuid
   */
  vatCodeId: string;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Reference name or number from the Accounts Link posting.
   */
  accountsLinkReferenceName?: string;
  /**
   *
   * Collection Time. Just for user information.
   * - Format: uuid
   */
  collectionTimeId?: string;
  /**
   *
   * Courier. Defaults to Courier chosen for relevant Outlet. Required if distribution type is Courier.
   * - Format: uuid
   */
  courierId?: string;
  /**
   *
   * Credit Terms Description. Frozen at order entry so historic invoices can print original details. Copied from Outlets Credit terms at order creation and not editable.
   */
  creditTermsDescription?: string;
  /**
   *
   * Customer Reference. Displays on documents, sent to accounts packages.
   */
  customerReference?: string;
  /**
   *
   * Delivery Address Line 1. Displays in delivery app and documents. Sent to accounts. Copies from Outlet by default.
   */
  deliveryAddress1?: string;
  /**
   *
   * Delivery Address Line 2. Displays in delivery app and documents. Sent to accounts. Copies from Outlet by default.
   */
  deliveryAddress2?: string;
  /**
   *
   * Delivery Address Line 3. Displays in delivery app and documents. Sent to accounts. Copies from Outlet by default.
   */
  deliveryAddress3?: string;
  /**
   *
   * Delivery Address Line 4. Displays in delivery app and documents. Sent to accounts. Copies from Outlet by default.
   */
  deliveryAddress4?: string;
  /**
   *
   * Delivery Address Line 5 - County. Displays in delivery app and documents. Sent to accounts. Copies from Outlet by default.
   */
  deliveryAddress5?: string;
  /**
   *
   * Delivery Address Line 6 - Country. Displays in delivery app and documents. Sent to accounts. Copies from Outlet by default.
   */
  deliveryAddress6?: string;
  /**
   *
   * Delivery Business Name. Displays on documents. Copies from Outlet by default.
   */
  deliveryAddressBusiness?: string;
  /**
   *
   * Delivery Area. Displays in Delivery App. Copies from Outlet by default.
   * - Format: uuid
   */
  deliveryAreaId?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  deliveryDate?: string;
  /**
   *
   * The email address to use for delivery issues and updates. Just for user information. Copies from Outlet by default.
   */
  deliveryEmailAddress?: string;
  /**
   *
   * Delivery Post Code. Displays in delivery app and documents. Sent to accounts. Copies from Outlet by default.
   */
  deliveryPostcode?: string;
  /**
   *
   * Delivery Recipient Name. Just for user information. Copies from Outlet by default.
   */
  deliveryRecipient?: string;
  /**
   *
   * The phone number to use for delivery issues and updates. Just for user information. Copies from Outlet by default.
   */
  deliveryTelephoneNumber?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  deliveryTimeEnd?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  deliveryTimeStart?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  despatchDate?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  dutyReturnDateOverride?: string;
  /**
   *
   * User notes relating to dispatch of this order. Displays on documents. Copies from Outlet by default.
   */
  externalDispatchNotes?: string;
  /**
   *
   * Private notes relating to dispatch of this order. Not displayed to customer. Copies from Outlet by default.
   */
  internalDispatchNotes?: string;
  /**
   *
   * Invoice Address Line 1. Shown on docs. Sent to accounts. Copied from Outlet / Group by default.
   */
  invoiceAddress1?: string;
  /**
   *
   * Invoice Address Line 2. Shown on docs. Sent to accounts. Copied from Outlet / Group by default.
   */
  invoiceAddress2?: string;
  /**
   *
   * Invoice Address Line 3. Shown on docs. Sent to accounts. Copied from Outlet / Group by default.
   */
  invoiceAddress3?: string;
  /**
   *
   * Invoice Address Line 4. Shown on docs. Sent to accounts. Copied from Outlet / Group by default.
   */
  invoiceAddress4?: string;
  /**
   *
   * Invoice Address Line 5 - County. Shown on docs. Sent to accounts. Copied from Outlet / Group by default.
   */
  invoiceAddress5?: string;
  /**
   *
   * Invoice Address Line 6 - Country. Shown on docs. Sent to accounts. Copied from Outlet / Group by default.
   */
  invoiceAddress6?: string;
  /**
   *
   * Invoice Business Name. Shown on docs. Copied from Outlet / Group by default.
   */
  invoiceAddressBusiness?: string;
  /**
   *
   * The email address invoices will be sent to. Shown on docs. Used when invoices auto-emailed. Copied from Outlet by default.
   */
  invoiceEmailAddress?: string;
  /**
   *
   * Invoice Post Code. Shown on docs. Sent to accounts. Copied from Outlet / Group by default.
   */
  invoicePostcode?: string;
  /**
   *
   * Invoice Recipient Name. Just for user information. Copied from Outlet / Group by default.
   */
  invoiceRecipient?: string;
  /**
   *
   * Our Reference. Just for user information.
   */
  ourReference?: string;
  /**
   *
   * Outlet Type of Outlet at Time of order. Stored for potential future reporting. Also used for GlCode resolution when lines added. Captured from outlet at order creation. Not editable.
   * - Format: uuid
   */
  outletTypeId?: string;
  /**
   *
   * The Sales Area which the outlet was in at the time of the order. No current Function - Stored for potential future reporting. Captured from outlet at order creation. Not editable.
   * - Format: uuid
   */
  salesAreaId?: string;
  /**
   *
   * The Sales Code which the outlet was in at the time of the order. No current Function - Stored for potential future reporting. Captured from outlet at order creation. Not editable.
   * - Format: uuid
   */
  salesCodeId?: string;
  /**
   *
   * Sales Order Notes. Shown on docs. Sent to accounts.
   */
  salesOrderNotes?: string;
  /**
   *
   * Tracking Reference. Just for user information.
   */
  trackingReference?: string;
}

export interface OrderHeaderReadOnly {
  /**
   *
   * User who initially created the order. Captured by system not user editable.
   * - Format: uuid
   */
  createdByUserId: string;
  /**
   *
   * Set to true when stock is adjusted for this order (occurs once posting to accounts succeeds). When true it implies that the items on the order should not be modified.
   */
  hasStockBeenAdjusted: boolean;
  /**
   *
   * Identified the order as a Retail Order. Retail orders are not sent to accounts individually, but instead are packaged (typically daily) into a single summary which is sent to accounts. Retail orders present differently to Trade on UI. Captured from outlet at order creation. Not editable.
   */
  isRetailOrder: boolean;
  orderSource: EnumOrderSource;
  /**
   *
   * Outlet which the order is for. Shown on docs. Used to determine which contact in accounts the order is sent to (if not invoiced to group). Outlet is required at order create and then Not editable.
   * - Format: uuid
   */
  outletId: string;
  status: EnumOrderStatus;
  /**
   *
   * The approximate amount of duty which has/will be paid in fulfilling this order. This represents the amount of duty included in the total net price, regardless of whether that duty would be chargeable directly due to this specific sale. For example, if the sale is from non-bonded then the duty has already been paid as part of the stock transfer to non-bonded so this sale will not cause a direct duty liability but that duty element will be included in the duty cost of sale. It is approximate because actual duty return calculations will be rounded across multiple orders so cannot be exactly attributed to each individual order.
   * - Format: double
   */
  totalApproximateDutyCostOfSale: number;
  /**
   *
   * Total Cost Price of Order. (Inc Duty as applicable, Ex VAT). Essentially a cached value of the sum of NetCost of lines. Updated when lines changed. Not editable.
   * - Format: double
   */
  totalCostNet: number;
  /**
   *
   * Total Net Price of Order. Essentially a cached value of the sum of NetPrice of lines. Updated when lines changed. Not editable.
   * - Format: double
   */
  totalNetPrice: number;
  /**
   *
   * Total VAT of Order. Essentially a cached value of the sum of Vat of lines. Updated when lines changed. Not editable.
   * - Format: double
   */
  totalVat: number;
  /**
   *
   * Reason Order Cancelled. Expected to be provided at time of cancelling an order.
   */
  cancellationReason?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  cancelledAt?: string;
  /**
   *
   * User who cancelled the order. Captured by system not user editable. (Null if not cancelled).
   * - Format: uuid
   */
  cancelledByUserId?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  createdAt?: string;
  /**
   *
   * Description of the current error which is preventing this credit from being posted to accounts. Ie the error (if any) which occurred  when this was last attempted to post. The presence of text in this field implies there is a known current error so posting will not be reattempted. To reattempt posting this field must be cleared.
   */
  currentPostingError?: string;
  /**
   *
   * Latitude of delviery address (if known). Used for distribution planning, routing, mapping. Copies from Outlet by default. Not directly editable by user, but updated automatically when order delivery address changed.
   * - Format: double
   */
  deliveryLatitude?: number;
  /**
   *
   * Longitude of delviery address (if known). Used for distribution planning, routing, mapping. Copies from Outlet by default. Not directly editable by user, but updated automatically when order delivery address changed.
   * - Format: double
   */
  deliveryLongitude?: number;
  /**
   *
   * Reference of Order in External system. (OrderSource identifies which system the order was imported from eg WooCommerce / Shopify). Not editable.
   */
  externalReference?: string;
  /**
   *
   * Group (if any). Affects Discounts. Used for accounts posting (invoices post to the group not outlet unless group is marked as SendInvoicesToOutlet). Captured from outlet at order creation. Not editable.
   * - Format: uuid
   */
  groupId?: string;
  /**
   *
   * Invoice Number. Assigned on accounts posting or invoice document generation. InvoiceNumber is the key for sending the invoice to accounts packages. Not user editable.
   */
  invoiceNumber?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  lastUpdatedAt?: string;
  /**
   *
   * Order Number. Assigned at order creation. Not editable.
   */
  orderNumber?: string;
}

export interface OrderLine {
  /**
   *
   * Product Abv. Used largely in duty calculations. Captured from product when adding line to order. Not editable.
   * - Format: double
   */
  abv: number;
  alcoholType: EnumAlcoholType;
  discountBasis: EnumDiscountBasis;
  /**
   *
   * - Format: double
   */
  discountLevel: number;
  germanBeerDutyProductType: EnumGermanBeerDutyProductType;
  /**
   *
   * General Ledger Code of Line. Sent to accounts (currently Xero only). Captured from Product (and possibly override for order OutletTypeId) when line is added to order. Not editable.
   * - Format: uuid
   */
  glCodeId: string;
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * Set true if this item is brewed by members of the public for their personal use by borrowing the Brewery's equipment. This is a service offered by breweries in some countries, such as Australia, and can affect duty.
   */
  isBrewedForPersonalUse: boolean;
  /**
   *
   * Set true if this item is designed to be connected to a pump or pressurised gas system, such as those used in pubs. Some duty systems have different duty rates for beer packaged in these manners for selling to pubs.
   */
  isDesignedForPump: boolean;
  isDiscountAutomatic: boolean;
  /**
   *
   * Line Cost Price (Inc Duty, Exc Vat). Used for profit calculations. Calculated when line is added to order, or order lines are edited. Not editable.
   * - Format: double
   */
  lineCostNetPrice: number;
  /**
   *
   * Net (no VAT) Price charged for the line. Not directly editable, calculated from other line properties (List Price, Discount)
   * - Format: double
   */
  lineNetPrice: number;
  /**
   *
   * Total VAT for the line. Not directly editable, calculated from other line properties (List Price, Discount)
   * - Format: double
   */
  lineVat: number;
  /**
   *
   * - Format: uuid
   */
  orderId: string;
  /**
   *
   * Quantity Ordered
   * - Format: double
   */
  quantity: number;
  readOnly: OrderLineReadOnly;
  /**
   *
   * Sequence for ordering lines.
   * - Format: int32
   */
  sequence: number;
  spiritDutyExemptionReason: EnumSpiritDutyExemptionReason;
  /**
   *
   * Stock Item Id. Given when line is added to order. Not editable.
   * - Format: uuid
   */
  stockItemId: string;
  /**
   *
   * Stock Location Id from which this line is despatched.
   * - Format: uuid
   */
  stockLocationId: string;
  /**
   *
   * Product Cost Price. Calculated when line is added to order, or order lines are edited. Not editable.
   * - Format: double
   */
  unitCostNetPrice: number;
  /**
   *
   * Product Dutiable Litres.
   * - Format: double
   */
  unitDutiableLitres: number;
  /**
   *
   * Unit List Net Price. This is the base list price before any applicable discount. Captured from Price List when line is added to order, but can be edited.
   * - Format: double
   */
  unitListNetPrice: number;
  /**
   *
   * Product Unit Litres. Affects liquid-volume based discounts. Captured from the package type of the product when line is added to order. Not editable.
   * - Format: double
   */
  unitLitres: number;
  /**
   *
   * Unit Net Price. Evaluated from other pricing information. Not editable.
   * - Format: double
   */
  unitNetPrice: number;
  /**
   *
   * Unit of Measure Id. Captured from product when line is added to order. Not editable.
   * - Format: uuid
   */
  unitOfMeasureId: string;
  /**
   *
   * Vat Code Applicable to the line.
   * - Format: uuid
   */
  vatCodeId: string;
  /**
   *
   * Vat Percentage at time of order.
   * - Format: double
   */
  vatPercentage: number;
  /**
   *
   * The Bogof offer, if any, for which this is the free product.
   * - Format: uuid
   */
  bogofId?: string;
  /**
   *
   * Litres held by the final consumable packaged unit, if relevant. For example, a case of 12 x 500ml bottles would have a final unit litres of 0.5. Some duty systems have different rates depending upon this value.
   * - Format: double
   */
  finalUnitLitres?: number;
  /**
   *
   * - Format: double
   */
  germanBeerMixedProductPercentageA?: number;
  /**
   *
   * Manufacturer of the product. Can affect duty (particularly UK Beer Duty). Required if AlcoholType is not None. Copied from Product when line added to order. Not editable.
   * - Format: uuid
   */
  manufacturerId?: string;
  /**
   *
   * Plato Value
   * - Format: double
   */
  plato?: number;
  /**
   *
   * Pricing Category. Used for evaluating and reevaluating price/discounts. Captured from product when line is added to order. Not editable
   * - Format: uuid
   */
  pricingCategoryId?: string;
  /**
   *
   * Product Brand at time of Order. No current functionality. Stored for potential future reporting. Captured from product when line is added to order. Not editable.
   * - Format: uuid
   */
  productBrandId?: string;
  /**
   *
   * Product Code at time of adding line to order. Captured so reprinted invoices etc show original code. Captured from product when line is added to order. Not editable.
   */
  productCode?: string;
  /**
   *
   * Product Name. Stored so invoice can be recreated. Can be edited (useful for eg Miscellaneous / Guest products). Defaults to name of product when line is added to order.
   */
  productName?: string;
  /**
   *
   * Populated with gross product list price from the price list. Used to ensure tax calculations round to the gross value correctly. Null if no rounding is necessary.
   * - Format: double
   */
  unitListGrossPriceForRounding?: number;
}

export interface OrderLineReadOnly {
  /**
   *
   * The approximate amount of duty which has/will be paid in fulfilling this order line. This represents the amount of duty included in the line net price, regardless of whether that duty would be chargeable directly due to this specific sale. For example, if the sale is from non-bonded then the duty has already been paid as part of the stock transfer to non-bonded so this sale will not cause a direct duty liability but that duty element will be included in the duty cost of sale. It is approximate because actual duty return calculations will be rounded across multiple orders so cannot be exactly attributed to each individual order.
   * - Format: double
   */
  approximateDutyCostOfSale: number;
}

export interface Outlet {
  /**
   *
   * Accounts Department No (1-999)
   * - Format: int32
   */
  accountsDepartmentNumber: number;
  /**
   *
   * Application Form Returned
   */
  applicationFormReturned: boolean;
  /**
   *
   * Credit Terms Set
   */
  creditTermsSet: boolean;
  /**
   *
   * The number of despatch notes to print
   * - Format: int32
   */
  despatchNoteCopiesToPrint: number;
  distributionType: EnumDistributionType;
  eireDutyMovementType: EnumEireMovementType;
  emailDespatchNotifications: EnumDeliveryNotificationSetting;
  emailDocumentGrouping: EnumEmailDocumentGrouping;
  /**
   *
   * Email Invoices
   */
  emailInvoices: boolean;
  exportingIncotermCode: EnumExportIncotermCode;
  germanBeerDutyMovementType: EnumGermanBeerDutyMovementType;
  /**
   *
   * HasDefaultDeliveryAddress
   */
  hasDefaultDeliveryAddress: boolean;
  /**
   *
   * HasDefaultInvoiceAddress
   */
  hasDefaultInvoiceAddress: boolean;
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * The number of invoice copies to print. (Not used if invoice goes to group).
   * - Format: int32
   */
  invoiceCopiesToPrint: number;
  isHidden: boolean;
  /**
   *
   * Outlet Rating
   * - Format: uuid
   */
  outletRatingId: string;
  /**
   *
   * Price List
   * - Format: uuid
   */
  priceListId: string;
  readOnly: OutletReadOnly;
  smsDespatchNotifications: EnumDeliveryNotificationSetting;
  standardOrderType: EnumStandardOrder;
  /**
   *
   * Default Stock Location
   * - Format: uuid
   */
  stockLocationId: string;
  /**
   *
   * Stop Minutes
   * - Format: int32
   */
  stopMinutes: number;
  /**
   *
   * VAT Code
   * - Format: uuid
   */
  vatCodeId: string;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Bank Account No
   */
  bankAccountNumber?: string;
  /**
   *
   * Bank Name
   */
  bankName?: string;
  /**
   *
   * Bank Sort Code
   */
  bankSortCode?: string;
  /**
   *
   * Beerflex Customer Code
   */
  beerflexCode?: string;
  /**
   *
   * Bank Identification Code
   */
  bic?: string;
  /**
   *
   * Name
   */
  businessName?: string;
  /**
   *
   * Company Number of the outlet
   */
  companyRegNumber?: string;
  /**
   *
   * Country Code (for Accounts)
   */
  countryCode?: string;
  /**
   *
   * Courier
   * - Format: uuid
   */
  courierId?: string;
  /**
   *
   * Credit Limit
   * - Format: double
   */
  creditLimit?: number;
  /**
   *
   * Credit Terms
   * - Format: uuid
   */
  creditTermsId?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressBusiness?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressLine1?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressLine2?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressLine3?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressLine4?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressLine5?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressLine6?: string;
  /**
   *
   * Default Delivery Address
   */
  defaultDeliveryAddressPostcode?: string;
  /**
   *
   * The default email address to use for delivery issues and updates.
   */
  defaultDeliveryEmailAddress?: string;
  /**
   *
   * The recipient of the delivery
   */
  defaultDeliveryRecipient?: string;
  /**
   *
   * The default phone number to use for delivery issues and updates.
   */
  defaultDeliveryTelephoneNumber?: string;
  /**
   *
   * Default Despatch Note Template Id
   * - Format: uuid
   */
  defaultDespatchNoteTemplateId?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressBusiness?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressLine1?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressLine2?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressLine3?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressLine4?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressLine5?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressLine6?: string;
  /**
   *
   * Default Invoice Address
   */
  defaultInvoiceAddressPostcode?: string;
  /**
   *
   * The default email address invoices will be sent to if not updated by the order.
   */
  defaultInvoiceEmailAddress?: string;
  /**
   *
   * Default invoice recipient
   */
  defaultInvoiceRecipient?: string;
  /**
   *
   * Default Invoice Template Id
   * - Format: uuid
   */
  defaultInvoiceTemplateId?: string;
  /**
   *
   * Delivery Area
   * - Format: uuid
   */
  deliveryAreaId?: string;
  /**
   *
   * Text to appear on Delivery Notes
   */
  deliveryNoteText?: string;
  /**
   *
   * Delivery Service, if any, to apply by default to orders for this outlet. Has priority over group / courier / delivery area settings.
   * - Format: uuid
   */
  deliveryServiceId?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  deliveryTimeEnd?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  deliveryTimeStart?: string;
  /**
   *
   * Email address to send Despatch Email to, if EmailDespatchNotifications is ToSpecifiedAddress
   */
  despatchConfirmationEmailAddress?: string;
  /**
   *
   * Phone number to send Despatch SMS to, if SmsDespatchNotifications is ToSpecifiedAddress
   */
  despatchConfirmationSmsTelephoneNumber?: string;
  /**
   *
   * Internal name shown only to the users of the BrewMan system
   */
  displayName?: string;
  /**
   *
   * Notes to appear on the Dray Run
   */
  drayRunNotes?: string;
  /**
   *
   * Email Address
   */
  emailAddress?: string;
  /**
   *
   * Template Id for sending despatch notification Emails.
   * - Format: uuid
   */
  emailDespatchNotificationTemplateId?: string;
  /**
   *
   * EORI Number
   */
  eoriNumber?: string;
  /**
   *
   * Exporting Incoterm Place
   */
  exportingIncotermPlace?: string;
  /**
   *
   * Outlet Group
   * - Format: uuid
   */
  groupId?: string;
  /**
   *
   * International Bank Account Number
   */
  iban?: string;
  invoiceNotes?: string;
  /**
   *
   * Default Invoice Address
   */
  mainAddressLine1?: string;
  /**
   *
   * Default Invoice Address
   */
  mainAddressLine2?: string;
  /**
   *
   * Default Invoice Address
   */
  mainAddressLine3?: string;
  /**
   *
   * Default Invoice Address
   */
  mainAddressLine4?: string;
  /**
   *
   * Default Invoice Address
   */
  mainAddressLine5?: string;
  /**
   *
   * Default Invoice Address
   */
  mainAddressLine6?: string;
  /**
   *
   * Default Invoice Address
   */
  mainAddressPostcode?: string;
  /**
   *
   * The code used by the outlets group to identify this outlet. Will appear as a document tag for use on invoices and invoice data exchanges.
   */
  outletGroupCode?: string;
  /**
   *
   * Outlet Type
   * - Format: uuid
   */
  outletTypeId?: string;
  /**
   *
   * Product Requirements, eg minimum batch expiry lifetime. Not applicable if Outlet is in a group with UseGroupProductRequirementsForAllOutlets true
   */
  productRequirements?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  reviewDate?: string;
  /**
   *
   * Sales Area Id
   * - Format: uuid
   */
  salesAreaId?: string;
  /**
   *
   * Sales Code Id
   * - Format: uuid
   */
  salesCodeId?: string;
  /**
   *
   * Sales Notes
   */
  salesNotes?: string;
  /**
   *
   * Sales Warning
   */
  salesWarning?: string;
  /**
   *
   * Template Id for sending despatch notification SMS.
   * - Format: uuid
   */
  smsDespatchNotificationTemplateId?: string;
  /**
   *
   * Tax number for posting to accounts. Only shown for countries which require a Tax Number of invoice recipients such as Germany (Steuernummer).
   */
  taxNumber?: string;
  /**
   *
   * Telephone number
   */
  telephoneNumber?: string;
  /**
   *
   * Trading Terms
   */
  tradingTerms?: string;
  /**
   *
   * VAT Registration No.
   */
  vatNumber?: string;
  /**
   *
   * Western Australia's Liquor Licence Number, only show for Australia region.
   */
  waLiquorLicenceNumber?: string;
  webAddress?: string;
}

export interface OutletCreditBalance {
  /**
   *
   * - Format: uuid
   */
  outletId: string;
  /**
   *
   * - Format: double
   */
  creditBalance?: number;
}

export interface OutletRating {
  /**
   *
   * Allow Orders?
   */
  allowOrders: boolean;
  /**
   *
   * Exclude from the Outlet List Display
   */
  excludeFromOutletList: boolean;
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Rating Description
   */
  name?: string;
}

export interface OutletReadOnly {
  /**
   *
   * Identifies if this is a Retail Outlet.
   */
  isRetail: boolean;
  /**
   *
   * Outlet Code
   */
  code?: string;
  /**
   *
   * Default Latitude of delviery address (if known)
   * - Format: double
   */
  defaultDeliveryLatitude?: number;
  /**
   *
   * Default Longitude of delviery address (if known)
   * - Format: double
   */
  defaultDeliveryLongitude?: number;
  /**
   *
   * Latitude
   * - Format: double
   */
  mainLatitude?: number;
  /**
   *
   * Longitude
   * - Format: double
   */
  mainLongitude?: number;
}

export interface OutletType {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Type Description
   */
  name?: string;
}

export interface PackageType {
  categoryType: EnumPackageTypeCategoryType;
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * Set true if this is designed to be connected to a pump or pressurised gas system, such as those used in pubs. Some duty systems have different duty rates for beer packaged in these manners for selling to pubs.
   */
  isDesignedForPump: boolean;
  isHidden: boolean;
  /**
   *
   * Package is normally returnable, so expect it to be scanned out and in.
   */
  isReturnable: boolean;
  /**
   *
   * Package is normally traceable, so expect it to be scanned out on orders.
   */
  isTraceable: boolean;
  kegstarContainerType: EnumKegstarContainerType;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Label document template that the package type will use for non-returnable labels.
   * - Format: uuid
   */
  defaultNonReturnableLabelDocumentTemplateId?: string;
  /**
   *
   * Label document template that the package type will use for returnable labels.
   * - Format: uuid
   */
  defaultReturnableLabelDocumentTemplateId?: string;
  /**
   *
   * Litres held by the final consumable packaged unit, if relevant. For example, a package type representing a case of 12 x 500ml bottles would have a final unit litres of 0.5. Some duty systems have different rates depending upon this value.
   * - Format: double
   */
  finalUnitLitres?: number;
  /**
   *
   * Litres usually dispensed into this package, if relevant
   * - Format: double
   */
  litres?: number;
  /**
   *
   * Package Type
   */
  name?: string;
}

export interface Packaging {
  /**
   *
   * Flag indicating whether we can take an order which requires us to rack beer IN to this product (for scenario where we do not have stock of this product but do have liquid beer available).
   */
  rackToOrder: boolean;
  /**
   *
   * Weight (kg)
   * - Format: double
   */
  weightKg: number;
  /**
   *
   * Export Weight, if different to standard weight.
   * - Format: double
   */
  exportWeight?: number;
  /**
   *
   * Net Weight (kg), Ie if this item is a packaged thing such as a foodstuff then the actual weight of the foodstuff within the package.
   * - Format: double
   */
  netWeightKg?: number;
  /**
   *
   * Package Type Id. Optional even for Products
   * - Format: uuid
   */
  packageTypeId?: string;
}

export interface PriceList {
  /**
   *
   * Automatically Calculate Discounts
   */
  allowsAutomaticDiscounts: boolean;
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * Use Gross Pricing
   */
  usesGrossPricing: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Name
   */
  name?: string;
  /**
   *
   * Notes
   */
  notes?: string;
}

export interface PriceListLine {
  /**
   *
   * Product is Active on this Price List
   */
  isAvailable: boolean;
  /**
   *
   * Price List
   * - Format: uuid
   */
  priceListId: string;
  /**
   *
   * Stock Item (Expected to be product not material)
   * - Format: uuid
   */
  stockItemId: string;
  /**
   *
   * Product Unit List Price
   * - Format: double
   */
  currentListPrice?: number;
  /**
   *
   * Next List Price - prepared for list price
   * - Format: double
   */
  plannedListPrice?: number;
  /**
   *
   * Last List Price - Saved Last List Price so that Prices can be reversed
   * - Format: double
   */
  previousListPrice?: number;
}

export interface PricingCategory {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Pricing Category
   */
  name?: string;
}

export interface ProductBrand {
  /**
   *
   * Are sales currently allowed for products in this brand? (Use to prevent selling of Eg out-of-season products).
   */
  allowSales: boolean;
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Alternative Logo for Label Printing
   * - Format: uuid
   */
  imageId?: string;
  /**
   *
   * Ingredients and Allergens
   */
  ingredientsAndAllergens?: string;
  /**
   *
   * Product Brand Name
   */
  name?: string;
  /**
   *
   * Product Brand Notes
   */
  notes?: string;
  /**
   *
   * Tasting Notes
   */
  tastingNotes?: string;
}

export interface ProductQuantity {
  /**
   *
   * Id to give the built line.
   * - Format: uuid
   */
  lineId: string;
  /**
   *
   * - Format: double
   */
  quantity: number;
  /**
   *
   * Id of Stock Item, which should be a Product
   * - Format: uuid
   */
  stockItemId: string;
}

export interface Purchasing {
  /**
   *
   * Number of days typically between ordering and receiving item.
   * - Format: int32
   */
  leadTimeDays: number;
  /**
   *
   * - Format: uuid
   */
  supplierId: string;
  /**
   *
   * Purchase GL Code
   * - Format: uuid
   */
  purchaseGlCodeId?: string;
  /**
   *
   * Supplier Pack Size
   * - Format: double
   */
  purchasePackSize?: number;
  /**
   *
   * Purchase Pack Price
   * - Format: double
   */
  purchasePrice?: number;
  /**
   *
   * Supplier Part Number
   */
  supplierPartNo?: string;
}

export interface RecordCreditPostingResultRequest {
  /**
   *
   * - Format: uuid
   */
  creditNoteId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * Error text, if any. Empty implies posting was successful.
   */
  postingError?: string;
}

export type RecordCreditPostingResultResponse = { [x in string | number]: any };

export interface RecordOrderPostingResultRequest {
  /**
   *
   * - Format: uuid
   */
  orderId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * Error text, if any. Empty implies posting was successful.
   */
  postingError?: string;
}

export type RecordOrderPostingResultResponse = { [x in string | number]: any };

export interface RecordPurchaseOrderPostingResultRequest {
  /**
   *
   * - Format: uuid
   */
  purchaseOrderId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * Error text, if any. Empty implies posting was successful.
   */
  postingError?: string;
}

export type RecordPurchaseOrderPostingResultResponse = {
  [x in string | number]: any;
};

export interface RecordRetailOrderSummaryPostingResultRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  /**
   *
   * Error text, if any. Empty implies posting was successful.
   */
  postingError?: string;
  retailSummaryInvoiceNumber?: string;
}

export type RecordRetailOrderSummaryPostingResultResponse = {
  [x in string | number]: any;
};

export interface SalesArea {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Sales Area Description
   */
  description?: string;
  /**
   *
   * Sales Area Name
   */
  name?: string;
}

export interface SalesCode {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Sales Code Description
   */
  description?: string;
  /**
   *
   * Sales Code Name
   */
  name?: string;
}

export interface SaveCreditRequest {
  credit: Credit;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface SaveCreditResponse {
  credit: Credit;
}

export interface SaveOrderRequest {
  order: Order;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
}

export interface SaveOrderResponse {
  order: Order;
}

export interface Stock {
  /**
   *
   * Is Tracked in Batches.
   */
  isBatchTracked: boolean;
  /**
   *
   * Is this item perishable.
   */
  isPerishable: boolean;
  /**
   *
   * Stock Group Id
   * - Format: uuid
   */
  stockGroupId: string;
}

export interface StockGroup {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * Restricted Stock - Raises warning on attempt to over-sell.
   */
  restrictedStock: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Name
   */
  name?: string;
}

export interface StockItemStockSum {
  /**
   *
   * - Format: double
   */
  quantity: number;
  /**
   *
   * - Format: uuid
   */
  stockItemId: string;
  /**
   *
   * - Format: uuid
   */
  stockLocationId: string;
  /**
   *
   * - Format: uuid
   */
  unitOfMeasureId: string;
}

export interface StockLocation {
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * Bonded
   */
  isBonded: boolean;
  /**
   *
   * Default Location
   */
  isDefault: boolean;
  /**
   *
   * Whether the stock location is an external stock location.
   */
  isExternal: boolean;
  isHidden: boolean;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Address 1
   */
  addressLine1?: string;
  /**
   *
   * Address 2
   */
  addressLine2?: string;
  /**
   *
   * Address 3
   */
  addressLine3?: string;
  /**
   *
   * Address 4
   */
  addressLine4?: string;
  /**
   *
   * Address 5
   */
  addressLine5?: string;
  /**
   *
   * Address 6
   */
  addressLine6?: string;
  /**
   *
   * Contact
   */
  contactName?: string;
  /**
   *
   * The distribution centre which distributes stock from this location. If null then the company location is used.
   * - Format: uuid
   */
  distributionCentre?: string;
  /**
   *
   * Email
   */
  emailAddress?: string;
  /**
   *
   * Name
   */
  name?: string;
  /**
   *
   * Telephone
   */
  phoneNumber?: string;
  /**
   *
   * Postcode
   */
  postcode?: string;
  /**
   *
   * Tax code for this warehouse, used for duty schemes where duty reporting is required to be broken down by warehouse.
   */
  warehouseTaxCode?: string;
}

export interface SupplierManufacturer {
  /**
   *
   * Default delivery price to add to purchase orders for this supplier.
   * - Format: double
   */
  defaultPoDeliveryCharge: number;
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  /**
   *
   * Is this a Manufacturer?
   */
  isManufacturer: boolean;
  /**
   *
   * Is this a Supplier?
   */
  isSupplier: boolean;
  readOnly: SupplierManufacturerReadOnly;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Address
   */
  addressLine1?: string;
  /**
   *
   * Address
   */
  addressLine2?: string;
  /**
   *
   * Address
   */
  addressLine3?: string;
  /**
   *
   * Address
   */
  addressLine4?: string;
  /**
   *
   * Address
   */
  addressLine5?: string;
  /**
   *
   * Address
   */
  addressLine6?: string;
  annualProduction?: AnnualProductionEntry[];
  /**
   *
   * AWRS Number
   */
  awrsNumber?: string;
  /**
   *
   * Bank Identification Code
   */
  bic?: string;
  /**
   *
   * Name
   */
  businessName?: string;
  /**
   *
   * Code. Used for linking to external systems such as accounts package. Can not be changed after creation.
   */
  code?: string;
  /**
   *
   * Contact Name
   */
  contactName?: string;
  /**
   *
   * Email
   */
  emailAddress?: string;
  /**
   *
   * International Bank Account Number
   */
  iban?: string;
  /**
   *
   * Mobile Number
   */
  mobileNumber?: string;
  /**
   *
   * Notes
   */
  notes?: string;
  /**
   *
   * Telephone No
   */
  phoneNumber?: string;
  /**
   *
   * Post Code
   */
  postcode?: string;
  /**
   *
   * Purchase order document template set to this supplier.
   * - Format: uuid
   */
  purchaseOrderTemplateId?: string;
  /**
   *
   * Standard Vat Code Id
   * - Format: uuid
   */
  vatCodeId?: string;
  /**
   *
   * VAT Registration Code
   */
  vatReg?: string;
}

export interface SupplierManufacturerReadOnly {
  /**
   *
   * Identifies if this Manufacturer is the tenant themselves.
   */
  isTenant: boolean;
}

export interface TenantGroupIntegrationTestData {
  /**
   *
   * - Format: uuid
   */
  tenantGroupId: string;
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  tenantGroupName?: string;
  tenantName?: string;
  userEmail?: string;
  userName?: string;
  userPassword?: string;
}

export interface UnitOfMeasure {
  /**
   *
   * - Format: uuid
   */
  id: string;
  isHidden: boolean;
  readOnly: UnitOfMeasureReadOnly;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * Litres
   * - Format: double
   */
  litres?: number;
  /**
   *
   * Name
   */
  name?: string;
}

export interface UnitOfMeasureReadOnly {
  /**
   *
   * Identifies if this is the system unit of measure for units, used for all product stock items.
   */
  isUnits: boolean;
}

export interface UpdateCreditBalancesRequest {
  /**
   *
   * - Format: uuid
   */
  tenantId: string;
  outletCreditBalances?: OutletCreditBalance[];
}

export type UpdateCreditBalancesResponse = { [x in string | number]: any };

export interface User {
  calculated: UserCalculated;
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * True, if this user is disabled (i.e. cannot log in)
   */
  isDisabled: boolean;
  isHidden: boolean;
  readOnly: UserReadOnly;
  userTenantGroupLevel: EnumUserTenantGroupLevel;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * User email and login ID
   */
  email?: string;
  /**
   *
   * Job title in the company
   */
  jobTitle?: string;
  /**
   *
   * The preferred locale for translating language for this user, Eg 'en-us'. If empty, then the system default (english) will be used.
   */
  languageLocale?: string;
  /**
   *
   * The users name
   */
  name?: string;
}

export interface UserCalculated {
  hasApiSecurityToken: boolean;
  hasGipId: boolean;
}

export interface UserContext {
  /**
   *
   * - Format: uuid
   */
  tenantGroupId: string;
  user: User;
}

export interface UserReadOnly {
  /**
   *
   * True, if this user has verified their email address, often through an external identity provider. (Updated by system).
   */
  isEmailVerified: boolean;
  /**
   *
   * True, if this user is a support user
   */
  isSupportUser: boolean;
  /**
   *
   * True, if this user is an internal system user
   */
  isSystemUser: boolean;
  /**
   *
   * Tenant group id
   * - Format: uuid
   */
  tenantGroupId: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  invitedAt?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  lastLogonAt?: string;
  /**
   *
   * Timestamp of invitation (if any) to join the tenant group (updated by system).
   */
  passwordLastChanged?: string;
  /**
   *
   * The tenant within the tenant group the user has selected to view
   * - Format: uuid
   */
  selectedTenant?: string;
}

export interface Vat {
  /**
   *
   * Vat Code Id
   * - Format: uuid
   */
  vatCodeId: string;
}

export interface VatCode {
  /**
   *
   * - Format: uuid
   */
  id: string;
  /**
   *
   * Default Vat Code for new outlets.
   */
  isDefault: boolean;
  /**
   *
   * Exempt Code
   */
  isExempt: boolean;
  /**
   *
   * Export Code
   */
  isExport: boolean;
  isHidden: boolean;
  /**
   *
   * VAT Percentage
   * - Format: double
   */
  vatPercentage: number;
  /**
   *
   * - Format: int64
   */
  version: number;
  /**
   *
   * The Code used to communicate this Vat Code to the accounts package for Purchases of items with this Vat Code. Only required if different to the code for sales. (Code for sales will be used if this is empty).  For Sage this is typically empty as Sage does not distinguish Vat types between sales and purchases.  For Xero it is typically '20% (VAT on Expenses)', 'Exempt Expeses', etc.
   */
  accountsCodeForPurchases?: string;
  /**
   *
   * The Code used to communicate this Vat Code to the accounts package for Sales of items with this VAT code. For Sage this is typically 'T0', 'T1', etc. For Xero it is typically 'Standard (20%)', 'Exempt Income', etc.
   */
  accountsCodeForSales?: string;
  /**
   *
   * Name
   */
  name?: string;
}
