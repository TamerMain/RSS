import paginationArray from '@/services/paginationArray';

test.each([{
    totalPage: 1,
    currentPage: 1,
    expectedArray: null,
  },
  {
    totalPage: 12,
    currentPage: 1,
    expectedArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    totalPage: 182,
    currentPage: 1,
    expectedArray: [1, 2, 3, '...', 182],
  },
  {
    totalPage: 182,
    currentPage: 4,
    expectedArray: [1, 2, 3, 4, 5, 6, '...', 182],
  },
  {
    totalPage: 182,
    currentPage: 5,
    expectedArray: [1, '...', 3, 4, 5, 6, 7, '...', 182],
  },
  {
    totalPage: 182,
    currentPage: 178,
    expectedArray: [1, '...', 176, 177, 178, 179, 180, '...', 182],
  },
  {
    totalPage: 182,
    currentPage: 179,
    expectedArray: [1, '...', 177, 178, 179, 180, 181, 182],
  },
  {
    totalPage: 182,
    currentPage: 182,
    expectedArray: [1, '...', 180, 181, 182],
  },
])(
  'should return $expectedArray when passing {$totalPage , $currentPage}',
  ({ totalPage, currentPage, expectedArray }) => {
    const result = paginationArray(totalPage, currentPage);
    expect(result).toEqual(expectedArray);
  }
);
