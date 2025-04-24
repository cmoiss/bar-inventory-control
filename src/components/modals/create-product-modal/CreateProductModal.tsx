import React, { useState } from 'react';
import GenericModal from '../generic-modal';
import { Product, VolumeVariation, UnitsPerPackVariation } from '../../../models/product';
import { createProduct } from '../../../services/productService';

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (product: Product) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  onProductCreated
}) => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [volumeVariations, setVolumeVariations] = useState<VolumeVariation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const volumeOptions = [
    { value: 50, label: '50ml' },
    { value: 100, label: '100ml' },
    { value: 200, label: '200ml' },
    { value: 300, label: '300ml' },
    { value: 500, label: '500ml' },
    { value: 600, label: '600ml' },
    { value: 750, label: '750ml' },
    { value: 1000, label: '1 Litro (1000ml)' },
    { value: 1500, label: '1.5 Litros (1500ml)' },
    { value: 2000, label: '2 Litros (2000ml)' },
  ];

  const packOptions = [
    { value: 6, label: '6 unidades' },
    { value: 12, label: '12 unidades' },
    { value: 24, label: '24 unidades' },
    { value: 36, label: '36 unidades' },
    { value: 48, label: '48 unidades' },
  ];

  const categoryOptions = [
    'Vodka', 'Whisky', 'Cerveja', 'Vinho', 'Espumante',
    'Gin', 'Rum', 'Tequila', 'Energético', 'Refrigerante',
    'Água', 'Suco', 'Drink', 'Outros'
  ];

  const addVolumeVariation = () => {
    setVolumeVariations([...volumeVariations, {
      id: 0, // Temporário - será gerado pelo backend
      volume: 0,
      price: 0,
      internalQuantity: 0,
      unitsPerPackVariations: []
    }]);
  };

  const removeVolumeVariation = (index: number) => {
    const newVariations = [...volumeVariations];
    newVariations.splice(index, 1);
    setVolumeVariations(newVariations);
  };

  const addPackVariation = (volumeIndex: number) => {
    const newVariations = [...volumeVariations];
    newVariations[volumeIndex].unitsPerPackVariations.push({
      id: 0, // Temporário - será gerado pelo backend
      unitsPerPack: 0,
      externalQuantity: 0
    });
    setVolumeVariations(newVariations);
  };

  const removePackVariation = (volumeIndex: number, packIndex: number) => {
    const newVariations = [...volumeVariations];
    newVariations[volumeIndex].unitsPerPackVariations.splice(packIndex, 1);
    setVolumeVariations(newVariations);
  };

  const handleVolumeChange = (index: number, field: string, value: string) => {
    const newVariations = [...volumeVariations];
    newVariations[index] = {
      ...newVariations[index],
      [field]: field === 'volume' || field === 'price' ?
        parseFloat(value) || 0 :
        parseInt(value) || 0
    };
    setVolumeVariations(newVariations);
  };

  const handlePackChange = (
    volumeIndex: number,
    packIndex: number,
    field: string,
    value: string
  ) => {
    const newVariations = [...volumeVariations];
    newVariations[volumeIndex].unitsPerPackVariations[packIndex] = {
      ...newVariations[volumeIndex].unitsPerPackVariations[packIndex],
      [field]: parseInt(value) || 0
    };
    setVolumeVariations(newVariations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!productName || !productCategory || volumeVariations.length === 0) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    // Validação adicional para garantir que todas as variações estão preenchidas
    for (const variation of volumeVariations) {
      if (variation.volume <= 0 || variation.price <= 0) {
        setError('Preencha todos os campos de volume e preço corretamente');
        return;
      }

      for (const pack of variation.unitsPerPackVariations) {
        if (pack.unitsPerPack <= 0) {
          setError('Preencha todas as unidades por pack corretamente');
          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      const newProductData: Omit<Product, 'id'> = {
        name: productName,
        category: productCategory,
        volumeVariations: volumeVariations.map(variation => ({
          ...variation,
          unitsPerPackVariations: variation.unitsPerPackVariations.map(pack => ({
            ...pack
          }))
        }))
      };

      const createdProduct = await createProduct(newProductData);
      onProductCreated(createdProduct);
      onClose();
      resetForm();
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      setError('Erro ao cadastrar produto. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductCategory('');
    setVolumeVariations([]);
    setError(null);
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Novo Produto"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-h-[80vh]">
        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red bg-opacity-20 text-red border border-red rounded-lg p-3">
            {error}
          </div>
        )}

        {/* Container principal com scroll */}
        <div className="overflow-y-auto pr-2 -mr-2 flex-grow">
          {/* Informações Básicas */}
          <div className="bg-dark-gray rounded-xl p-6 mb-4">
            <h3 className="text-blue-bell text-lg font-medium mb-4 flex items-center gap-2">
              <i className="bi bi-info-circle"></i>
              Informações Básicas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Nome do Produto*</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2 bg-chromaphobic-black border border-shadow-gray rounded-lg focus:outline-none focus:border-blue-bell focus:ring-1 focus:ring-blue-bell"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Categoria*</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-chromaphobic-black border border-shadow-gray rounded-lg focus:outline-none focus:border-blue-bell focus:ring-1 focus:ring-blue-bell"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Variações de Volume */}
          <div className="bg-dark-gray rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-blue-bell text-lg font-medium flex items-center gap-2">
                <i className="bi bi-box-seam"></i>
                Variações de Volume
              </h3>
              <button
                type="button"
                onClick={addVolumeVariation}
                className="flex items-center gap-2 px-3 py-1.5 bg-governor-bay text-white rounded-lg hover:bg-midnight-blue transition-colors text-sm"
                disabled={isSubmitting}
              >
                <i className="bi bi-plus"></i>
                Adicionar Variação
              </button>
            </div>

            {volumeVariations.length === 0 ? (
              <div className="text-center py-4 text-light-dark-gray italic">
                Nenhuma variação de volume adicionada ainda
              </div>
            ) : (
              <div className="space-y-4">
                {volumeVariations.map((variation, volIndex) => (
                  <div key={volIndex} className="bg-midnight-blue bg-opacity-10 rounded-lg p-4 border-l-4 border-midnight-blue">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block font-medium mb-2">Volume*</label>
                        <select
                          value={variation.volume}
                          onChange={(e) => handleVolumeChange(volIndex, 'volume', e.target.value)}
                          className="w-full px-4 py-2 bg-chromaphobic-black border border-shadow-gray rounded-lg focus:outline-none focus:border-blue-bell focus:ring-1 focus:ring-blue-bell"
                          required
                          disabled={isSubmitting}
                        >
                          <option value="">Selecione</option>
                          {volumeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium mb-2">Preço (R$)*</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={variation.price || ''}
                          onChange={(e) => handleVolumeChange(volIndex, 'price', e.target.value)}
                          className="w-full px-4 py-2 bg-chromaphobic-black border border-shadow-gray rounded-lg focus:outline-none focus:border-blue-bell focus:ring-1 focus:ring-blue-bell"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-2">Estoque Interno*</label>
                        <input
                          type="number"
                          min="0"
                          value={variation.internalQuantity || ''}
                          onChange={(e) => handleVolumeChange(volIndex, 'internalQuantity', e.target.value)}
                          className="w-full px-4 py-2 bg-chromaphobic-black border border-shadow-gray rounded-lg focus:outline-none focus:border-blue-bell focus:ring-1 focus:ring-blue-bell"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Variações de Pack */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-medium">Variações de Pack</h4>
                        <button
                          type="button"
                          onClick={() => addPackVariation(volIndex)}
                          className="flex items-center gap-1 px-2 py-1 bg-governor-bay text-white rounded-lg hover:bg-midnight-blue transition-colors text-xs"
                          disabled={isSubmitting}
                        >
                          <i className="bi bi-plus"></i>
                          Adicionar Pack
                        </button>
                      </div>

                      {variation.unitsPerPackVariations.length === 0 ? (
                        <div className="text-center py-2 text-light-dark-gray italic text-sm">
                          Nenhuma variação de pack adicionada ainda
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {variation.unitsPerPackVariations.map((pack, packIndex) => (
                            <div key={packIndex} className="bg-governor-bay bg-opacity-10 rounded-md p-3 border-l-2 border-governor-bay">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block font-medium mb-2 text-sm">Unidades por Pack*</label>
                                  <select
                                    value={pack.unitsPerPack}
                                    onChange={(e) => handlePackChange(volIndex, packIndex, 'unitsPerPack', e.target.value)}
                                    className="w-full px-3 py-1 bg-chromaphobic-black border border-shadow-gray rounded-lg focus:outline-none focus:border-blue-bell focus:ring-1 focus:ring-blue-bell text-sm"
                                    required
                                    disabled={isSubmitting}
                                  >
                                    <option value="">Selecione</option>
                                    {packOptions.map(option => (
                                      <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block font-medium mb-2 text-sm">Estoque Externo (Packs)*</label>
                                  <input
                                    type="number"
                                    min="0"
                                    value={pack.externalQuantity || ''}
                                    onChange={(e) => handlePackChange(volIndex, packIndex, 'externalQuantity', e.target.value)}
                                    className="w-full px-3 py-1 bg-chromaphobic-black border border-shadow-gray rounded-lg focus:outline-none focus:border-blue-bell focus:ring-1 focus:ring-blue-bell text-sm"
                                    required
                                    disabled={isSubmitting}
                                  />
                                </div>
                              </div>

                              <div className="flex justify-end mt-2">
                                <button
                                  type="button"
                                  onClick={() => removePackVariation(volIndex, packIndex)}
                                  className="flex items-center gap-1 px-2 py-1 bg-red text-white rounded-lg hover:bg-light-red transition-colors text-xs"
                                  disabled={isSubmitting}
                                >
                                  <i className="bi bi-trash"></i>
                                  Remover Pack
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={() => removeVolumeVariation(volIndex)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red text-white rounded-lg hover:bg-light-red transition-colors text-sm"
                        disabled={isSubmitting}
                      >
                        <i className="bi bi-trash"></i>
                        Remover Variação
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ações (fixas na parte inferior) */}
        <div className="flex justify-end gap-4 pt-4 border-t border-shadow-gray">
          <button
            type="button"
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="px-6 py-2 border border-blue-bell text-blue-bell rounded-lg hover:bg-blue-bell hover:bg-opacity-10 transition-colors"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-bell text-white rounded-lg hover:bg-governor-bay transition-colors flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="bi bi-arrow-repeat animate-spin"></i>
                Salvando...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg"></i>
                Salvar Produto
              </>
            )}
          </button>
        </div>
      </form>
    </GenericModal>
  );
};

export default CreateProductModal;