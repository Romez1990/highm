import { IncomingMessage } from 'http';
import { pipe } from 'fp-ts/lib/pipeable';
import { TaskEither, map } from 'fp-ts/lib/TaskEither';
import { Type, literal } from 'io-ts';
import request, { RequestParams, Response } from './request';
import { NetworkError } from './Errors';

const HttpService = {
  get,
  post,
  put,
  patch,
  delete: deleteFunc,
};

function get<T>(url: string, type: Type<T>): TaskEither<NetworkError, T>;
function get<T>(
  url: string,
  type: Type<T>,
  req: IncomingMessage | undefined,
): TaskEither<NetworkError, T>;
function get<T>(
  url: string,
  type: Type<T>,
  token: string,
): TaskEither<NetworkError, T>;
function get<T>(
  url: string,
  type: Type<T>,
  auth: false,
): TaskEither<NetworkError, T>;

function get<T>(
  url: string,
  type: Type<T>,
  auth?: IncomingMessage | string | false,
): TaskEither<NetworkError, T | void> {
  return requestHelper<T>({ method: 'get', url }, type, auth);
}

function post<T>(
  url: string,
  type: Type<T>,
  data?: Record<string, unknown>,
  req?: IncomingMessage,
): TaskEither<NetworkError, T>;
function post<T>(
  url: string,
  type: Type<T>,
  data?: Record<string, unknown>,
  token?: string,
): TaskEither<NetworkError, T>;
function post<T>(
  url: string,
  type: Type<T>,
  data?: Record<string, unknown>,
  auth?: false,
): TaskEither<NetworkError, T>;

function post<T>(
  url: string,
  type: Type<T>,
  data?: Record<string, unknown>,
  auth?: IncomingMessage | string | false,
): TaskEither<NetworkError, T | void> {
  return requestHelper<T>({ method: 'post', url, data }, type, auth);
}

function put<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
): TaskEither<NetworkError, T>;
function put<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  req: IncomingMessage | undefined,
): TaskEither<NetworkError, T>;
function put<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  token?: string,
): TaskEither<NetworkError, T>;
function put<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  auth?: false,
): TaskEither<NetworkError, T>;

function put<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  auth?: IncomingMessage | string | false,
): TaskEither<NetworkError, T | void> {
  return requestHelper<T>({ method: 'put', url, data }, type, auth);
}

function patch<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
): TaskEither<NetworkError, T>;
function patch<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  req: IncomingMessage | undefined,
): TaskEither<NetworkError, T>;
function patch<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  token: string,
): TaskEither<NetworkError, T>;
function patch<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  auth: false,
): TaskEither<NetworkError, T>;

function patch<T>(
  url: string,
  type: Type<T>,
  data: Record<string, unknown>,
  auth?: IncomingMessage | string | false,
): TaskEither<NetworkError, T | void> {
  return requestHelper<T>({ method: 'patch', url, data }, type, auth);
}

function deleteFunc(url: string): TaskEither<NetworkError, void>;
function deleteFunc(
  url: string,
  req: IncomingMessage | undefined,
): TaskEither<NetworkError, void>;
function deleteFunc(url: string, token: string): TaskEither<NetworkError, void>;
function deleteFunc(url: string, auth: false): TaskEither<NetworkError, void>;

function deleteFunc(
  url: string,
  auth?: IncomingMessage | string | false,
): TaskEither<NetworkError, void> {
  return requestHelper<undefined>(
    { method: 'delete', url },
    (literal('') as unknown) as Type<undefined>,
    auth,
  );
}

function requestHelper<T>(
  requestParams: RequestParams,
  type: Type<T>,
  auth: IncomingMessage | string | false | undefined,
): TaskEither<NetworkError, T | void> {
  let response: TaskEither<NetworkError, Response<T>>;
  if (auth instanceof IncomingMessage) {
    response = request<T>(requestParams, type, auth);
  } else if (typeof auth === 'string') {
    response = request<T>(requestParams, type, auth);
  } else if (typeof auth === 'boolean') {
    response = request<T>(requestParams, type, auth);
  } else {
    response = request<T>(requestParams, type);
  }
  return pipe(response, map(getData));
}

function getData<T>(response: Response<T>): T {
  return response.data;
}

export default HttpService;
