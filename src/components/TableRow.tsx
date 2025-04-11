import React from "react";

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

export default function TableRow ({ data, actions }) {
    return (
      <tr>
        {data.map((item, index) => (
          <td key={index}>{item}</td>
        ))}
        {actions && <td>{actions}</td>}
      </tr>
    );
  };