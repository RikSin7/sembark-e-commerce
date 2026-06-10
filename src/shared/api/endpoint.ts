export const ENDPOINTS = {
    PRODUCTS: "/products",
    CATEGORIES: "/categories",
    PRODUCT_BY_CATEGORY: (categoryId: number) => `/products/?categoryId=${categoryId}`,
};