interface StorageFiltersProps {
  filtroActivo: string;
  setFiltroActivo: (value: string) => void;
  setShowFilters: (value: boolean) => void;
}

export const StorageFilters = ({ filtroActivo, setFiltroActivo, setShowFilters }: StorageFiltersProps) => {
  const handleSelect = (filtro: string) => {
    setFiltroActivo(filtro);
    setShowFilters(false);
  };

  return (
    <div className="absolute right-0 mt-20 w-52 bg-white border border-black rounded-md shadow-md z-50 animate-slide-down">
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Filtro</h2>
        
        {/* Botones */}
        <button
          onClick={() => handleSelect("")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Ningún filtro
        </button>
        <button
          onClick={() => handleSelect("Activado")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "Activado" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Activado
        </button>
        <button
          onClick={() => handleSelect("Desactivado")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "Desactivado" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Desactivado
        </button>
        <button
          onClick={() => handleSelect("PorVencer")}
          className={`block w-full text-left px-2 py-1 rounded ${filtroActivo === "PorVencer" ? "bg-[#c41c3c] text-white" : "hover:bg-gray-100"}`}
        >
          Por vencer (15 días)
        </button>
      </div>
    </div>
  );
};
