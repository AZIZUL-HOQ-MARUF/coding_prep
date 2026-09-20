/** 
 * LC: 329 - Longest Increasing Path in a Matrix
 * 
 * Scenario:
 * You're building a terrain analysis tool for a hiking app. Given a grid
 * representing elevation at each point on a map, hikers want to know
 * the longest possible hike where each step moves to a strictly higher
 * elevation than the last, moving only up, down, left, or right between
 * adjacent points.
 * 
 * Pattern: DFS with Memoization (Top-Down Dynamic Programming on DAG)
 * 
 * Key Observations:
 * 1. Because paths must strictly increase in elevation, there are NO cycles.
 *    The grid naturally forms a Directed Acyclic Graph (DAG).
 * 2. The longest increasing path starting from cell (r, c) is optimal and
 *    independent of how we reached (r, c). Thus, we can memoize results.
 * 3. State: dp[r][c] = length of the longest increasing path starting at (r, c).
 * 
 * @param {number[][]} elevationGrid
 * @return {number}
 */
function longestClimb(elevationGrid) {
	if (!elevationGrid || elevationGrid.length === 0) return 0;

	const ROWS = elevationGrid.length;
	const COLS = elevationGrid[0].length;
	// Memoization map to cache longest path starting from each cell "r,c"
	const dp = new Map();

	const dfs = (r, c, prevVal) => {
		// Out of bounds check or non-increasing step (must strictly increase)
		if (r < 0 || r >= ROWS || c < 0 || c >= COLS || elevationGrid[r][c] <= prevVal) {
			return 0;
		}

		const key = `${r},${c}`;
		if (dp.has(key)) return dp.get(key);

		const currentVal = elevationGrid[r][c];
		// Explore all 4 orthogonal directions: down, up, right, left
		let res = 1;
		res = Math.max(res, 1 + dfs(r + 1, c, currentVal));
		res = Math.max(res, 1 + dfs(r - 1, c, currentVal));
		res = Math.max(res, 1 + dfs(r, c + 1, currentVal));
		res = Math.max(res, 1 + dfs(r, c - 1, currentVal));

		dp.set(key, res);
		return res;
	};

	let maxLen = 0;
	// Compute the longest increasing path starting from every cell
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			maxLen = Math.max(maxLen, dfs(r, c, -Infinity));
		}
	}

	return maxLen;
}

// Complexity Analysis:
// Time Complexity: O(M * N)
//   - Each cell (r, c) is computed via DFS at most once due to memoization.
//   - Each cell explores 4 neighboring cells in O(1) time.
// Space Complexity: O(M * N)
//   - Memoization cache stores at most M * N entries.
//   - Recursion call stack can go up to O(M * N) in the worst case (e.g., strictly increasing snake path).

// Example Test Case:
// const grid = [
//   [9, 9, 4],
//   [6, 6, 8],
//   [2, 1, 1]
// ];
// console.log(longestClimb(grid)); // Output: 4 (path: [1, 2, 6, 9])