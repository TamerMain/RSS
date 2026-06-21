import { Suspense } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Loader from '@/components/Loader.tsx';
import type { SearchParams } from '@/types/types';

export default async function CardsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <>
      <SearchBar />
      <Suspense fallback={<Loader />}>
        <SearchResults searchParams={params}/>
      </Suspense>
    </>
  );
}
