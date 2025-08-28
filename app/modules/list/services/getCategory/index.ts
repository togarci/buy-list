import axios from 'axios';
import type { RequestCategoryType } from '../../types/request-categorys';

export const getCategory = async () => {
  const { data } = await axios.get<RequestCategoryType[]>('/api/category');

  return data;
};
