import React from "react";
import Td from "./Td";
import TableActionButtons from "./TableActionButtons";
import { Product, VolumeVariation } from "../models/product";
import { formatVolume, formatPrice } from "../utils/formatters";

interface TableRowProps {
  product: Omit<Product, "volumeVariations">;
  variation: VolumeVariation;
}

export default function TableRow({ product, variation }: TableRowProps) {
  const productVolume = formatVolume(variation.volume);
  const productPrice = formatPrice(variation.price);

  return (
    <tr>
      <Td>{product.name}</Td>
      <Td>{productVolume}</Td>
      <Td>{productPrice}</Td>
      <Td>{variation.internalQuantity}</Td>
      <Td>{product.category}</Td>
      <Td><TableActionButtons /></Td>
    </tr>
  );
}