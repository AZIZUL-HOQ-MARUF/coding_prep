/**
 * LC: 1091 - Shortest Path in Binary Matrix
 * 
 * Scenario:
 * You're building a navigation system for autonomous drones. Given an N x N
 * binary grid representing terrain, where 0 represents passable clear terrain
 * and 1 represents blocked obstacles, find the length of the shortest path
 * (in number of cells visited) for a drone to travel from the top-left (0, 0)
 * to the bottom-right (N-1, N-1).
 * The drone can move in all 8 directions (horizontal, vertical, and diagonal).
 * 
 * Pattern: 8-Directional Breadth-First Search (BFS) for Shortest Path in Unweighted Grid
 * 
 * Key Observations:
 * 1. BFS guarantees finding the shortest path in an unweighted grid with unit step weights.
 * 2. Check starting cell (0, 0) and destination (N-1, N-1) upfront: if either is blocked (1),
 *    no path exists -> return -1.
 * 3. 8-directional exploration:
 *    [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1].
 * 4. Mark cells as visited immediately upon enqueuing to prevent duplicate queue entries.
 * 
 * @param {number[][]} grid
 * @return {number}
 */
function shortestDronePath(grid) {
	if (!grid || grid.length === 0) return -1;

	const N = grid.length;

	// Edge case: if start or destination cell is blocked, no path is possible
	if (grid[0][0] !== 0 || grid[N - 1][N - 1] !== 0) {
		return -1;
	}

	// Edge case: single-cell grid where start is destination
	if (N === 1) return 1;

	// Queue stores [row, col, pathLength]
	const queue = [[0, 0, 1]];
	const visited = new Set(['0,0']);

	// 8 possible movement directions (cardinal + diagonals)
	const directions = [
		[-1, -1], [-1, 0], [-1, 1],
		[0, -1],           [0, 1],
		[1, -1],  [1, 0],  [1, 1]
	];

	while (queue.length > 0) {
		const [r, c, length] = queue.shift();

		// Check if destination is reached
		if (r === N - 1 && c === N - 1) {
			return length;
		}

		for (const [dr, dc] of directions) {
			const nr = r + dr;
			const nc = c + dc;
			const key = `${nr},${nc}`;

			// Validate bounds, passable terrain (0), and unvisited status
			if (
				nr >= 0 && nr < N &&
				nc >= 0 && nc < N &&
				grid[nr][nc] === 0 &&
				!visited.has(key)
			) {
				visited.add(key);
				queue.push([nr, nc, length + 1]);
			}
		}
	}

	return -1; // No valid path to destination exists
}

// Complexity Analysis:
// Time Complexity: O(N^2)
//   - In an N x N grid, there are N^2 cells. Each cell is enqueued and visited at most once,
//     and checking 8 directions takes O(1) time per cell.
// Space Complexity: O(N^2)
//   - The queue and visited set can store up to O(N^2) elements in the worst case.

// Example Test Cases:
// const grid1 = [
//   [0, 0, 0],
//   [1, 1, 0],
//   [1, 1, 0]
// ];
// console.log(shortestDronePath(grid1)); // Output: 4