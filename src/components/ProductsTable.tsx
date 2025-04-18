import React, { useState } from "react";
import TableRow from "./TableRow";
import Th from "./Th";
import { Product, VolumeVariation } from "../models/product";
import GenericModal from "./modals/generic-modal";
import ProductInfoModal from "./modals/product-info-modal";

interface ProductsTableProps {
    products: Product[];
    reloadProducts: () => void;
}

export default function ProductsTable({ products, reloadProducts }: ProductsTableProps) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedVariation, setSelectedVariation] = useState<VolumeVariation | null>(null);

    const handleRowDoubleClick = (product: Product, variation: VolumeVariation) => {
        setSelectedProduct(product);
        setSelectedVariation(variation);
        setOpenModal(true);
    };

    return (
        <div className="rounded-lg shadow-lg
        overflow-y-auto
        max-h-[26rem]
        ">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-space-cadet border-b-2 border-b-governor-bay">
                        <Th>Nome</Th>
                        <Th>Volume</Th>
                        <Th>Preço</Th>
                        <Th>Estoque interno</Th>
                        <Th>Categoria</Th>
                        <Th>Ações</Th>
                    </tr>
                </thead>
                <tbody className="[&>tr]:bg-piano-black [&>tr]:even:bg-dark-gray [&>tr]:hover:bg-governor-bay hover:bg-opacity-20 transition-colors duration-200">
                    {products.flatMap(product =>
                        product.volumeVariations.map(variation => (
                            <TableRow
                                key={`${product.id}-${variation.id}`}
                                product={product}
                                variation={variation}
                                onDoubleClick={() => handleRowDoubleClick(product, variation)}
                                reloadProducts={reloadProducts}
                            />
                        ))
                    )}
                </tbody>
            </table>

            {selectedProduct && selectedVariation && (
                <ProductInfoModal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    product={selectedProduct}
                    selectedVariation={selectedVariation}
                />
            )}
        </div>
    );
}