import React from 'react';

interface InfoLabelProps {
    label: string;
    value: string | number;
}

export function InfoLabel({ label, value }: InfoLabelProps) {
    return (
        <div className="flex flex-col">
            <span className="text-sm text-blue-bell">{label}</span>
            <span className="text-md">{value}</span>
        </div>
    );
}