export function getHouseAppreciation(row, year) {
  let yearIdx = row.length - 12 * year - 1;
  if (row[yearIdx] === '') {
    let leftOffset = 1;
    let rightOffset = 1;
    let left = row[yearIdx - leftOffset];
    let right = row[yearIdx + rightOffset];
    if (left === '') {
      while (left === '') {
        leftOffset++;
        left = row[yearIdx - leftOffset];
      }
    }
    if (right === '') {
      while (right === '') {
        rightOffset++;
        right = row[yearIdx + rightOffset];
      }
    }
    if ((leftOffset > 6 || rightOffset > 6) && row[row.length - 1] !== '') {
      return 'Not Available';
    }
    let yearVal = ((right - left) / (leftOffset + rightOffset)) * leftOffset + left;
    return ((100 * (row[row.length - 1] - yearVal)) / year / yearVal).toFixed(2);
  }
  return ((100 * (row[row.length - 1] - row[yearIdx])) / year / row[yearIdx]).toFixed(2);
}
