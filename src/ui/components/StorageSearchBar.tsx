import { BiSearch } from "react-icons/bi";

interface StorageSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
}

export const StorageSearchBar = ({ searchTerm, onSearchChange, onToggleFilters }: StorageSearchBarProps) => {
  return (
    <div className="py-4 flex items-center gap-4 w-full">
      {/* Input de búsqueda con ícono */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <BiSearch className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>
    </div>
  );
};
