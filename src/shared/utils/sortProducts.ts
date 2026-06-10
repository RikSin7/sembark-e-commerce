import type { Product } from "../../features/products/types";

export default function sortProducts(products: Product[], sort: string) {
    switch (sort) {
        case "price-asc":
            return [...products].sort((a, b) => a.price - b.price);
        case "price-desc":
            return [...products].sort((a, b) => b.price - a.price);
        case "title-asc":
            return [...products].sort((a, b) => a.title.localeCompare(b.title));
        case "title-desc":
            return [...products].sort((a, b) => b.title.localeCompare(a.title));
        default:
            return [...products];
    }
}
