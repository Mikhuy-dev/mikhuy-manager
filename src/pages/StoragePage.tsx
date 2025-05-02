// Archivo: src/pages/StoragePage.tsx
import { useEffect, useRef, useState } from "react";
import { StorageSearchBar } from "../ui/components/StorageSearchBar";
import { StorageFilters } from "../ui/components/StorageFilters";
import { EditStorageModal } from "../ui/components/EditStorageModal";
import { ModalLayout } from "../ui/layout/ModalLayout";
import { StorageTable } from "../ui/components/StorageTable";
import { useStorage } from "../hooks/UseStorage";
import { ProductEntity } from "../core/auth/entities/Product-entity";

export default function StoragePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<ProductEntity | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductEntity | null>(null);

  const { products, fetchAll, loading, error } = useStorage();
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchAll("SELLER_ID"); // reemplaza con ID real
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pageRef.current && !pageRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const toggleStatus = (id: string) => {
    console.log("Toggling status for ID:", id);
    // Aquí deberías llamar a tu caso de uso o servicio real
  };

  const filteredProducts = products.filter((p) => {
    const matchFilter =
      filter === ""
        ? p.status === "ENABLED"
        : filter === "ENABLED"
        ? p.status === "ENABLED"
        : filter === "DISABLED"
        ? p.status === "DISABLED"
        : false;

    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div ref={pageRef} className="flex flex-col p-6 gap-4">
      <StorageSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {showFilters && (
        <StorageFilters
          filtroActivo={filter}
          setFiltroActivo={(f) => {
            setFilter(f);
            setShowFilters(false);
            setSearchTerm("");
          }}
          setShowFilters={setShowFilters}
        />
      )}
{error && (
  <p className="text-center text-red-500 bg-red-100 px-4 py-2 rounded">
    Error al cargar los productos: {error}
  </p>
)}

      {/* ✅ Mostrar loader si loading */}
      {loading ? (
        <p className="text-center text-gray-600">Cargando productos...</p>
      ) : (
        <StorageTable
          productos={filteredProducts}
          openDropdownId={openDropdownId}
          toggleDropdown={toggleDropdown}
          onEditar={setEditingProduct}
          onVerDetalles={setProductDetails}
          onDesactivar={(id: string) => {
            toggleStatus(id);
            setOpenDropdownId(null);
          }}
          filtroActivo={filter}
        />
      )}

      {productDetails && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300 shadow-lg z-50 animate-slide-down p-6">
          <button
            className="text-gray-500 hover:text-black absolute top-4 right-4 text-2xl"
            onClick={() => setProductDetails(null)}
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="space-y-4">
            <p><span className="font-semibold">Description:</span> {productDetails.description}</p>
            <p><span className="font-semibold">Category:</span> {productDetails.categoryId}</p>
            <p><span className="font-semibold">Price:</span> S/ {parseFloat(productDetails.price).toFixed(2)}</p>
          </div>
        </div>
      )}

      {editingProduct && (
        <ModalLayout
          isOpen={true}
          onClose={() => setEditingProduct(null)}
          title="Edit Product"
        >
          <EditStorageModal
            producto={editingProduct}
            onSave={() => setEditingProduct(null)}
            onClose={() => setEditingProduct(null)}
          />
        </ModalLayout>
      )}
    </div>
  );
}
