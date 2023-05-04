/**
 * You can modify this file
 *
 * @version 5
 */
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
//@ts-ignore
import qs from "qs";
import * as https from "https";
import { globalBrewmanAuth } from "./auth";

const baseConfig: (apiToken: string) => AxiosRequestConfig = (apiToken) => ({
  baseURL: "https://localhost:7000",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    "Content-Encoding": "UTF-8",
    Accept: "application/json",
    "Content-Type": "application/json-patch+json",
    "Api-Token": apiToken,
  },
  paramsSerializer: (param) => qs.stringify(param, { indices: false }),
});

let axiosInstance: AxiosInstance;

function getAxiosInstance(security: Security): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = Axios.create(baseConfig(globalBrewmanAuth.apiToken));

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (async (response: AxiosResponse): Promise<SwaggerResponse<any>> => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        /**
         * Example on response manipulation
         *
         * @example
         *   const swaggerResponse: SwaggerResponse = {
         *     ...response,
         *   };
         *   return swaggerResponse;
         */
        return response;
      }) as any,
      (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (error.response) {
          return Promise.reject(
            new RequestError(
              // @ts-ignore
              error.response.data,
              error.response.status,
              error.response
            )
          );
        }

        if (error.isAxiosError) {
          return Promise.reject(new RequestError("noInternetConnection"));
        }
        return Promise.reject(error);
      }
    );
  }

  // ًًRequest interceptor
  axiosInstance.interceptors.request.use(
    async (requestConfig) => {
      // Do something before request is sent
      /** Example on how to add authorization based on security */
      if (security?.[0]) {
        // requestConfig.headers.authorization = "";
      }

      return requestConfig;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

class RequestError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public response?: AxiosResponse
  ) {
    super(message);
  }

  isApiException = true;

  static isRequestError(error: any): error is RequestError {
    return error.isApiException;
  }
}

export type Security = any[] | undefined;

export interface SwaggerResponse<R> extends AxiosResponse<R> {}

export { getAxiosInstance, RequestError };
