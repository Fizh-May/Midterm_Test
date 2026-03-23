import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import ProductModal from '../components/ProductModal';
import ProductForm from '../components/ProductForm';
import ConfirmModal from '../components/ConfirmModal';

function ProductsPage() {
  const {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    fetchProducts,
    handleDelete,
  } = useProducts();

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // product object cần xóa

  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddForm(false);
  };

  // Bấm nút "Xóa" → mở confirm modal
  const handleDeleteRequest = (product) => {
    setDeleteTarget(product);
  };

  // Bấm "Có, xóa" trong modal → gọi API xóa
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await handleDelete(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="container-fluid py-4 px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-0">Quản Lý Sản Phẩm</h4>
          <small className="text-muted">Quản lý kho hàng của bạn</small>
        </div>
        <button
          id="btn-add-product"
          className="btn btn-primary btn-sm"
          onClick={() => { setShowAddForm(true); setEditingProduct(null); }}
        >
          + Thêm Sản Phẩm
        </button>
      </div>

      {/* Search & Filter */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      {/* Error */}
      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center py-2">
          <span>⚠️ {error}</span>
          <button className="btn btn-sm btn-outline-danger" onClick={fetchProducts}>
            Thử lại
          </button>
        </div>
      )}

      {/* Product Grid */}
      <ProductList
        products={products}
        loading={loading}
        onView={(id) => setSelectedProductId(id)}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      {/* Detail Modal */}
      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}

      {/* Add / Edit Form Modal */}
      {(showAddForm || editingProduct) && (
        <ProductForm
          initialData={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={handleCancel}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <ConfirmModal
          product={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default ProductsPage;
