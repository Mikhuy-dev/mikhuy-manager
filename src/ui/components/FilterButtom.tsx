interface FilterButtonProps {
    onClick: () => void;
    isActive: boolean; 
  }
  
  export const FilterButton = ({ onClick, isActive }: FilterButtonProps) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded border border-black ${
          isActive
            ? "bg-[#a51833] text-white" 
            : "bg-[#c41c3c] hover:bg-[#a51833] text-white"
        }`}
      >
        Filtros
      </button>
    );
  };
  