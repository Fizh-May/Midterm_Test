function ConfirmModal({ product, onConfirm, onCancel }) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title text-danger">⚠️ Xác nhận xóa</h5>
            <button className="btn-close" onClick={onCancel} />
          </div>
          <div className="modal-body py-2">
            <p className="mb-0">
              Bạn có chắc muốn xóa sản phẩm{' '}
              <strong>"{product.name}"</strong> không?
            </p>
            <small className="text-muted">Hành động này không thể hoàn tác.</small>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button className="btn btn-secondary btn-sm" onClick={onCancel}>
              Hủy
            </button>
            <button
              id="btn-confirm-delete"
              className="btn btn-danger btn-sm"
              onClick={onConfirm}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
