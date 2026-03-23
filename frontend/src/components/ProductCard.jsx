import { useState } from 'react';

function ProductCard({ product, onView, onEdit, onDelete }) {
  const stockClass =
    product.stock === 0
      ? 'bg-danger'
      : product.stock <= 3
      ? 'bg-warning text-dark'
      : 'bg-success';
  const stockLabel = product.stock === 0 ? 'Hết hàng' : `Còn ${product.stock}`;

  return (
    <div className="card h-100 shadow-sm">
      {/* Ảnh — bấm để xem chi tiết */}
      <div
        style={{ height: 180, overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => onView(product.id)}
        title="Bấm để xem chi tiết"
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
          }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <span className="badge bg-secondary">{product.category}</span>
          <span className={`badge ${stockClass}`}>{stockLabel}</span>
        </div>
        <h6 className="card-title mb-1">{product.name}</h6>
        <p className="fw-bold text-primary mb-3">${product.price.toLocaleString()}</p>

        <div className="d-flex gap-2 mt-auto">
          <button
            id={`btn-edit-${product.id}`}
            className="btn btn-sm btn-outline-primary flex-fill"
            onClick={() => onEdit(product)}
          >
            Sửa
          </button>
          <button
            id={`btn-delete-${product.id}`}
            className="btn btn-sm btn-outline-danger flex-fill"
            onClick={() => onDelete(product)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
