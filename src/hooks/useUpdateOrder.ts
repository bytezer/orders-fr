import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/axios-config";

interface UpdateOrderPayload {
  id: number;
  orderNumber: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  products: {
    productId: number;
    qty: number;
    unitPrice: number;
  }[];
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: UpdateOrderPayload) => {
      console.log("Updating order:", order);
      return api.patch(`orders/${order.id}`, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Refresh the list of orders
    },
  });
};
