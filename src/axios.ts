import { IncomingMessage } from 'http';
import axiosStatic, { AxiosRequestConfig } from 'axios';
import applyConverters from 'axios-case-converter';
import { getToken } from './auth';

const baseConfig: AxiosRequestConfig = {
  baseURL: `${process.env.SERVER_URL}/api`,
};

const axios = applyConverters(axiosStatic.create(baseConfig) as any);

function createAxios(req?: IncomingMessage) {
  let config = baseConfig;
  const token = getToken(req);
  if (token) {
    const configWithAuth = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    config = { ...baseConfig, ...configWithAuth };
  }
  return applyConverters(axiosStatic.create(config) as any);
}

export default axios;

export {
  createAxios,
};
