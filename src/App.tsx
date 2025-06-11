import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyOrders } from "./pages/MyOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="add-order" element={<p>Create a new order</p>} />
        <Route path="edit-order" element={<p>Edit order</p>} />
      </Routes>
    </Router>
  );
}

export default App;
