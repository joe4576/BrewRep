/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 5
 */

import { AxiosRequestConfig } from "axios";
import { SwaggerResponse } from "./config";
import { Http } from "./httpRequest";
import {
  BuildCreditHeaderRequest,
  BuildCreditHeaderResponse,
  BuildCreditLinesRequest,
  BuildCreditLinesResponse,
  BuildOrderLinesRequest,
  BuildOrderLinesResponse,
  CalculateNextDespatchDateByCourierRequest,
  CalculateNextDespatchDateByCourierResponse,
  CalculateNextDespatchDateByDeliveryAreaRequest,
  CalculateNextDespatchDateByDeliveryAreaResponse,
  CollectionTime,
  Courier,
  CreateCreditRequest,
  CreateCreditResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  CreateTenantGroupForIntegrationTestsRequest,
  CreateTenantGroupForIntegrationTestsResponse,
  Credit,
  CreditTerm,
  DeliveryArea,
  GetAllCollectionTimesRequest,
  GetAllCollectionTimesResponse,
  GetAllCouriersRequest,
  GetAllCouriersResponse,
  GetAllCreditTermsRequest,
  GetAllCreditTermsResponse,
  GetAllDeliveryAreasRequest,
  GetAllDeliveryAreasResponse,
  GetAllGlCodeOverridesRequest,
  GetAllGlCodeOverridesResponse,
  GetAllGlCodesRequest,
  GetAllGlCodesResponse,
  GetAllGroupsRequest,
  GetAllGroupsResponse,
  GetAllOutletRatingsRequest,
  GetAllOutletRatingsResponse,
  GetAllOutletTypesRequest,
  GetAllOutletTypesResponse,
  GetAllOutletsRequest,
  GetAllOutletsResponse,
  GetAllPackageTypesRequest,
  GetAllPackageTypesResponse,
  GetAllPriceListsRequest,
  GetAllPriceListsResponse,
  GetAllPricingCategoriesRequest,
  GetAllPricingCategoriesResponse,
  GetAllProductBrandsRequest,
  GetAllProductBrandsResponse,
  GetAllSalesAreasRequest,
  GetAllSalesAreasResponse,
  GetAllSalesCodesRequest,
  GetAllSalesCodesResponse,
  GetAllStockGroupsRequest,
  GetAllStockGroupsResponse,
  GetAllStockLocationsRequest,
  GetAllStockLocationsResponse,
  GetAllSupplierManufacturersRequest,
  GetAllSupplierManufacturersResponse,
  GetAllUnitsOfMeasureRequest,
  GetAllUnitsOfMeasureResponse,
  GetAllVatCodesRequest,
  GetAllVatCodesResponse,
  GetCollectionTimeRequest,
  GetCollectionTimeResponse,
  GetCollectionTimesRequest,
  GetCollectionTimesResponse,
  GetCourierRequest,
  GetCourierResponse,
  GetCouriersRequest,
  GetCouriersResponse,
  GetCreditRequest,
  GetCreditResponse,
  GetCreditTermRequest,
  GetCreditTermResponse,
  GetCreditTermsRequest,
  GetCreditTermsResponse,
  GetCreditsByFilterRequest,
  GetCreditsByFilterResponse,
  GetCreditsRequest,
  GetCreditsResponse,
  GetCurrentPostingItemsRequest,
  GetCurrentPostingItemsResponse,
  GetCurrentUserContextRequest,
  GetCurrentUserContextResponse,
  GetDeliveryAreaRequest,
  GetDeliveryAreaResponse,
  GetDeliveryAreasRequest,
  GetDeliveryAreasResponse,
  GetEntireItemRequest,
  GetEntireItemResponse,
  GetEntireItemsByFilterRequest,
  GetEntireItemsByFilterResponse,
  GetEntireItemsRequest,
  GetEntireItemsResponse,
  GetGlCodeRequest,
  GetGlCodeResponse,
  GetGlCodesRequest,
  GetGlCodesResponse,
  GetGroupRequest,
  GetGroupResponse,
  GetGroupsRequest,
  GetGroupsResponse,
  GetItemAtLocationsRequest,
  GetItemAtLocationsResponse,
  GetItemsByFilterRequest,
  GetItemsByFilterResponse,
  GetLinesForPriceListRequest,
  GetLinesForPriceListResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersByFilterRequest,
  GetOrdersByFilterResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  GetOutletRatingRequest,
  GetOutletRatingResponse,
  GetOutletRatingsRequest,
  GetOutletRatingsResponse,
  GetOutletRequest,
  GetOutletResponse,
  GetOutletTypeRequest,
  GetOutletTypeResponse,
  GetOutletTypesRequest,
  GetOutletTypesResponse,
  GetOutletsRequest,
  GetOutletsResponse,
  GetPackageTypeRequest,
  GetPackageTypeResponse,
  GetPackageTypesRequest,
  GetPackageTypesResponse,
  GetPriceListRequest,
  GetPriceListResponse,
  GetPriceListsRequest,
  GetPriceListsResponse,
  GetPricingCategoriesRequest,
  GetPricingCategoriesResponse,
  GetPricingCategoryRequest,
  GetPricingCategoryResponse,
  GetProductBrandRequest,
  GetProductBrandResponse,
  GetProductBrandsRequest,
  GetProductBrandsResponse,
  GetSalesAreaRequest,
  GetSalesAreaResponse,
  GetSalesAreasRequest,
  GetSalesAreasResponse,
  GetSalesCodeRequest,
  GetSalesCodeResponse,
  GetSalesCodesRequest,
  GetSalesCodesResponse,
  GetStockGroupRequest,
  GetStockGroupResponse,
  GetStockGroupsRequest,
  GetStockGroupsResponse,
  GetStockItemsQuantityCurrentlyInStockRequest,
  GetStockItemsQuantityCurrentlyInStockResponse,
  GetStockLocationRequest,
  GetStockLocationResponse,
  GetStockLocationsRequest,
  GetStockLocationsResponse,
  GetSupplierManufacturerRequest,
  GetSupplierManufacturerResponse,
  GetSupplierManufacturersRequest,
  GetSupplierManufacturersResponse,
  GetUnitOfMeasureRequest,
  GetUnitOfMeasureResponse,
  GetUnitsOfMeasureRequest,
  GetUnitsOfMeasureResponse,
  GetVatCodeRequest,
  GetVatCodeResponse,
  GetVatCodesRequest,
  GetVatCodesResponse,
  GlCode,
  Group,
  Item,
  ItemAtLocation,
  LogOutOfSessionRequest,
  LogOutOfSessionResponse,
  LoginWithCredentialsRequest,
  LoginWithCredentialsResponse,
  LoginWithGipIdTokenRequest,
  LoginWithGipIdTokenResponse,
  Order,
  Outlet,
  OutletRating,
  OutletType,
  PackageType,
  PriceList,
  PricingCategory,
  ProductBrand,
  RecordCreditPostingResultRequest,
  RecordCreditPostingResultResponse,
  RecordOrderPostingResultRequest,
  RecordOrderPostingResultResponse,
  RecordPurchaseOrderPostingResultRequest,
  RecordPurchaseOrderPostingResultResponse,
  RecordRetailOrderSummaryPostingResultRequest,
  RecordRetailOrderSummaryPostingResultResponse,
  SalesArea,
  SalesCode,
  SaveCreditRequest,
  SaveCreditResponse,
  SaveOrderRequest,
  SaveOrderResponse,
  Stock,
  StockGroup,
  StockLocation,
  SupplierManufacturer,
  UnitOfMeasure,
  UpdateCreditBalancesRequest,
  UpdateCreditBalancesResponse,
  User,
  VatCode,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __DEV__ = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideConfig(
  config?: AxiosRequestConfig,
  configOverride?: AxiosRequestConfig
): AxiosRequestConfig {
  return {
    ...config,
    ...configOverride,
    headers: {
      ...config?.headers,
      ...configOverride?.headers,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function template(path: string, obj: { [x: string]: any } = {}) {
  Object.keys(obj).forEach((key) => {
    const re = new RegExp(`{${key}}`, "i");
    path = path.replace(re, obj[key]);
  });

  return path;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToForm(requestBody: object) {
  const formData = new FormData();

  Object.entries(requestBody).forEach(([key, value]) => {
    value && formData.append(key, value);
  });

  return formData;
}

/**
 *
 * Gets everything required for posting to accounts all current posting-in-progress items.
 */
export const postAccountPostingV1GetCurrentPostingItems = (
  requestBody: GetCurrentPostingItemsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCurrentPostingItemsResponse>> => {
  return Http.postRequest(
    postAccountPostingV1GetCurrentPostingItems.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postAccountPostingV1GetCurrentPostingItems.key =
  "/webapi/AccountPosting/v1/GetCurrentPostingItems";

/**
 *
 * Log out of the current session
 */
export const postAuthenticationV1LogOutOfSession = (
  requestBody: LogOutOfSessionRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<LogOutOfSessionResponse>> => {
  return Http.postRequest(
    postAuthenticationV1LogOutOfSession.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postAuthenticationV1LogOutOfSession.key =
  "/webapi/Authentication/v1/LogOutOfSession";

/**
 *
 * Exchange valid user credentials for a session token
 */
export const postAuthenticationV1LoginWithCredentials = (
  requestBody: LoginWithCredentialsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<LoginWithCredentialsResponse>> => {
  return Http.postRequest(
    postAuthenticationV1LoginWithCredentials.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postAuthenticationV1LoginWithCredentials.key =
  "/webapi/Authentication/v1/LoginWithCredentials";

export const postCollectionTimeV1GetAllCollectionTimes = (
  requestBody: GetAllCollectionTimesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllCollectionTimesResponse>> => {
  return Http.postRequest(
    postCollectionTimeV1GetAllCollectionTimes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCollectionTimeV1GetAllCollectionTimes.key =
  "/webapi/CollectionTime/v1/GetAllCollectionTimes";

export const postCollectionTimeV1GetCollectionTime = (
  requestBody: GetCollectionTimeRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCollectionTimeResponse>> => {
  return Http.postRequest(
    postCollectionTimeV1GetCollectionTime.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCollectionTimeV1GetCollectionTime.key =
  "/webapi/CollectionTime/v1/GetCollectionTime";

export const postCollectionTimeV1GetCollectionTimes = (
  requestBody: GetCollectionTimesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCollectionTimesResponse>> => {
  return Http.postRequest(
    postCollectionTimeV1GetCollectionTimes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCollectionTimeV1GetCollectionTimes.key =
  "/webapi/CollectionTime/v1/GetCollectionTimes";

/**
 *
 * Calculate the next despatch date by the given Courier id.
 */
export const postCourierV1CalculateNextDespatchDateByCourier = (
  requestBody: CalculateNextDespatchDateByCourierRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<CalculateNextDespatchDateByCourierResponse>> => {
  return Http.postRequest(
    postCourierV1CalculateNextDespatchDateByCourier.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCourierV1CalculateNextDespatchDateByCourier.key =
  "/webapi/Courier/v1/CalculateNextDespatchDateByCourier";

/**
 *
 * Gets all Couriers
 */
export const postCourierV1GetAllCouriers = (
  requestBody: GetAllCouriersRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllCouriersResponse>> => {
  return Http.postRequest(
    postCourierV1GetAllCouriers.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCourierV1GetAllCouriers.key = "/webapi/Courier/v1/GetAllCouriers";

/**
 *
 * Gets a specific Courier by Id. (Errors if not found).
 */
export const postCourierV1GetCourier = (
  requestBody: GetCourierRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCourierResponse>> => {
  return Http.postRequest(
    postCourierV1GetCourier.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCourierV1GetCourier.key = "/webapi/Courier/v1/GetCourier";

/**
 *
 * Gets specific Couriers by Id. (Errors if any not found).
 */
export const postCourierV1GetCouriers = (
  requestBody: GetCouriersRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCouriersResponse>> => {
  return Http.postRequest(
    postCourierV1GetCouriers.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCourierV1GetCouriers.key = "/webapi/Courier/v1/GetCouriers";

/**
 *
 * Gets all CreditTerms
 */
export const postCreditTermV1GetAllCreditTerms = (
  requestBody: GetAllCreditTermsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllCreditTermsResponse>> => {
  return Http.postRequest(
    postCreditTermV1GetAllCreditTerms.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditTermV1GetAllCreditTerms.key =
  "/webapi/CreditTerm/v1/GetAllCreditTerms";

/**
 *
 * Gets a specific CreditTerm by Id. (Errors if not found).
 */
export const postCreditTermV1GetCreditTerm = (
  requestBody: GetCreditTermRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCreditTermResponse>> => {
  return Http.postRequest(
    postCreditTermV1GetCreditTerm.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditTermV1GetCreditTerm.key = "/webapi/CreditTerm/v1/GetCreditTerm";

/**
 *
 * Gets specific CreditTerms by Ids. (Errors if any not found).
 */
export const postCreditTermV1GetCreditTerms = (
  requestBody: GetCreditTermsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCreditTermsResponse>> => {
  return Http.postRequest(
    postCreditTermV1GetCreditTerms.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditTermV1GetCreditTerms.key = "/webapi/CreditTerm/v1/GetCreditTerms";

/**
 *
 * Records the result of posting to accounts for the given credit.
 */
export const postCreditV1RecordCreditPostingResult = (
  requestBody: RecordCreditPostingResultRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<RecordCreditPostingResultResponse>> => {
  return Http.postRequest(
    postCreditV1RecordCreditPostingResult.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV1RecordCreditPostingResult.key =
  "/webapi/Credit/v1/RecordCreditPostingResult";

/**
 *
 * Performs standard calculations and extractions for simple creation of a new Credit. Returns what the credit header would look like with standard (BrewMan UI behaviour) of credit creation. The credit is NOT saved to the database.  Note that because the credit is not saved the returned credit number is the next available number but is not allocated to this credit.
 */
export const postCreditV2BuildCreditHeader = (
  requestBody: BuildCreditHeaderRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<BuildCreditHeaderResponse>> => {
  return Http.postRequest(
    postCreditV2BuildCreditHeader.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV2BuildCreditHeader.key = "/webapi/Credit/v2/BuildCreditHeader";

/**
 *
 * Performs standard calculations and extractions for simple addition of items to a Credit. Returns what the credit would look like with standard (BrewMan UI behaviour) of adding the given items to a credit. The credit is NOT saved to the database with the evaluated lines.  It can be easily saved by sending to the SaveCredit Api method, or can be adjusted as desired before saving.
 */
export const postCreditV2BuildCreditLines = (
  requestBody: BuildCreditLinesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<BuildCreditLinesResponse>> => {
  return Http.postRequest(
    postCreditV2BuildCreditLines.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV2BuildCreditLines.key = "/webapi/Credit/v2/BuildCreditLines";

/**
 *
 * Creates a new credit in open status.
 */
export const postCreditV2CreateCredit = (
  requestBody: CreateCreditRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<CreateCreditResponse>> => {
  return Http.postRequest(
    postCreditV2CreateCredit.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV2CreateCredit.key = "/webapi/Credit/v2/CreateCredit";

/**
 *
 * Gets a single Credit.
 */
export const postCreditV2GetCredit = (
  requestBody: GetCreditRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCreditResponse>> => {
  return Http.postRequest(
    postCreditV2GetCredit.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV2GetCredit.key = "/webapi/Credit/v2/GetCredit";

/**
 *
 * Gets zero or more credits. Errors if any do not exist.
 */
export const postCreditV2GetCredits = (
  requestBody: GetCreditsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCreditsResponse>> => {
  return Http.postRequest(
    postCreditV2GetCredits.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV2GetCredits.key = "/webapi/Credit/v2/GetCredits";

/**
 *
 * Gets credits by a given filter.
 */
export const postCreditV2GetCreditsByFilter = (
  requestBody: GetCreditsByFilterRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCreditsByFilterResponse>> => {
  return Http.postRequest(
    postCreditV2GetCreditsByFilter.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV2GetCreditsByFilter.key = "/webapi/Credit/v2/GetCreditsByFilter";

/**
 *
 * Saves the given credit. It must already exist, and be in Open or Complete state.
 */
export const postCreditV2SaveCredit = (
  requestBody: SaveCreditRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<SaveCreditResponse>> => {
  return Http.postRequest(
    postCreditV2SaveCredit.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postCreditV2SaveCredit.key = "/webapi/Credit/v2/SaveCredit";

/**
 *
 * Create test data for use in integration tests.
 */
export const postDataV1CreateTenantGroupForIntegrationTests = (
  requestBody: CreateTenantGroupForIntegrationTestsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<CreateTenantGroupForIntegrationTestsResponse>> => {
  return Http.postRequest(
    postDataV1CreateTenantGroupForIntegrationTests.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postDataV1CreateTenantGroupForIntegrationTests.key =
  "/webapi/Data/v1/CreateTenantGroupForIntegrationTests";

/**
 *
 * Calculate the next despatch date by the given Delivery Area id.
 */
export const postDeliveryAreaV1CalculateNextDespatchDateByDeliveryArea = (
  requestBody: CalculateNextDespatchDateByDeliveryAreaRequest,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<CalculateNextDespatchDateByDeliveryAreaResponse>
> => {
  return Http.postRequest(
    postDeliveryAreaV1CalculateNextDespatchDateByDeliveryArea.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postDeliveryAreaV1CalculateNextDespatchDateByDeliveryArea.key =
  "/webapi/DeliveryArea/v1/CalculateNextDespatchDateByDeliveryArea";

/**
 *
 * Gets all DeliveryAreas
 */
export const postDeliveryAreaV1GetAllDeliveryAreas = (
  requestBody: GetAllDeliveryAreasRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllDeliveryAreasResponse>> => {
  return Http.postRequest(
    postDeliveryAreaV1GetAllDeliveryAreas.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postDeliveryAreaV1GetAllDeliveryAreas.key =
  "/webapi/DeliveryArea/v1/GetAllDeliveryAreas";

/**
 *
 * Gets a specific DeliveryArea by Id. (Errors if not found).
 */
export const postDeliveryAreaV1GetDeliveryArea = (
  requestBody: GetDeliveryAreaRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetDeliveryAreaResponse>> => {
  return Http.postRequest(
    postDeliveryAreaV1GetDeliveryArea.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postDeliveryAreaV1GetDeliveryArea.key =
  "/webapi/DeliveryArea/v1/GetDeliveryArea";

/**
 *
 * Gets specific DeliveryAreas by Id. (Errors if any not found).
 */
export const postDeliveryAreaV1GetDeliveryAreas = (
  requestBody: GetDeliveryAreasRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetDeliveryAreasResponse>> => {
  return Http.postRequest(
    postDeliveryAreaV1GetDeliveryAreas.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postDeliveryAreaV1GetDeliveryAreas.key =
  "/webapi/DeliveryArea/v1/GetDeliveryAreas";

/**
 *
 * Gets all GlCodeOverrides
 */
export const postGlCodeV1GetAllGlCodeOverrides = (
  requestBody: GetAllGlCodeOverridesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllGlCodeOverridesResponse>> => {
  return Http.postRequest(
    postGlCodeV1GetAllGlCodeOverrides.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postGlCodeV1GetAllGlCodeOverrides.key =
  "/webapi/GlCode/v1/GetAllGlCodeOverrides";

/**
 *
 * Gets all GlCodes
 */
export const postGlCodeV1GetAllGlCodes = (
  requestBody: GetAllGlCodesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllGlCodesResponse>> => {
  return Http.postRequest(
    postGlCodeV1GetAllGlCodes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postGlCodeV1GetAllGlCodes.key = "/webapi/GlCode/v1/GetAllGlCodes";

/**
 *
 * Gets a specific GlCode by Id. (Errors if not found).
 */
export const postGlCodeV1GetGlCode = (
  requestBody: GetGlCodeRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetGlCodeResponse>> => {
  return Http.postRequest(
    postGlCodeV1GetGlCode.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postGlCodeV1GetGlCode.key = "/webapi/GlCode/v1/GetGlCode";

/**
 *
 * Gets specific GlCodes by Ids. (Errors if any not found).
 */
export const postGlCodeV1GetGlCodes = (
  requestBody: GetGlCodesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetGlCodesResponse>> => {
  return Http.postRequest(
    postGlCodeV1GetGlCodes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postGlCodeV1GetGlCodes.key = "/webapi/GlCode/v1/GetGlCodes";

/**
 *
 * Gets all Groups
 */
export const postGroupV1GetAllGroups = (
  requestBody: GetAllGroupsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllGroupsResponse>> => {
  return Http.postRequest(
    postGroupV1GetAllGroups.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postGroupV1GetAllGroups.key = "/webapi/Group/v1/GetAllGroups";

/**
 *
 * Gets a specific Group by Id. (Errors if not found).
 */
export const postGroupV1GetGroup = (
  requestBody: GetGroupRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetGroupResponse>> => {
  return Http.postRequest(
    postGroupV1GetGroup.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postGroupV1GetGroup.key = "/webapi/Group/v1/GetGroup";

/**
 *
 * Gets the specified groups. (Errors if not found).
 */
export const postGroupV1GetGroups = (
  requestBody: GetGroupsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetGroupsResponse>> => {
  return Http.postRequest(
    postGroupV1GetGroups.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postGroupV1GetGroups.key = "/webapi/Group/v1/GetGroups";

/**
 *
 * Gets ItemAtLocation objects for given parameters. Only actual values are returned, so Item-Location combinations with no settings (all null) are not returned.
 */
export const postItemAtLocationV1GetItemAtLocations = (
  requestBody: GetItemAtLocationsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetItemAtLocationsResponse>> => {
  return Http.postRequest(
    postItemAtLocationV1GetItemAtLocations.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postItemAtLocationV1GetItemAtLocations.key =
  "/webapi/ItemAtLocation/v1/GetItemAtLocations";

/**
 *
 * DEPRECATED - Use GetItem.
 */
export const postItemV1GetEntireItem = (
  requestBody: GetEntireItemRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetEntireItemResponse>> => {
  return Http.postRequest(
    postItemV1GetEntireItem.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postItemV1GetEntireItem.key = "/webapi/Item/v1/GetEntireItem";

/**
 *
 * DEPRECATED - Use GetItems.
 */
export const postItemV1GetEntireItems = (
  requestBody: GetEntireItemsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetEntireItemsResponse>> => {
  return Http.postRequest(
    postItemV1GetEntireItems.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postItemV1GetEntireItems.key = "/webapi/Item/v1/GetEntireItems";

/**
 *
 * DEPRECATED - Use GetItemsByFilter.
 */
export const postItemV1GetEntireItemsByFilter = (
  requestBody: GetEntireItemsByFilterRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetEntireItemsByFilterResponse>> => {
  return Http.postRequest(
    postItemV1GetEntireItemsByFilter.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postItemV1GetEntireItemsByFilter.key = "/webapi/Item/v1/GetEntireItemsByFilter";

/**
 *
 * Gets Items matching the given filter.
 */
export const postItemV1GetItemsByFilter = (
  requestBody: GetItemsByFilterRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetItemsByFilterResponse>> => {
  return Http.postRequest(
    postItemV1GetItemsByFilter.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postItemV1GetItemsByFilter.key = "/webapi/Item/v1/GetItemsByFilter";

/**
 *
 * Records the result of posting to accounts for the given order.
 */
export const postOrderV1RecordOrderPostingResult = (
  requestBody: RecordOrderPostingResultRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<RecordOrderPostingResultResponse>> => {
  return Http.postRequest(
    postOrderV1RecordOrderPostingResult.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV1RecordOrderPostingResult.key =
  "/webapi/Order/v1/RecordOrderPostingResult";

/**
 *
 * Records the result of posting to accounts for the given retail order summary.
 */
export const postOrderV1RecordRetailOrderSummaryPostingResult = (
  requestBody: RecordRetailOrderSummaryPostingResultRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<RecordRetailOrderSummaryPostingResultResponse>> => {
  return Http.postRequest(
    postOrderV1RecordRetailOrderSummaryPostingResult.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV1RecordRetailOrderSummaryPostingResult.key =
  "/webapi/Order/v1/RecordRetailOrderSummaryPostingResult";

/**
 *
 * Performs standard calculations and extractions for simple addition of items to an Order. Returns what the order would look like with standard (BrewMan UI behaviour) of adding the given items to an order. The order is NOT saved to the database with the evaluated lines.  It can be easily saved by sending to the SaveOrder Api method, or can be adjusted as desired before saving.
 */
export const postOrderV2BuildOrderLines = (
  requestBody: BuildOrderLinesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<BuildOrderLinesResponse>> => {
  return Http.postRequest(
    postOrderV2BuildOrderLines.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV2BuildOrderLines.key = "/webapi/Order/v2/BuildOrderLines";

/**
 *
 * Creates a new order in Open status.
 */
export const postOrderV2CreateOrder = (
  requestBody: CreateOrderRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<CreateOrderResponse>> => {
  return Http.postRequest(
    postOrderV2CreateOrder.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV2CreateOrder.key = "/webapi/Order/v2/CreateOrder";

/**
 *
 * Gets a single Order.
 */
export const postOrderV2GetOrder = (
  requestBody: GetOrderRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOrderResponse>> => {
  return Http.postRequest(
    postOrderV2GetOrder.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV2GetOrder.key = "/webapi/Order/v2/GetOrder";

/**
 *
 * Gets zero or more orders. Errors if any do not exist.
 */
export const postOrderV2GetOrders = (
  requestBody: GetOrdersRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOrdersResponse>> => {
  return Http.postRequest(
    postOrderV2GetOrders.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV2GetOrders.key = "/webapi/Order/v2/GetOrders";

/**
 *
 * Gets full orders (header plus lines) by a given filter.
 */
export const postOrderV2GetOrdersByFilter = (
  requestBody: GetOrdersByFilterRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOrdersByFilterResponse>> => {
  return Http.postRequest(
    postOrderV2GetOrdersByFilter.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV2GetOrdersByFilter.key = "/webapi/Order/v2/GetOrdersByFilter";

/**
 *
 * Saves the given order. Must be Open or Complete.
 */
export const postOrderV2SaveOrder = (
  requestBody: SaveOrderRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<SaveOrderResponse>> => {
  return Http.postRequest(
    postOrderV2SaveOrder.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOrderV2SaveOrder.key = "/webapi/Order/v2/SaveOrder";

/**
 *
 * Gets all outlet ratings.
 */
export const postOutletRatingV1GetAllOutletRatings = (
  requestBody: GetAllOutletRatingsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllOutletRatingsResponse>> => {
  return Http.postRequest(
    postOutletRatingV1GetAllOutletRatings.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletRatingV1GetAllOutletRatings.key =
  "/webapi/OutletRating/v1/GetAllOutletRatings";

/**
 *
 * Gets a specific outlet rating. (Errors if not found).
 */
export const postOutletRatingV1GetOutletRating = (
  requestBody: GetOutletRatingRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOutletRatingResponse>> => {
  return Http.postRequest(
    postOutletRatingV1GetOutletRating.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletRatingV1GetOutletRating.key =
  "/webapi/OutletRating/v1/GetOutletRating";

/**
 *
 * Gets specific outlet ratings. (Errors if any not found).
 */
export const postOutletRatingV1GetOutletRatings = (
  requestBody: GetOutletRatingsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOutletRatingsResponse>> => {
  return Http.postRequest(
    postOutletRatingV1GetOutletRatings.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletRatingV1GetOutletRatings.key =
  "/webapi/OutletRating/v1/GetOutletRatings";

/**
 *
 * Gets all outlet types.
 */
export const postOutletTypeV1GetAllOutletTypes = (
  requestBody: GetAllOutletTypesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllOutletTypesResponse>> => {
  return Http.postRequest(
    postOutletTypeV1GetAllOutletTypes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletTypeV1GetAllOutletTypes.key =
  "/webapi/OutletType/v1/GetAllOutletTypes";

/**
 *
 * Gets a specific outlet type. (Errors if not found).
 */
export const postOutletTypeV1GetOutletType = (
  requestBody: GetOutletTypeRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOutletTypeResponse>> => {
  return Http.postRequest(
    postOutletTypeV1GetOutletType.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletTypeV1GetOutletType.key = "/webapi/OutletType/v1/GetOutletType";

/**
 *
 * Gets specific outlet types. (Errors if any not found).
 */
export const postOutletTypeV1GetOutletTypes = (
  requestBody: GetOutletTypesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOutletTypesResponse>> => {
  return Http.postRequest(
    postOutletTypeV1GetOutletTypes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletTypeV1GetOutletTypes.key = "/webapi/OutletType/v1/GetOutletTypes";

/**
 *
 * Gets all Outlets
 */
export const postOutletV1GetAllOutlets = (
  requestBody: GetAllOutletsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllOutletsResponse>> => {
  return Http.postRequest(
    postOutletV1GetAllOutlets.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletV1GetAllOutlets.key = "/webapi/Outlet/v1/GetAllOutlets";

/**
 *
 * Gets a specific Outlet by Id. (Errors if not found).
 */
export const postOutletV1GetOutlet = (
  requestBody: GetOutletRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOutletResponse>> => {
  return Http.postRequest(
    postOutletV1GetOutlet.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletV1GetOutlet.key = "/webapi/Outlet/v1/GetOutlet";

/**
 *
 * Gets specific Outlets by Ids. (Errors if any not found).
 */
export const postOutletV1GetOutlets = (
  requestBody: GetOutletsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetOutletsResponse>> => {
  return Http.postRequest(
    postOutletV1GetOutlets.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletV1GetOutlets.key = "/webapi/Outlet/v1/GetOutlets";

/**
 *
 * Update credit balances of the given outlets.
 */
export const postOutletV1UpdateCreditBalances = (
  requestBody: UpdateCreditBalancesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<UpdateCreditBalancesResponse>> => {
  return Http.postRequest(
    postOutletV1UpdateCreditBalances.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postOutletV1UpdateCreditBalances.key = "/webapi/Outlet/v1/UpdateCreditBalances";

/**
 *
 * Gets all PackageTypes
 */
export const postPackageTypeV1GetAllPackageTypes = (
  requestBody: GetAllPackageTypesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllPackageTypesResponse>> => {
  return Http.postRequest(
    postPackageTypeV1GetAllPackageTypes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPackageTypeV1GetAllPackageTypes.key =
  "/webapi/PackageType/v1/GetAllPackageTypes";

/**
 *
 * Gets a specific PackageType by Id. (Errors if not found).
 */
export const postPackageTypeV1GetPackageType = (
  requestBody: GetPackageTypeRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetPackageTypeResponse>> => {
  return Http.postRequest(
    postPackageTypeV1GetPackageType.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPackageTypeV1GetPackageType.key = "/webapi/PackageType/v1/GetPackageType";

/**
 *
 * Gets specific PackageTypes by Ids. (Errors if any not found).
 */
export const postPackageTypeV1GetPackageTypes = (
  requestBody: GetPackageTypesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetPackageTypesResponse>> => {
  return Http.postRequest(
    postPackageTypeV1GetPackageTypes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPackageTypeV1GetPackageTypes.key = "/webapi/PackageType/v1/GetPackageTypes";

/**
 *
 * Gets all PriceLists
 */
export const postPriceListV1GetAllPriceLists = (
  requestBody: GetAllPriceListsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllPriceListsResponse>> => {
  return Http.postRequest(
    postPriceListV1GetAllPriceLists.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPriceListV1GetAllPriceLists.key = "/webapi/PriceList/v1/GetAllPriceLists";

/**
 *
 * Gets the price of all products for the given PriceList
 */
export const postPriceListV1GetLinesForPriceList = (
  requestBody: GetLinesForPriceListRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetLinesForPriceListResponse>> => {
  return Http.postRequest(
    postPriceListV1GetLinesForPriceList.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPriceListV1GetLinesForPriceList.key =
  "/webapi/PriceList/v1/GetLinesForPriceList";

/**
 *
 * Gets a specific PriceList by Id (Errors if not found).
 */
export const postPriceListV1GetPriceList = (
  requestBody: GetPriceListRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetPriceListResponse>> => {
  return Http.postRequest(
    postPriceListV1GetPriceList.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPriceListV1GetPriceList.key = "/webapi/PriceList/v1/GetPriceList";

/**
 *
 * Gets specific PriceLists by Ids (Errors if any not found).
 */
export const postPriceListV1GetPriceLists = (
  requestBody: GetPriceListsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetPriceListsResponse>> => {
  return Http.postRequest(
    postPriceListV1GetPriceLists.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPriceListV1GetPriceLists.key = "/webapi/PriceList/v1/GetPriceLists";

/**
 *
 * Gets all pricing categories
 */
export const postPricingCategoryV1GetAllPricingCategories = (
  requestBody: GetAllPricingCategoriesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllPricingCategoriesResponse>> => {
  return Http.postRequest(
    postPricingCategoryV1GetAllPricingCategories.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPricingCategoryV1GetAllPricingCategories.key =
  "/webapi/PricingCategory/v1/GetAllPricingCategories";

/**
 *
 * Gets specific pricing categories. (Errors if any not found).
 */
export const postPricingCategoryV1GetPricingCategories = (
  requestBody: GetPricingCategoriesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetPricingCategoriesResponse>> => {
  return Http.postRequest(
    postPricingCategoryV1GetPricingCategories.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPricingCategoryV1GetPricingCategories.key =
  "/webapi/PricingCategory/v1/GetPricingCategories";

/**
 *
 * Gets a specific pricing category. (Errors if not found).
 */
export const postPricingCategoryV1GetPricingCategory = (
  requestBody: GetPricingCategoryRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetPricingCategoryResponse>> => {
  return Http.postRequest(
    postPricingCategoryV1GetPricingCategory.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPricingCategoryV1GetPricingCategory.key =
  "/webapi/PricingCategory/v1/GetPricingCategory";

/**
 *
 * Gets all ProductBrands
 */
export const postProductBrandV1GetAllProductBrands = (
  requestBody: GetAllProductBrandsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllProductBrandsResponse>> => {
  return Http.postRequest(
    postProductBrandV1GetAllProductBrands.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postProductBrandV1GetAllProductBrands.key =
  "/webapi/ProductBrand/v1/GetAllProductBrands";

/**
 *
 * Gets a specific ProductBrand. (Errors if not found).
 */
export const postProductBrandV1GetProductBrand = (
  requestBody: GetProductBrandRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetProductBrandResponse>> => {
  return Http.postRequest(
    postProductBrandV1GetProductBrand.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postProductBrandV1GetProductBrand.key =
  "/webapi/ProductBrand/v1/GetProductBrand";

/**
 *
 * Gets specific ProductBrands. (Errors if any not found).
 */
export const postProductBrandV1GetProductBrands = (
  requestBody: GetProductBrandsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetProductBrandsResponse>> => {
  return Http.postRequest(
    postProductBrandV1GetProductBrands.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postProductBrandV1GetProductBrands.key =
  "/webapi/ProductBrand/v1/GetProductBrands";

/**
 *
 * Records the result of posting to accounts for the given purchase order.
 */
export const postPurchaseOrderV1RecordPurchaseOrderPostingResult = (
  requestBody: RecordPurchaseOrderPostingResultRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<RecordPurchaseOrderPostingResultResponse>> => {
  return Http.postRequest(
    postPurchaseOrderV1RecordPurchaseOrderPostingResult.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPurchaseOrderV1RecordPurchaseOrderPostingResult.key =
  "/webapi/PurchaseOrder/v1/RecordPurchaseOrderPostingResult";

/**
 *
 * Gets all SalesAreas
 */
export const postSalesAreaV1GetAllSalesAreas = (
  requestBody: GetAllSalesAreasRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllSalesAreasResponse>> => {
  return Http.postRequest(
    postSalesAreaV1GetAllSalesAreas.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSalesAreaV1GetAllSalesAreas.key = "/webapi/SalesArea/v1/GetAllSalesAreas";

/**
 *
 * Gets a specific SalesArea. (Errors if not found).
 */
export const postSalesAreaV1GetSalesArea = (
  requestBody: GetSalesAreaRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetSalesAreaResponse>> => {
  return Http.postRequest(
    postSalesAreaV1GetSalesArea.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSalesAreaV1GetSalesArea.key = "/webapi/SalesArea/v1/GetSalesArea";

/**
 *
 * Gets specific SalesAreas. (Errors if any not found).
 */
export const postSalesAreaV1GetSalesAreas = (
  requestBody: GetSalesAreasRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetSalesAreasResponse>> => {
  return Http.postRequest(
    postSalesAreaV1GetSalesAreas.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSalesAreaV1GetSalesAreas.key = "/webapi/SalesArea/v1/GetSalesAreas";

/**
 *
 * Gets all SalesCodes
 */
export const postSalesCodeV1GetAllSalesCodes = (
  requestBody: GetAllSalesCodesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllSalesCodesResponse>> => {
  return Http.postRequest(
    postSalesCodeV1GetAllSalesCodes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSalesCodeV1GetAllSalesCodes.key = "/webapi/SalesCode/v1/GetAllSalesCodes";

/**
 *
 * Gets a specific SalesCode. (Errors if not found).
 */
export const postSalesCodeV1GetSalesCode = (
  requestBody: GetSalesCodeRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetSalesCodeResponse>> => {
  return Http.postRequest(
    postSalesCodeV1GetSalesCode.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSalesCodeV1GetSalesCode.key = "/webapi/SalesCode/v1/GetSalesCode";

/**
 *
 * Gets specific SalesCodes. (Errors if any not found).
 */
export const postSalesCodeV1GetSalesCodes = (
  requestBody: GetSalesCodesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetSalesCodesResponse>> => {
  return Http.postRequest(
    postSalesCodeV1GetSalesCodes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSalesCodeV1GetSalesCodes.key = "/webapi/SalesCode/v1/GetSalesCodes";

/**
 *
 * Gets all stock groups
 */
export const postStockGroupV1GetAllStockGroups = (
  requestBody: GetAllStockGroupsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllStockGroupsResponse>> => {
  return Http.postRequest(
    postStockGroupV1GetAllStockGroups.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postStockGroupV1GetAllStockGroups.key =
  "/webapi/StockGroup/v1/GetAllStockGroups";

/**
 *
 * Gets a specific stock group. (Errors if not found).
 */
export const postStockGroupV1GetStockGroup = (
  requestBody: GetStockGroupRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetStockGroupResponse>> => {
  return Http.postRequest(
    postStockGroupV1GetStockGroup.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postStockGroupV1GetStockGroup.key = "/webapi/StockGroup/v1/GetStockGroup";

/**
 *
 * Get specific stock groups. (Errors if any not found).
 */
export const postStockGroupV1GetStockGroups = (
  requestBody: GetStockGroupsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetStockGroupsResponse>> => {
  return Http.postRequest(
    postStockGroupV1GetStockGroups.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postStockGroupV1GetStockGroups.key = "/webapi/StockGroup/v1/GetStockGroups";

/**
 *
 * Gets all StockLocations
 */
export const postStockLocationV1GetAllStockLocations = (
  requestBody: GetAllStockLocationsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllStockLocationsResponse>> => {
  return Http.postRequest(
    postStockLocationV1GetAllStockLocations.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postStockLocationV1GetAllStockLocations.key =
  "/webapi/StockLocation/v1/GetAllStockLocations";

/**
 *
 * Gets a specific stock location. (Errors if not found).
 */
export const postStockLocationV1GetStockLocation = (
  requestBody: GetStockLocationRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetStockLocationResponse>> => {
  return Http.postRequest(
    postStockLocationV1GetStockLocation.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postStockLocationV1GetStockLocation.key =
  "/webapi/StockLocation/v1/GetStockLocation";

/**
 *
 * Gets specific stock locations. (Errors if any not found).
 */
export const postStockLocationV1GetStockLocations = (
  requestBody: GetStockLocationsRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetStockLocationsResponse>> => {
  return Http.postRequest(
    postStockLocationV1GetStockLocations.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postStockLocationV1GetStockLocations.key =
  "/webapi/StockLocation/v1/GetStockLocations";

/**
 *
 * Gets the current Stock Level (sum of all batches for each stock item)
 */
export const postStockV1GetStockItemsQuantityCurrentlyInStock = (
  requestBody: GetStockItemsQuantityCurrentlyInStockRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetStockItemsQuantityCurrentlyInStockResponse>> => {
  return Http.postRequest(
    postStockV1GetStockItemsQuantityCurrentlyInStock.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postStockV1GetStockItemsQuantityCurrentlyInStock.key =
  "/webapi/Stock/v1/GetStockItemsQuantityCurrentlyInStock";

/**
 *
 * Gets all SupplierManufacturers
 */
export const postSupplierManufacturerV1GetAllSupplierManufacturers = (
  requestBody: GetAllSupplierManufacturersRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllSupplierManufacturersResponse>> => {
  return Http.postRequest(
    postSupplierManufacturerV1GetAllSupplierManufacturers.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSupplierManufacturerV1GetAllSupplierManufacturers.key =
  "/webapi/SupplierManufacturer/v1/GetAllSupplierManufacturers";

/**
 *
 * Gets a specific SupplierManufacturer by Id. (Errors if not found).
 */
export const postSupplierManufacturerV1GetSupplierManufacturer = (
  requestBody: GetSupplierManufacturerRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetSupplierManufacturerResponse>> => {
  return Http.postRequest(
    postSupplierManufacturerV1GetSupplierManufacturer.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSupplierManufacturerV1GetSupplierManufacturer.key =
  "/webapi/SupplierManufacturer/v1/GetSupplierManufacturer";

/**
 *
 * Gets specific SupplierManufacturers by Ids. (Errors if any not found).
 */
export const postSupplierManufacturerV1GetSupplierManufacturers = (
  requestBody: GetSupplierManufacturersRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetSupplierManufacturersResponse>> => {
  return Http.postRequest(
    postSupplierManufacturerV1GetSupplierManufacturers.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postSupplierManufacturerV1GetSupplierManufacturers.key =
  "/webapi/SupplierManufacturer/v1/GetSupplierManufacturers";

/**
 *
 * Gets all UnitsOfMeasure
 */
export const postUnitOfMeasureV1GetAllUnitsOfMeasure = (
  requestBody: GetAllUnitsOfMeasureRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllUnitsOfMeasureResponse>> => {
  return Http.postRequest(
    postUnitOfMeasureV1GetAllUnitsOfMeasure.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postUnitOfMeasureV1GetAllUnitsOfMeasure.key =
  "/webapi/UnitOfMeasure/v1/GetAllUnitsOfMeasure";

/**
 *
 * Gets a single unit of measure. (Errors if not found).
 */
export const postUnitOfMeasureV1GetUnitOfMeasure = (
  requestBody: GetUnitOfMeasureRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetUnitOfMeasureResponse>> => {
  return Http.postRequest(
    postUnitOfMeasureV1GetUnitOfMeasure.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postUnitOfMeasureV1GetUnitOfMeasure.key =
  "/webapi/UnitOfMeasure/v1/GetUnitOfMeasure";

/**
 *
 * Gets specific units of measure. (Errors if any not found).
 */
export const postUnitOfMeasureV1GetUnitsOfMeasure = (
  requestBody: GetUnitsOfMeasureRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetUnitsOfMeasureResponse>> => {
  return Http.postRequest(
    postUnitOfMeasureV1GetUnitsOfMeasure.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postUnitOfMeasureV1GetUnitsOfMeasure.key =
  "/webapi/UnitOfMeasure/v1/GetUnitsOfMeasure";

/**
 *
 * Gets the currently authenticated user and tenant group id
 */
export const postUserV1GetCurrentUserContext = (
  requestBody: GetCurrentUserContextRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetCurrentUserContextResponse>> => {
  return Http.postRequest(
    postUserV1GetCurrentUserContext.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postUserV1GetCurrentUserContext.key = "/webapi/User/v1/GetCurrentUserContext";

/**
 *
 * Exchange a Google Identity Platform User Id Token for a session token
 */
export const postUserV1LoginWithGipIdToken = (
  requestBody: LoginWithGipIdTokenRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<LoginWithGipIdTokenResponse>> => {
  return Http.postRequest(
    postUserV1LoginWithGipIdToken.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postUserV1LoginWithGipIdToken.key = "/webapi/User/v1/LoginWithGipIdToken";

/**
 *
 * Gets all vat codes
 */
export const postVatCodeV1GetAllVatCodes = (
  requestBody: GetAllVatCodesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetAllVatCodesResponse>> => {
  return Http.postRequest(
    postVatCodeV1GetAllVatCodes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postVatCodeV1GetAllVatCodes.key = "/webapi/VatCode/v1/GetAllVatCodes";

/**
 *
 * Gets a specific vat code. (Errors if not found).
 */
export const postVatCodeV1GetVatCode = (
  requestBody: GetVatCodeRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetVatCodeResponse>> => {
  return Http.postRequest(
    postVatCodeV1GetVatCode.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postVatCodeV1GetVatCode.key = "/webapi/VatCode/v1/GetVatCode";

/**
 *
 * Gets specific vat codes. (Errors if any not found).
 */
export const postVatCodeV1GetVatCodes = (
  requestBody: GetVatCodesRequest,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<GetVatCodesResponse>> => {
  return Http.postRequest(
    postVatCodeV1GetVatCodes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postVatCodeV1GetVatCodes.key = "/webapi/VatCode/v1/GetVatCodes";
export const _CONSTANT0 = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
