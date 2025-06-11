import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Table, Modal } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  unitPrice: number;
}

interface OrderProduct {
  product: Product;
  qty: number;
}

const availableProducts: Product[] = [
  { id: 1, name: "Milk", unitPrice: 10 },
  { id: 2, name: "Bread", unitPrice: 5 },
  { id: 3, name: "Cheese", unitPrice: 15 },
];

export const OrderForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useState("");
  const [date] = useState(new Date().toISOString().split("T")[0]); // format YYYY-MM-DD
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [qty, setQty] = useState<number>(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (isEdit) {
      // Mock fetching order data
      setOrderNumber("ORD002");
      setProducts([
        { product: availableProducts[0], qty: 2 },
        { product: availableProducts[1], qty: 1 },
      ]);
    }
  }, [id]);

  const handleSaveProduct = () => {
    const product = availableProducts.find((p) => p.id === selectedProductId);
    if (!product) return;

    const newEntry: OrderProduct = { product, qty };

    setProducts((prev) => {
      if (editIndex !== null) {
        const copy = [...prev];
        copy[editIndex] = newEntry;
        return copy;
      }
      return [...prev, newEntry];
    });

    setShowModal(false);
    setEditIndex(null);
    setQty(1);
    setSelectedProductId(1);
  };

  const handleEditProduct = (index: number) => {
    const { product, qty } = products[index];
    setSelectedProductId(product.id);
    setQty(qty);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    setConfirmDeleteIndex(null);
  };

  const totalPrice = products.reduce(
    (sum, p) => sum + p.product.unitPrice * p.qty,
    0
  );

  return (
    <div className="container mt-5">
      <h2>{isEdit ? "Edit Order" : "Add Order"}</h2>
      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Order #</Form.Label>
          <Form.Control
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="text" value={date} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label># Products</Form.Label>
          <Form.Control type="text" value={products.length} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Final Price</Form.Label>
          <Form.Control
            type="text"
            value={`$${totalPrice.toFixed(2)}`}
            disabled
          />
        </Form.Group>

        <Button
          variant="primary"
          className="mb-3"
          onClick={() => setShowModal(true)}
        >
          Add Product
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{p.product.id}</td>
                <td>{p.product.name}</td>
                <td>${p.product.unitPrice.toFixed(2)}</td>
                <td>{p.qty}</td>
                <td>${(p.product.unitPrice * p.qty).toFixed(2)}</td>
                <td>
                  <Button
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditProduct(i)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setConfirmDeleteIndex(i)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="success"
          onClick={() => {
            alert("Order saved!"); // replace with API call later
            navigate("/my-orders");
          }}
        >
          Save Order
        </Button>
      </Form>

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit" : "Add"} Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
              disabled={editIndex !== null}
            >
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.unitPrice.toFixed(2)})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        show={confirmDeleteIndex !== null}
        onHide={() => setConfirmDeleteIndex(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this product from the order?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setConfirmDeleteIndex(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveProduct(confirmDeleteIndex!)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
