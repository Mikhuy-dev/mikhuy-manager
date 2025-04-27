interface StorageSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
}

export const StorageSearchBar = ({ searchTerm, onSearchChange, onToggleFilters }: StorageSearchBarProps) => {
  return (
    <div className="px-6 py-4 flex items-center gap-4">
      {/* Input de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-1 p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {/* Botón de Filtros */}
      <button
        onClick={onToggleFilters}
        className="bg-[#c41c3c] hover:bg-[#a51833] text-white px-4 py-2 rounded-md border border-black"
      >
        Filtros
      </button>
    </div>
  );
};
