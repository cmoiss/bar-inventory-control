import React, { useEffect, useState } from "react";
import ProductsTable from "../components/ProductsTable";
import DefaultButton from "../components/DefaultButton";
import { Product } from "../models/product";
import { fetchProducts } from "../services/productService";

const sampleProducts: Product[] = [
    {
        id: 40,
        name: "Coca-cola",
        category: "Refrigerante",
        volumeVariations: [
            {
                id: 40,
                volume: 500,
                price: 6.99,
                internalQuantity: 16,
                unitsPerPackVariations: [
                    { id: 40, unitsPerPack: 12, externalQuantity: 8 },
                    { id: 41, unitsPerPack: 24, externalQuantity: 4 }
                ]
            },
            {
                id: 20,
                volume: 2000,
                price: 8.99,
                internalQuantity: 24,
                unitsPerPackVariations: [
                    { id: 42, unitsPerPack: 6, externalQuantity: 10 },
                    { id: 43, unitsPerPack: 12, externalQuantity: 5 }
                ]
            }
        ]
    },
    // Mais produtos mockados
];

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [useMockData, setUseMockData] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                // Em produção, você pode remover esta condição e sempre usar a API
                if (process.env.NODE_ENV === 'development' && useMockData) {
                    setProducts(sampleProducts);
                } else {
                    const apiProducts = await fetchProducts();
                    setProducts(apiProducts);
                }
            } catch (error) {
                console.error("Falha ao carregar produtos:", error);
                // Fallback para dados mockados em caso de erro
                setProducts(sampleProducts);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, [useMockData]);

    // Alternar entre dados mockados e da API (apenas para desenvolvimento)
    const toggleDataMode = () => {
        setUseMockData(!useMockData);
    };

    if (isLoading) {
        return <div>Carregando produtos...</div>;
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-7">
                <input type="text" placeholder="Pesquisar produtos..." className="bg-shadow-gray h-12 px-4 py-3 rounded-lg" />
                <div className="flex flex-col w-full gap-8">
                    <ProductsTable products={products} />
                    <div className="self-end">
                        <DefaultButton size="xl">
                            <span className="flex gap-2">
                                <i className="bi bi-plus"></i>
                                Cadastrar Novo Produto
                            </span>
                        </DefaultButton>
                    </div>
                </div>

                {/* Botão apenas para desenvolvimento - pode ser removido em produção */}
                {process.env.NODE_ENV === 'development' && (
                    <button
                        onClick={toggleDataMode}
                        className="fixed bottom-4 right-4 bg-governor-bay text-white px-4 py-2 rounded-md"
                    >
                        {useMockData ? "Usar API" : "Usar Mock"}
                    </button>
                )}
            </div>
        </div>
    );
}