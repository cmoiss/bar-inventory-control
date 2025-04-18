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
  reloadProducts?: () => void;
}

export default function TableRow({ product, variation, onDoubleClick, reloadProducts }: TableRowProps) {
  const productVolume = formatVolume(variation.volume);
  const productPrice = formatPrice(variation.price);

  // Verifica se o clique não foi em um botão ou em um elemento dentro dos botões
  const handleDoubleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const isActionButton = (e.target as HTMLElement).closest('button');

    if (!isActionButton && onDoubleClick) {
      onDoubleClick();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      if (reloadProducts) {
        await reloadProducts();
      }
    } catch (error) {
      console.error(`Erro ao deletar produto ${product.name}`, error);
    }
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