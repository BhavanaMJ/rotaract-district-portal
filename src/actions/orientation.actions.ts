"use server";

import { orientationService } from '@/services/orientation.service';
import type { Database } from '@/types/database.types';

export async function createOrientationAction(payload: Database['public']['Tables']['orientations']['Insert']) {
  return await orientationService.create(payload);
}

export async function updateOrientationAction(id: string, payload: Database['public']['Tables']['orientations']['Update']) {
  return await orientationService.update(id, payload);
}

export async function deleteOrientationAction(id: string) {
  return await orientationService.delete(id);
}
