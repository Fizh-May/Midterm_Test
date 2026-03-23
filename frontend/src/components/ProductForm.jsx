import { useState } from 'react';
import { createProduct, updateProduct } from '../api/productApi';

const EMPTY_FORM = { name: '', category: '', price: '', image: '', stock: '' };
const CATEGORIES = ['Laptop', 'Phone', 'Tablet', 'Accessory'];

function ProductForm({ initialData, onSuccess, onCancel }) {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState(
    isEdit
      ? { name: initialData.name, category: initialData.category, price: initialData.price, image: initialData.image, stock: initialData.stock }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Tên sản phẩm không được để trống';
    if (!form.category) errs.category = 'Vui lòng chọn danh mục';
    if (!form.image.trim()) errs.image = 'URL ảnh không được để trống';
    if (form.price === '' || isNaN(Number(form.price))) errs.price = 'Giá phải là số';
    else if (Number(form.price) <= 0) errs.price = 'Giá phải lớn hơn 0';
    if (form.stock === '' || isNaN(Number(form.stock))) errs.stock = 'Tồn kho phải là số';
    else if (Number(form.stock) < 0) errs.stock = 'Tồn kho không được âm';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    try {
      setSubmitting(true);
      setServerError(null);
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (isEdit) {
        await updateProduct(initialData.id, payload);
      } else {
        await createProduct(payload);
      }
      onSuccess();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
            </h5>
            <button className="btn-close" id="btn-close-form" onClick={onCancel} />
          </div>

          <form onSubmit={handleSubmit} id="product-form">
            <div className="modal-body">
              {serverError && (
                <div className="alert alert-danger py-2">⚠️ {serverError}</div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold">Tên sản phẩm *</label>
                <input
                  id="input-name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="VD: MacBook Pro M3"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="row g-2 mb-3">
                <div className="col">
                  <label className="form-label fw-semibold">Danh mục *</label>
                  <select
                    id="select-form-category"
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
                <div className="col">
                  <label className="form-label fw-semibold">Giá ($) *</label>
                  <input
                    id="input-price"
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="VD: 1299"
                    min="1"
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">URL Ảnh *</label>
                <input
                  id="input-image"
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              </div>

              <div className="mb-1">
                <label className="form-label fw-semibold">Tồn kho *</label>
                <input
                  id="input-stock"
                  className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="VD: 10"
                  min="0"
                />
                {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>Hủy</button>
              <button id="btn-submit-form" type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
                {submitting
                  ? <><span className="spinner-border spinner-border-sm me-1" />Đang lưu...</>
                  : (isEdit ? 'Cập nhật' : 'Thêm sản phẩm')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
