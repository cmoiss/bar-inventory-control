import React from "react";

export default function DefaultButton({ size = "md", ...props }) {
  const paddingClasses = {
    sm: "px-2 py-1",       // Para botões pequenos (como os de ação na tabela)
    md: "px-3 py-2",       // Tamanho médio (padrão)
    lg: "px-4 py-3",       // Para botões grandes (como o de cadastrar)
    xl: "px-5 py-4"
  };

  return (
    <span className={`bg-governor-bay rounded-md cursor-pointer ${paddingClasses[size]} hover:bg-blue-bell`}>
      <button className="cursor-pointer" {...props}>
        {props.children}
      </button>
    </span>
  );
}