import React from "react";
import Td from "./Td";
import TableActionButtons from "./TableActionButtons";
import { Product, VolumeVariation } from "../models/product";
import { formatVolume, formatPrice } from "../utils/formatters";
import { deleteProduct } from "../services/productService";

interface TableRowProps {
  product: Omit<Product, "volumeVariations">;
  variation: VolumeVariation;
  onDoubleClick?: () => void;
}

export default function TableRow({ product, variation, onDoubleClick }: TableRowProps) {
  const productVolume = formatVolume(variation.volume);
  const productPrice = formatPrice(variation.price);

  // Verifica se o clique não foi em um botão ou em um elemento dentro dos botões
  const handleDoubleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const isActionButton = (e.target as HTMLElement).closest('button');

    if (!isActionButton && onDoubleClick) {
      onDoubleClick();
    }
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    console.log(`Produto ${product.name} deletado`);
  };

  return (
    <tr onDoubleClick={handleDoubleClick}>
      <Td>{product.name}</Td>
      <Td>{productVolume}</Td>
      <Td>{productPrice}</Td>
      <Td>{variation.internalQuantity}</Td>
      <Td>{product.category}</Td>
      <Td>
        <TableActionButtons
          productName={product.name}
          onDelete={handleDelete}
        />
      </Td>
    </tr>
  );
}