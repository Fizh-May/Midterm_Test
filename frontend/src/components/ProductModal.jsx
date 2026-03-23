import { useState, useEffect } from 'react';
import { getProductById } from '../api/productApi';

function ProductModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getProductById(productId);
        setProduct(res.data);
      } catch {
        setError('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [productId]);

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" id="product-detail-modal">
          <div className="modal-header">
            <h5 className="modal-title">Chi tiết sản phẩm</h5>
            <button className="btn-close" id="btn-close-modal" onClick={onClose} />
          </div>

          <div className="modal-body p-0">
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" />
                <p className="mt-2">Đang tải...</p>
              </div>
            )}
            {error && <div className="alert alert-danger m-3">⚠️ {error}</div>}
            {product && (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-100"
                  style={{ height: 220, objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x220?text=No+Image'; }}
                />
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{product.category}</span>
                    <span className={`badge ${product.stock === 0 ? 'bg-danger' : product.stock <= 3 ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {product.stock === 0 ? 'Hết hàng' : `Còn ${product.stock} sản phẩm`}
                    </span>
                  </div>
                  <h5 className="mb-1">{product.name}</h5>
                  <h4 className="text-primary mb-3">${product.price.toLocaleString()}</h4>
                  <table className="table table-bordered table-sm">
                    <tbody>
                      <tr>
                        <td className="text-muted">Danh mục</td>
                        <td><strong>{product.category}</strong></td>
                      </tr>
                      <tr>
                        <td className="text-muted">Tồn kho</td>
                        <td><strong>{product.stock} chiếc</strong></td>
                      </tr>
                      <tr>
                        <td className="text-muted">ID</td>
                        <td><code style={{ fontSize: 11 }}>{product.id}</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
