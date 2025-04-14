import React, { useEffect } from 'react';

export default function GenericModal({ isOpen, onClose, children, title }) {
    // Adiciona um listener para fechar o modal ao pressionar "Esc"
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-50 flex justify-center items-center'>
            <div className='bg-piano-black px-8 py-10 rounded-md shadow-lg 
                flex 
                flex-col 
                gap-4
            '>
                <span className='flex justify-between border-b border-governor-bay gap-8'>
                    <h2 className='text-2xl'>{title}</h2>
                    <button className='cursor-pointer text-2xl' onClick={onClose}>&times;</button>
                </span>
                <div>
                    <p>Modal muito massa</p>
                    {children}
                </div>
            </div>
        </div>
    );
}