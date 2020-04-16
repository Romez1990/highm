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

function get<T>(url: string, type: Type<T>): TaskEither<NetworkError, T> {
  return requestHelper({ method: 'get', url }, type);
}

function post<T>(
  url: string,
  type: Type<T>,
  data?: object,
): TaskEither<NetworkError, T> {
  return requestHelper<T>({ method: 'post', url, data }, type);
}

function put<T>(
  url: string,
  type: Type<T>,
  data: object,
): TaskEither<NetworkError, T> {
  return requestHelper<T>({ method: 'put', url, data }, type);
}

function patch<T>(
  url: string,
  type: Type<T>,
  data: object,
): TaskEither<NetworkError, T> {
  return requestHelper<T>({ method: 'patch', url, data }, type);
}

function deleteFunc(url: string): TaskEither<NetworkError, void> {
  return requestHelper(
    { method: 'delete', url },
    (literal('') as unknown) as Type<undefined>,
  );
}

function requestHelper<T>(
  requestParams: RequestParams,
  type: Type<T>,
): TaskEither<NetworkError, T> {
  return pipe(request<T>(requestParams, type), map(getData));
}

function getData<T>(response: Response<T>): T {
  return response.data;
}

export default HttpService;
