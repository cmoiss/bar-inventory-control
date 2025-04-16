export interface VolumeVariation {
    id: number;
    volume: number;
    price: number;
    internalQuantity: number;
}

export interface UnitPerPackVariation {
    id: number;
    unitPerPack: number;
    externalQuantity
}

export interface Product {
    id: number;
    name: string;
    category: string;
    volumeVariations: VolumeVariation[];
    unitPerPackVariations: UnitPerPackVariation[];
}