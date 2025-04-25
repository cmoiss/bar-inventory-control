// components/CreateProductForm.tsx
import React from 'react';
import ModalLabel from '../modal-components/ModalLabel';

interface CreateProductFormProps {
    formData: {
        name: string;
        category: string;
        volume: string;
        unitsPerPack: string;
        internalQuantity: string;
        externalQuantity: string;
        price: string;
    };
    isLoading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

export default function CreateProductForm({
    formData,
    isLoading,
    handleChange,
    handleSubmit,
    onClose
}: CreateProductFormProps) {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <ModalLabel>Nome do Produto</ModalLabel>
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
                    <ModalLabel>Categoria</ModalLabel>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                        required
                    >
                        <option disabled value="">Selecione a categoria</option>
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
                    <ModalLabel>Volume (ml)</ModalLabel>
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
                    <ModalLabel>Unidades por Pack</ModalLabel>
                    <select
                        name="unitsPerPack"
                        value={formData.unitsPerPack}
                        onChange={handleChange}
                        className="bg-shadow-gray h-12 px-4 py-3 rounded-lg"
                        required
                    >
                        <option disabled value="">Selecione a quantidade</option>
                        <option value="6">6 unidades</option>
                        <option value="12">12 unidades</option>
                        <option value="24">24 unidades</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <ModalLabel>Estoque Interno</ModalLabel>
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
                    <ModalLabel>Estoque Externo</ModalLabel>
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
                <ModalLabel>Preço (R$)</ModalLabel>
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
    );
}