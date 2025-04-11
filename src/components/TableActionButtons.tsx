import React from "react";
import DefaultButton from "./DefaultButton";

export default function TableActionButtons() {
    return (
        <span className="flex gap-2">
            <DefaultButton>
                <i className="bi bi-pencil"></i>
            </DefaultButton>
            <DefaultButton>
                <i className="bi bi-trash"></i>
            </DefaultButton>
        </span>
    );
}