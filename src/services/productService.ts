// services/productService.ts
import { Product } from "../models/product";

// services/productService.ts
export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch('http://localhost:8080/products');
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        return data as Product[];
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}