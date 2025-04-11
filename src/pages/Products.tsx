import TableRow from "@/components/TableRow";

interface VolumeVariation {
    id: number;
    volume: number;
    price: number;
    internalQuantity: number;
  }

export default function Products() {
    return (
        <div className="flex flex-col">
            <input type="text" />
            <table>
                <thead>
                    <th>Nome</th>
                    <th>Volume</th>
                    <th>Preço</th>
                    <th>Estoque interno</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    <TableRow data={["Coca-cola", 2000, 8.99, 24, "Refrigerante"]} />
                    <tr>
                        <td>Coca-Cola</td>
                        <td>2L</td>
                        <td>R$8,99</td>
                        <td>24 unidades</td>
                        <td>Refrigerante</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <button>Cadastrar Novo Produto</button>
        </div>
    );
}