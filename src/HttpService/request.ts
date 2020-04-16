import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { pipe } from 'fp-ts/lib/pipeable';
import { mapLeft } from 'fp-ts/lib/Either';
import { TaskEither, tryCatch, map } from 'fp-ts/lib/TaskEither';
import { Type } from 'io-ts';
import { check } from '../TypeCheck';
import axios from './axios';
import { NetworkError, RequestError } from './Errors';

export declare type RequestParams = Omit<AxiosRequestConfig, 'baseURL'>;
export declare type Response<T> = AxiosResponse<T>;

function request<T>(
  requestParams: RequestParams,
  type: Type<T>,
): TaskEither<NetworkError, Response<T>> {
  return pipe(
    requestParams,
    addBaseUrl,
    sendRequest<T>(),
    map(checkType(type)),
  );
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

const checkType = <T>(type: Type<T>) => (
  response: Response<T>,
): Response<T> => {
  pipe(
    check(type, response.data),
    mapLeft(err => {
      throw err;
    }),
  );
  return response;
};

export default request;
