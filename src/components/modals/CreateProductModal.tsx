import React, { useState } from 'react';
import GenericModal from './generic-modal';
import { createProduct } from '../../services/productService';
import { Product } from '../../models/product';

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-bell">Nome do Produto</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Coca-Cola, Pepsi, etc."
                            className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-blue-bell">Categoria</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                            required
                        >
                            <option value="">Selecione a categoria</option>
                            <option value="Refrigerante">Refrigerante</option>
                            <option value="Cerveja">Cerveja</option>
                            <option value="Suco">Suco</option>
                            <option value="Água">Água</option>
                            <option value="Energético">Energético</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-bell">Volume (ml)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                                className="bg-shadow-gray h-12 px-4 py-3 rounded-lg flex-1"
                                required
                            />
                            <span className="text-blue-bell">ml</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-blue-bell">Unidades por Pack</label>
                        <select
                            name="unitsPerPack"
                            value={formData.unitsPerPack}
                            onChange={handleChange}
                            className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                            required
                        >
                            <option value="">Selecione a quantidade</option>
                            <option value="6">6 unidades</option>
                            <option value="12">12 unidades</option>
                            <option value="24">24 unidades</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-bell">Estoque Interno</label>
                        <input
                            type="number"
                            name="internalQuantity"
                            value={formData.internalQuantity}
                            onChange={handleChange}
                            placeholder="Quantidade em unidades"
                            className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-blue-bell">Estoque Externo</label>
                        <input
                            type="number"
                            name="externalQuantity"
                            value={formData.externalQuantity}
                            onChange={handleChange}
                            placeholder="Quantidade em packs"
                            className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-blue-bell">Preço (R$)</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Ex: 8,99"
                        className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                        required
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-governor-bay">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 rounded-md border border-gray-600 hover:bg-dark-gray transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 rounded-md bg-governor-bay text-white hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </GenericModal>
    );
}