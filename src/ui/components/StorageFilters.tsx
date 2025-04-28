interface StorageFiltersProps {
  filtroActivo: string;
  setFiltroActivo: (value: string) => void;
}

export const StorageFilters = ({ filtroActivo, setFiltroActivo }: StorageFiltersProps) => {
  return (
    <div className="px-6 mb-4">
      <div className="p-4 bg-white border border-black rounded-md shadow-md w-52">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Filtro</h2>

        {/* Botones de Filtros */}
        <button
          onClick={() => setFiltroActivo("")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Ningún filtro
        </button>

        <button
          onClick={() => setFiltroActivo("Activado")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "Activado" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Activado
        </button>

        <button
          onClick={() => setFiltroActivo("Desactivado")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "Desactivado" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Desactivado
        </button>

        <button
          onClick={() => setFiltroActivo("PorVencer")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "PorVencer" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Por vencer (15 días)
        </button>
      </div>
    </div>
  );
};
