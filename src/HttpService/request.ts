import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { pipe } from 'fp-ts/lib/pipeable';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import axios from './axios';

export declare type RequestParams = Omit<AxiosRequestConfig, 'baseURL'>;
export declare type Response<T> = AxiosResponse<T>;

function request<T>(
  requestParams: RequestParams,
): TaskEither<Error, Response<T>> {
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
): TaskEither<Error, Response<T>> => {
  return tryCatch(
    () => axios.request<T>(requestConfig),
    err => processError(err),
  );
};

function processError(err: unknown): Error {
  if (!(err instanceof Error)) throw err;
  return err;
}

export default request;
