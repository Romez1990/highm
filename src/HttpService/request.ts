import { IncomingMessage } from 'http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { pipe } from 'fp-ts/lib/pipeable';
import { isNone } from 'fp-ts/lib/Option';
import { mapLeft } from 'fp-ts/lib/Either';
import { TaskEither, tryCatch, map } from 'fp-ts/lib/TaskEither';
import { Type } from 'io-ts';
import { check } from '../TypeCheck';
import CookieService from '../CookieService';
import axios from './axios';
import { NetworkError, RequestError } from './Errors';

export declare type RequestParams = Omit<AxiosRequestConfig, 'baseURL'>;
export declare type Response<T> = AxiosResponse<T>;

function request<T>(
  requestParams: RequestParams,
  type: Type<T>,
): TaskEither<NetworkError, Response<T>>;
function request<T>(
  requestParams: RequestParams,
  type: Type<T>,
  req: IncomingMessage | undefined,
): TaskEither<NetworkError, Response<T>>;
function request<T>(
  requestParams: RequestParams,
  type: Type<T>,
  token: string,
): TaskEither<NetworkError, Response<T>>;
function request<T>(
  requestParams: RequestParams,
  type: Type<T>,
  auth: false,
): TaskEither<NetworkError, Response<T>>;

function request<T>(
  requestParams: RequestParams,
  type: Type<T>,
  auth?: IncomingMessage | string | false,
): TaskEither<NetworkError, Response<T>> {
  return pipe(
    requestParams,
    addBaseUrl,
    addAuthorization(auth),
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

const addAuthorization = (
  auth: IncomingMessage | string | false | undefined,
) => (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
  if (typeof auth === 'boolean') return requestConfig;
  let token: string;
  if (typeof auth === 'string') {
    token = auth;
  } else {
    const tokenOption =
      typeof auth === 'undefined'
        ? CookieService.get('token')
        : CookieService.get('token', auth);
    if (isNone(tokenOption)) return requestConfig;
    token = tokenOption.value;
  }

  return {
    ...requestConfig,
    headers: {
      ...requestConfig.headers,
      Authorization: `Token ${token}`,
    },
  };
};

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
