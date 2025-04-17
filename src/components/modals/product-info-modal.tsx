import React, { useState } from 'react';
import GenericModal from './generic-modal';
import { InfoLabel } from '../InfoLabel';
import { Product, VolumeVariation, UnitPerPackVariation } from '../../models/product';
import { formatVolume, formatPrice } from '../../utils/formatters';

interface ProductInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    selectedVariation: VolumeVariation;
}

export default function ProductInfoModal({ isOpen, onClose, product, selectedVariation }: ProductInfoModalProps) {
    const [selectedPack, setSelectedPack] = useState<UnitPerPackVariation | null>(
        product.unitPerPackVariations.length > 0 ? product.unitPerPackVariations[0] : null
    );

    const handlePackSelection = (pack: UnitPerPackVariation) => {
        setSelectedPack(pack);
    };

    return (
        <GenericModal isOpen={isOpen} onClose={onClose} title="Informações do Produto">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoLabel
                    label="Nome"
                    value={product.name}
                />

                <InfoLabel
                    label="Categoria"
                    value={product.category}
                />

                <InfoLabel
                    label="Volume"
                    value={formatVolume(selectedVariation.volume)}
                />

                <InfoLabel
                    label="Preço"
                    value={formatPrice(selectedVariation.price)}
                />

                <InfoLabel
                    label="Estoque Interno"
                    value={selectedVariation.internalQuantity}
                />

                <InfoLabel
                    label="Estoque Externo"
                    value={selectedPack ? selectedPack.externalQuantity : 'N/A'}
                />
            </div>

            <div className="border-t border-governor-bay pt-4">
                <h3 className="text-lg mb-3 text-blue-bell">Quantidade por pack</h3>
                <div className="flex gap-2">
                    {product.unitPerPackVariations.map((pack) => (
                        <button
                            key={pack.id}
                            onClick={() => handlePackSelection(pack)}
                            className={`px-4 py-2 rounded-md border ${selectedPack?.id === pack.id
                                    ? 'bg-governor-bay border-governor-bay text-white'
                                    : 'border-gray-600 hover:bg-dark-gray'
                                }`}
                        >
                            {pack.unitPerPack} unidades
                        </button>
                    ))}
                </div>
            </div>
        </GenericModal>
    );
}