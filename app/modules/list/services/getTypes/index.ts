import axios from 'axios';
import type { RequestProductType } from '../../types/request-product-types';

export const getType = async () => {
  const { data } = await axios.get<RequestProductType[]>('/api/product-types');

  return data;
};
