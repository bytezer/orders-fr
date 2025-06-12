import { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import api from "../services/axios-config";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Product {
  id: number;
  name: string;
  unitPrice: number;
}

export const ProductManagement = () => {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("products");
      return data;
    },
  });

  const createProduct = useMutation({
    mutationFn: (newProduct: Omit<Product, "id">) =>
      api.post("products", newProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateProduct = useMutation({
    mutationFn: (updated: Product) =>
      api.patch(`products/${updated.id}`, updated),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteProduct = useMutation({
    mutationFn: (id: number) => api.delete(`products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleSave = () => {
    if (!name.trim() || unitPrice <= 0) return alert("Invalid product data.");

    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, name, unitPrice });
    } else {
      createProduct.mutate({ name, unitPrice });
    }

    setShowModal(false);
    setEditingProduct(null);
    setName("");
    setUnitPrice(0);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setUnitPrice(product.unitPrice);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(id);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>

        <Button onClick={() => setShowModal(true)}>Add Product</Button>
      </div>
      <p className="fst-italic">These products are loaded from database</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Unit Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.unitPrice.toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
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
          <Modal.Title>{editingProduct ? "Edit" : "Add"} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              value={unitPrice}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingProduct ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
