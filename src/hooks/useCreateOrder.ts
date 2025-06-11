import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/axios-config";

interface CreateOrderPayload {
  orderNumber: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  products: {
    productId: number;
    qty: number;
    unitPrice: number;
  }[];
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newOrder: CreateOrderPayload) => api.post("orders", newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
