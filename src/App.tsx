import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyOrders } from "./pages/MyOrders";
import { OrderForm } from "./pages/OrderForm";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="add-order/:id" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
