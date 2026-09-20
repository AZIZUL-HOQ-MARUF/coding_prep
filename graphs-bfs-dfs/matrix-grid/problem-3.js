/** 
 * LC: 994 - Rotting Oranges
 * 
 * Scenario:
 * You're working on a warehouse inventory system. A warehouse grid
 * tracks the freshness of produce:
 *   0 -> empty cell
 *   1 -> fresh produce
 *   2 -> spoiled/rotten produce
 * 
 * Each minute, fresh produce adjacent (up, down, left, right) to spoiled
 * produce becomes spoiled. Determine how many minutes until all fresh produce
 * is spoiled, or return -1 if it's impossible for all fresh produce to spoil.
 * 
 * Pattern: Multi-Source Breadth-First Search (BFS) / Level-by-Level Traversal
 * 
 * Key Observations:
 * 1. All rotten produce rots adjacent fresh produce SIMULTANEOUSLY at each minute.
 *    This requires a multi-source BFS starting with all initial rotten cells in the queue.
 * 2. Processing the queue level-by-level represents the passage of 1 minute per level.
 * 3. Track the count of fresh produce:
 *    - Decrement whenever a fresh cell turns rotten.
 *    - If fresh reaches 0, return the elapsed minutes.
 *    - If the queue is exhausted and fresh > 0, return -1 (unreachable fresh produce).
 * 
 * @param {number[][]} grid
 * @return {number}
 */
function minutesToSpoil(grid) {
	if (!grid || grid.length === 0) return 0;

	const ROWS = grid.length;
	const COLS = grid[0].length;
	const queue = [];
	let fresh = 0;
	let mins = 0;

	// Step 1: Initialize multi-source BFS queue with all rotten produce & count fresh produce
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			if (grid[r][c] === 1) fresh++;
			else if (grid[r][c] === 2) queue.push([r, c]);
		}
	}

	// 4 cardinal directions (up, down, left, right)
	const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

	// Step 2: Level-by-level BFS traversal (only continue if there is still fresh produce to spoil)
	while (queue.length > 0 && fresh > 0) {
		const levelSize = queue.length;

		for (let i = 0; i < levelSize; i++) {
			const [r, c] = queue.shift();

			for (const [dr, dc] of directions) {
				const nr = r + dr;
				const nc = c + dc;

				// Skip if out-of-bounds or not fresh produce
				if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || grid[nr][nc] !== 1) {
					continue;
				}

				// Rot the fresh produce and enqueue it for the next round of spreading
				grid[nr][nc] = 2;
				queue.push([nr, nc]);
				fresh--;
			}
		}

		mins++; // One minute elapsed for this entire level/wave of rotting
	}

	// Step 3: Return elapsed minutes if all produce was spoiled, else -1
	return fresh === 0 ? mins : -1;
}

// Complexity Analysis:
// Time Complexity: O(M * N)
//   - Grid is scanned once initially to count fresh produce and locate rotten cells: O(M * N).
//   - In BFS, each cell is pushed to the queue at most once and processed in O(1) time: O(M * N).
// Space Complexity: O(M * N)
//   - The BFS queue can hold up to O(M * N) cells in the worst case.

// Example Test Case:
// const warehouse = [
//   [2, 1, 1],
//   [1, 1, 0],
//   [0, 1, 1]
// ];
// console.log(minutesToSpoil(warehouse)); // Output: 4