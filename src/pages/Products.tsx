import React from "react";
import ProductsTable from "../components/ProductsTable";
import DefaultButton from "../components/DefaultButton";

export default function Products() {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-7">
                <input type="text" placeholder="Pesquisar produtos..." className="bg-shadow-gray h-12 px-4 py-3 rounded-lg" />
                <div className="flex flex-col w-full gap-8">
                    <ProductsTable />
                    <div className="self-end">
                        <DefaultButton size="xl">
                            <span className="flex gap-2">
                                    <i className="bi bi-plus"></i>
                                    Cadastrar Novo Produto
                            </span>
                        </DefaultButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
