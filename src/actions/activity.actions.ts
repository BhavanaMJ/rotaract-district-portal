"use server";

import { activityService } from '@/services/activity.service';
import type { Database } from '@/types/database.types';

export async function createActivityAction(payload: Database['public']['Tables']['activities']['Insert']) {
  return await activityService.create(payload);
}

export async function updateActivityAction(id: string, payload: Database['public']['Tables']['activities']['Update']) {
  return await activityService.update(id, payload);
}

export async function deleteActivityAction(id: string) {
  return await activityService.delete(id);
}
