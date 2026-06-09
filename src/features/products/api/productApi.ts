import { api } from "../../../shared/api/axiosInstance";
import { ENDPOINTS } from "../../../shared/api/endpoint";
import type { Category, Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>(ENDPOINTS.PRODUCTS);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`${ENDPOINTS.PRODUCTS}/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>(ENDPOINTS.CATEGORIES);
  return response.data;
};