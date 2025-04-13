import React from "react";
import Td from "./Td";
import TableActionButtons from "./TableActionButtons";
import { Product, VolumeVariation } from "../models/product";

interface TableRowProps {
  product: Omit<Product, "volumeVariations">;
  variation: VolumeVariation;
}

export default function TableRow({ product, variation }: TableRowProps) {
  const formatVolume = (ml: number) => {
    return ml >= 1000 ? `${ml / 1000}L` : `${ml}mL`;
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" });
  }

  return (
    <tr>
      <Td>{product.name}</Td>
      <Td>{formatVolume(variation.volume)}</Td>
      <Td>{formatPrice(variation.price)}</Td>
      <Td>{variation.internalQuantity}</Td>
      <Td>{product.category}</Td>
      <Td><TableActionButtons /></Td>
    </tr>
  );
};