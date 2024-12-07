export const getGridCell = (grid, x, y) => {
  if (x < 0 || x > grid[0].length || y < 0 || y > grid.length - 1) return ""
  return grid[y][x]
}

export const forEachCell = (grid, callback) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      callback({ x, y, value: grid[y][x] })
    }
  }
}
