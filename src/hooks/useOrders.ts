import { useQuery } from "@tanstack/react-query";
import api from "../services/axios-config";

export interface Order {
  id: number;
  orderNumber: string;
  date: string;
  products: number;
  finalPrice: number;
}

const fetchOrders = async (): Promise<Order[]> => {
  const { data } = await api.get<any[]>("orders");
  const orders = data.map((order: any) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    date: new Date(order.date).toISOString().split("T")[0],
    products: order.products.length,
    finalPrice: order.products.reduce(
      (total: number, p: any) => total + p.unitPrice * p.qty,
      0
    ),
  }));
  return orders;
};

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
