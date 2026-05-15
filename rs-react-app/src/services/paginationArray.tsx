function paginationArray(total: number, current: number) {
  if (total === 1) {
    return null;
  }

  let range: Array<number | '...'> = [1];

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

export default paginationArray;
