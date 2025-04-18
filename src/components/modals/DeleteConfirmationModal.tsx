import React, { useState } from 'react';
import GenericModal from './generic-modal';
import DefaultButton from '../DefaultButton';

interface DeleteConfirmationModalProps {
  productName: string;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ productName, onConfirm }: DeleteConfirmationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <DefaultButton onClick={handleOpen}>
        <i className="bi bi-trash"></i>
      </DefaultButton>

      <GenericModal 
        isOpen={isOpen} 
        onClose={handleClose} 
        title="Confirmar Exclusão"
      >
        <div className="flex flex-col gap-4 mt-3.5">
          <p className='text-center'>Tem certeza que deseja excluir este produto?</p>
          <p className="font-bold text-center text-blue-bell text-2xl">{productName}</p>
          
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={handleClose} className='bg-shadow-gray px-5 py-2.5 rounded-md hover:bg-light-dark-gray'>
                Cancelar
            </button>
            <button onClick={handleConfirm} className='bg-light-red px-5 py-2.5 rounded-md hover:bg-red'>
                Excluir
            </button>
          </div>
        </div>
      </GenericModal>
    </>
  );
}