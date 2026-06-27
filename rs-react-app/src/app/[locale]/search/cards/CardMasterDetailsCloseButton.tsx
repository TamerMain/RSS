'use client';

import useClientSearchParams from '@/hooks/useClientSearchParams.tsx';
import { SEARCH_PARAMS } from '@/constants/routes.ts';

function CardMasterDetailsCloseButton() {
  const { setDetailsParams } = useClientSearchParams();
  return (
    <button
      className="absolute  right-0 top-0 p-2 cursor-pointer"
      onClick={() => {
        setDetailsParams({ [SEARCH_PARAMS.DETAILS]: null });
      }}
    >
      X
    </button>
  );
}

export default CardMasterDetailsCloseButton;
