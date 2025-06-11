import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyOrders } from "./pages/MyOrders";
import { OrderForm } from "./pages/OrderForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="add-order/:id" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
