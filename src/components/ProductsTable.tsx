import React from "react";
import TableRow from "./TableRow";
import Th from "./Th";
import { Product } from "../models/product";

interface ProductsTableProps {
    products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg">
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
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}