const CATEGORIES = ['Laptop', 'Phone', 'Tablet', 'Accessory'];

function SearchBar({ searchTerm, onSearchChange, categoryFilter, onCategoryChange }) {
  return (
    <div className="row g-2 mb-4">
      <div className="col">
        <div className="input-group">
          <span className="input-group-text">🔍</span>
          <input
            id="input-search"
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button className="btn btn-outline-secondary" onClick={() => onSearchChange('')}>✕</button>
          )}
        </div>
      </div>
      <div className="col-auto">
        <select
          id="select-category"
          className="form-select"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
