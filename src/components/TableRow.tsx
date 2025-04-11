import React from "react";
import Td from "./Td";
import TableActionButtons from "./TableActionButtons";

interface VolumeVariation {
  id: number;
  volume: number;
  price: number;
  internalQuantity: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  volumeVariations: VolumeVariation[];
}

export default function TableRow({ data }) {
  // if (data.volume >= 1000) {

  // }

  return (
    <tr>
      {data.map((item, index) => (
        <Td key={index}>{item}</Td>
      ))}
        <td><TableActionButtons /></td>
    </tr>
  );
};