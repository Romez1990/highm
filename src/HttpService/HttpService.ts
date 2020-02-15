import { pipe } from 'fp-ts/lib/pipeable';
import { TaskEither, map } from 'fp-ts/lib/TaskEither';
import request, { RequestParams, Response } from './request';

const HttpService = {
  get,
  post,
  put,
  patch,
  delete: deleteFunc,
};

function get<T>(url: string): TaskEither<Error, T> {
  return requestHelper<T>({ method: 'get', url });
}

function post<T>(url: string, data?: object): TaskEither<Error, T> {
  return requestHelper<T>({ method: 'post', url, data });
}

function put<T>(url: string, data: object): TaskEither<Error, T> {
  return requestHelper<T>({ method: 'put', url, data });
}

function patch<T>(url: string, data: object): TaskEither<Error, T> {
  return requestHelper<T>({ method: 'patch', url, data });
}

function deleteFunc<T>(url: string): TaskEither<Error, T> {
  return requestHelper<T>({ method: 'delete', url });
}

function requestHelper<T>(requestParams: RequestParams): TaskEither<Error, T> {
  return pipe(request<T>(requestParams), map(getData));
}

function getData<T>(response: Response<T>): T {
  return response.data;
}

export default HttpService;
