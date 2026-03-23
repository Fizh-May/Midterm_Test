import ProductsPage from './pages/ProductsPage';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">🛍️ ShopManager</span>
      </nav>
      <ProductsPage />
    </div>
  );
}

export default App;
