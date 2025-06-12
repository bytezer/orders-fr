import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useOrders } from "../hooks/useOrders";
import { useDeleteOrder } from "../hooks/useDeleteOrder";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";

export const MyOrders = () => {
  // Fetching orders from service
  const { data: orders, isLoading } = useOrders();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Using the delete order hook
  const { mutate: deleteOrder, isPending } = useDeleteOrder();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleDelete = () => {
    if (selectedId !== null) {
      deleteOrder(selectedId, {
        onSuccess: () => {
          setShowModal(false);
          setSelectedId(null);
        },
        onError: (err) => {
          console.error("Error deleting order:", err);
          alert("Error deleting order");
        },
      });
    }
  };

  // Update status
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateOrderStatus();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center fw-bold fs-1"
        style={{ minHeight: "60vh" }}
      >
        Loading...
      </div>
    );
  }
  if (orders?.length === 0) {
    return <div className="conta ">No orders found.</div>;
  }
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
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.products}</td>
              <td>$ {order.finalPrice.toFixed(2)}</td>
              <td>
                {updatingId === order.id ? (
                  "Updating..."
                ) : (
                  <Form.Select
                    size="sm"
                    value={order.status}
                    onChange={(e) => {
                      const status = e.target.value as any;
                      setUpdatingId(order.id);
                      updateStatus(
                        {
                          id: order.id,
                          status,
                        },
                        {
                          onSettled: () => {
                            setUpdatingId(null);
                          },
                        }
                      );
                    }}
                    disabled={isUpdatingStatus || order.status === "COMPLETED"}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </Form.Select>
                )}
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/add-order/${order.id}`)}
                  disabled={order.status === "COMPLETED"}
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
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
