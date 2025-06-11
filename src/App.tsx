import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="my-orders" element={<p>My orders</p>} />
        <Route path="add-order" element={<p>Create a new order</p>} />
        <Route path="edit-order" element={<p>Edit order</p>} />
      </Routes>
    </Router>
  );
}

export default App;
