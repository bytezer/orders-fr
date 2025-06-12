import { Link } from "react-router-dom";
import { MyCustomFooter } from "../components/Footer";

export const HomePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Centered content container */}
      <div className="container d-flex flex-column justify-content-center align-items-center text-center flex-grow-1">
        <h1 className="display-4 fw-bold mb-3">Order Management System</h1>
        <p className="lead text-muted mb-4">
          Easily manage your orders and products with this system.
        </p>

        <div className="d-flex justify-content-center gap-4">
          <Link to="/my-orders" className="btn btn-primary btn-lg">
            View My Orders
          </Link>
          <Link to="/products" className="btn btn-outline-secondary btn-lg">
            Manage Products
          </Link>
        </div>
      </div>

      <MyCustomFooter />
    </div>
  );
};
