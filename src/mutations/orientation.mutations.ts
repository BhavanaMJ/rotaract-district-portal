import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrientationAction, updateOrientationAction, deleteOrientationAction } from '@/actions/orientation.actions';
import { orientationKeys } from '@/queries/orientation.queries';
import type { Database } from '@/types/database.types';

export function useCreateOrientation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Database['public']['Tables']['orientations']['Insert']) => 
      createOrientationAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orientationKeys.lists() });
    },
  });
}

export function useUpdateOrientation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Database['public']['Tables']['orientations']['Update'] }) => 
      updateOrientationAction(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orientationKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: orientationKeys.lists() });
    },
  });
}

export function useDeleteOrientation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrientationAction(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: orientationKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: orientationKeys.lists() });
    },
  });
}
