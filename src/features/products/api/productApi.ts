import { api } from "../../../shared/api/axiosInstance";
import { ENDPOINTS } from "../../../shared/api/endpoint";

export const getProducts = async () => {
  const response = await api.get(ENDPOINTS.PRODUCTS);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`${ENDPOINTS.PRODUCTS}/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get(ENDPOINTS.CATEGORIES);
  return response.data;
};