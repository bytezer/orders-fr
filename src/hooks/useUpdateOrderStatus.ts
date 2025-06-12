import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/axios-config";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: number;
      status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    }) => {
      return await api.patch(`orders/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
