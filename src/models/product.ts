export interface UnitsPerPackVariation {
    id: number;
    unitsPerPack: number;
    externalQuantity: number;
}

export interface VolumeVariation {
    id: number;
    volume: number;
    price: number;
    internalQuantity: number;
    unitsPerPackVariations: UnitsPerPackVariation[];
}

export interface Product {
    id: number;
    name: string;
    category: string;
    volumeVariations: VolumeVariation[];
}