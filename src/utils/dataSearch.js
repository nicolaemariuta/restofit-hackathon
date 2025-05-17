export function findClosestNDVI(ndviArray, targetLat, targetLon) {
  let closest = null;
  let minDist = Infinity;

  for (let i = 0; i < ndviArray.length; i++) {
    const point = ndviArray[i];
    const dLat = point.lat - targetLat;
    const dLon = point.lon - targetLon;
    const distSq = dLat * dLat + dLon * dLon;

    if (distSq < minDist) {
      minDist = distSq;
      closest = point;
    }
  }

  return closest;
}

export function getNO2ValueFromGrid(grid, lat, lon) {
  const { bbox, rows, cols, data } = grid;
  const [minLon, minLat, maxLon, maxLat] = bbox;

  const latStep = (maxLat - minLat) / rows;
  const lonStep = (maxLon - minLon) / cols;

  const row = Math.floor((lat - minLat) / latStep);
  const col = Math.floor((lon - minLon) / lonStep);

  // Check bounds
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return null;
  }

  return data[row][col];
}