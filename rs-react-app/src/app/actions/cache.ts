'use server';
import { revalidateTag } from 'next/cache';
import { type CacheTag } from '@/types/types';

export async function revalidateCacheTag(tag: CacheTag) {
  revalidateTag(tag, 'max');
}
