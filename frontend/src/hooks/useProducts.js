import { useState, useEffect, useCallback } from 'react';
import { getProducts, deleteProduct } from '../api/productApi';

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (categoryFilter) params.category = categoryFilter;
      const res = await getProducts(params);
      setProducts(res.data);
    } catch {
      setError('Không thể tải danh sách sản phẩm. Hãy kiểm tra kết nối backend.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      // Xóa khỏi state local ngay lập tức (không cần re-fetch)
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      const msg = err.response?.data?.message || 'Xóa sản phẩm thất bại!';
      setError(msg);
    }
  };

  return {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    fetchProducts,
    handleDelete,
  };
}

export default useProducts;
