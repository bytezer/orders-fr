import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyOrders } from "./pages/MyOrders";
import { OrderForm } from "./pages/OrderForm";
import { HomePage } from "./pages/HomePage";
import { ProductManagement } from "./pages/ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="add-order/:id" element={<OrderForm />} />
        <Route path="products" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
