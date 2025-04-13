export function formatVolume(ml: number): string {
    return ml >= 1000 ? `${ml / 1000}L` : `${ml}mL`;
}

export function formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    });
}