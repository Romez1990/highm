import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { pipe } from 'fp-ts/lib/pipeable';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import axios from './axios';
import { NetworkError, RequestError } from './Errors';

export declare type RequestParams = Omit<AxiosRequestConfig, 'baseURL'>;
export declare type Response<T> = AxiosResponse<T>;

function request<T>(
  requestParams: RequestParams,
): TaskEither<NetworkError, Response<T>> {
  return pipe(requestParams, addBaseUrl, sendRequest<T>());
}

function addBaseUrl(requestParams: RequestParams): AxiosRequestConfig {
  return {
    ...requestParams,
    baseURL: `${process.env.SERVER_URL}/api`,
  };
}

const sendRequest = <T>() => (
  requestConfig: AxiosRequestConfig,
): TaskEither<NetworkError, Response<T>> => {
  return tryCatch(
    () => axios.request<T>(requestConfig),
    err => processError(err),
  );
};

function processError(err: unknown): NetworkError {
  if (!(err instanceof Error)) throw err;
  const requestError = err as RequestError;
  if (!requestError.isAxiosError) throw err;
  return NetworkError.identify(requestError);
}

export default request;
