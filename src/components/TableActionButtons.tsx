import React from "react";
import DefaultButton from "./DefaultButton";
import { DeleteConfirmationModal } from "./modals/DeleteConfirmationModal";

interface TableActionButtonsProps {
    productName: string;
    onDelete: () => void;
}

export default function TableActionButtons({ productName, onDelete }: TableActionButtonsProps) {
    return (
        <span className="flex gap-2">
            <DefaultButton>
                <i className="bi bi-pencil"></i>
            </DefaultButton>
            <DeleteConfirmationModal
                productName={productName}
                onConfirm={onDelete}
            />
        </span>
    );
}