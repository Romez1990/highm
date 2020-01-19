import axiosStatic, { AxiosRequestConfig } from 'axios';
import applyConverters from 'axios-case-converter';

const baseConfig: AxiosRequestConfig = {
  baseURL: `${process.env.SERVER_URL}/api`,
};

const axios = applyConverters(axiosStatic.create(baseConfig) as any);

export default axios;
