import getPagination from '@/utils/getPagination';

describe('getPagination -- on different inputs', () => {
  test.each([
    {
      total: 1,
      current: 1,
      expectedArray: null,
    },
    {
      total: -1,
      current: 1,
      expectedArray: null,
    },
    {
      total: 12,
      current: 1,
      expectedArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      total: 182,
      current: 1,
      expectedArray: [1, 2, 3, '...', 182],
    },
    {
      total: 182,
      current: 4,
      expectedArray: [1, 2, 3, 4, 5, 6, '...', 182],
    },
    {
      total: 182,
      current: 5,
      expectedArray: [1, '...', 3, 4, 5, 6, 7, '...', 182],
    },
    {
      total: 182,
      current: 178,
      expectedArray: [1, '...', 176, 177, 178, 179, 180, '...', 182],
    },
    {
      total: 182,
      current: 179,
      expectedArray: [1, '...', 177, 178, 179, 180, 181, 182],
    },
    {
      total: 182,
      current: 182,
      expectedArray: [1, '...', 180, 181, 182],
    },
  ])(
    'should return $expectedArray when passing {$totalPage , $currentPage}',
    ({ total, current, expectedArray }) => {
      const result = getPagination({ total, current });
      expect(result).toEqual(expectedArray);
    }
  );
});
