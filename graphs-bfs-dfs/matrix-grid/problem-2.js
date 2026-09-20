/**
 * LC: 200 - Number of Islands
 * 
 * Scenario:
 * You're building a geographic mapping tool. Given a grid representing
 * a region of the world where each cell is either water ('0') or land ('1'),
 * count how many distinct landmasses exist in the region. A landmass is a
 * group of land cells connected horizontally or vertically.
 * 
 * Pattern: Grid DFS / Flood Fill (Connected Components on Matrix)
 * 
 * Key Observations:
 * 1. Each '1' encountered during a nested loop traversal marks the root
 *    of a new island.
 * 2. We trigger a DFS from that cell to "sink" (turn into '0') all connected
 *    land cells horizontally and vertically.
 * 3. Modifying the grid in-place saves space by eliminating the need for an
 *    explicit visited set.
 * 
 * @param {string[][]} grid
 * @return {number}
 */
function countLandmasses(grid) {
	if (!grid || grid.length === 0) return 0;

	const ROWS = grid.length;
	const COLS = grid[0].length;
	let count = 0;

	const dfs = (r, c) => {
		// Base cases: out-of-bounds or water cell ('0')
		if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] === "0") {
			return;
		}

		// Sink the current land cell to mark as visited
		grid[r][c] = "0";

		// Explore 4-directionally: down, up, right, left
		dfs(r + 1, c);
		dfs(r - 1, c);
		dfs(r, c + 1);
		dfs(r, c - 1);
	};

	// Scan through each cell in the grid
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			if (grid[r][c] === "1") {
				count++; // Found a new landmass
				dfs(r, c); // Sink all connected land cells
			}
		}
	}

	return count;
}

// Complexity Analysis:
// Time Complexity: O(M * N)
//   - We visit every cell in the M x N grid. Each land cell is visited and converted
//     to '0' once, and neighboring calls immediately return.
// Space Complexity: O(M * N)
//   - Worst case recursion stack depth is O(M * N) if the entire grid is land.
//   - O(1) auxiliary heap space since the input grid is mutated in-place.

// Example Test Cases:
// const map1 = [
//   ["1", "1", "0", "0", "0"],
//   ["1", "1", "0", "0", "0"],
//   ["0", "0", "1", "0", "0"],
//   ["0", "0", "0", "1", "1"]
// ];
// console.log(countLandmasses(map1)); // Output: 3