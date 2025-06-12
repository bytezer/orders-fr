import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/axios-config";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      await api.delete(`orders/${orderId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Refresca la lista
    },
  });
};
