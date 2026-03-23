import ProductCard from './ProductCard';

function SkeletonCard() {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-img-top bg-secondary-subtle" style={{ height: 180 }} />
        <div className="card-body">
          <div className="placeholder-glow">
            <span className="placeholder col-4 mb-2 d-block" />
            <span className="placeholder col-8 mb-2 d-block" />
            <span className="placeholder col-5 d-block" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductList({ products, loading, onView, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <div style={{ fontSize: 48 }}>📦</div>
        <h5 className="mt-2">Không có sản phẩm nào</h5>
        <p>Thử thay đổi bộ lọc hoặc thêm sản phẩm mới</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard
            product={product}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
