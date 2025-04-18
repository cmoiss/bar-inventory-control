import React, { useState } from 'react';
import CreateProductForm from './CreateProductForm';
import { Product } from '../../../models/product';
import GenericModal from '../generic-modal';
import { createProduct } from '../../../services/productService';

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductCreated: (newProduct: Product) => void;
}

export default function CreateProductModal({ isOpen, onClose, onProductCreated }: CreateProductModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        volume: '',
        unitsPerPack: '',
        internalQuantity: '',
        externalQuantity: '',
        price: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const newProduct: Omit<Product, 'id'> = {
                name: formData.name,
                category: formData.category,
                volumeVariations: [
                    {
                        volume: parseFloat(formData.volume),
                        price: parseFloat(formData.price),
                        internalQuantity: parseInt(formData.internalQuantity),
                        unitsPerPackVariations: [
                            {
                                unitsPerPack: parseInt(formData.unitsPerPack),
                                externalQuantity: parseInt(formData.externalQuantity),
                                id: 0
                            }
                        ],
                        id: 0
                    }
                ]
            };

            const createdProduct = await createProduct(newProduct);
            onProductCreated(createdProduct);
            onClose();
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GenericModal isOpen={isOpen} onClose={onClose} title="Cadastrar Novo Produto">
            <CreateProductForm
                formData={formData}
                isLoading={isLoading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                onClose={onClose}
            />
        </GenericModal>
    );
}