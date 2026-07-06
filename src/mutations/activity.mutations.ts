import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivityAction, updateActivityAction, deleteActivityAction } from '@/actions/activity.actions';
import { activityKeys } from '@/queries/activity.queries';
import type { Database } from '@/types/database.types';

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Database['public']['Tables']['activities']['Insert']) => 
      createActivityAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Database['public']['Tables']['activities']['Update'] }) => 
      updateActivityAction(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: activityKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteActivityAction(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: activityKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
    },
  });
}
