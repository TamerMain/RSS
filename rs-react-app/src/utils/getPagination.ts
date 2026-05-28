interface GetPaginationParameters {
  total: number;
  current: number;
}

function getPagination({
  total,
  current,
}: GetPaginationParameters): null | (number | '...')[] {
  if (total <= 1) {
    return null;
  }
  if (current < 1) {
    return null;
  }

  const range: Array<number | '...'> = [1];

  if (total <= 12) {
    for (let i = 2; i <= total; i++) {
      range.push(i);
    }
    return range;
  }

  const left = Math.max(2, current - 2);
  const right = Math.min(total - 1, current + 2);

  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('...');
  if (total > 1) range.push(total);

  return range;
}

export default getPagination;
