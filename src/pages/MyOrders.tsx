import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  products: number;
  finalPrice: number;
}

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: "ORD001",
    date: "2025-06-11",
    products: 3,
    finalPrice: 150.0,
  },
  {
    id: 2,
    orderNumber: "ORD002",
    date: "2025-06-10",
    products: 2,
    finalPrice: 80.0,
  },
];

export const MyOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    setOrders((prev) => prev.filter((order) => order.id !== selectedId));
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Orders</h2>
        <Button onClick={() => navigate("/add-order/new")}>Add Order</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order #</th>
            <th>Date</th>
            <th># Products</th>
            <th>Final Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.products}</td>
              <td>${order.finalPrice.toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/edit-order/${order.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    setSelectedId(order.id);
                    setShowModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
