// services/productService.ts
import { Product } from "../models/product";

const BASE_URL: string = 'http://localhost:8080/products';

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

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
        const response = await fetch('http://localhost:8080/products/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar produto');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        throw error;
    }
}

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao deletar produto');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};