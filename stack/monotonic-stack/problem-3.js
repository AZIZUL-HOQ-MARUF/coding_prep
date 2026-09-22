/**
 * LC: 84 - Largest Rectangle in Histogram
 * 
 * Scenario:
 * You're designing a billboard placement system for a city skyline.
 * Given the heights of consecutive buildings, find the largest
 * rectangular billboard that can be placed flush against the buildings.
 * The billboard must be rectangular and can span multiple buildings
 * but cannot exceed any building's height within its span.
 * 
 * Pattern: Monotonic Increasing Stack (Storing [startIndex, height] Pairs)
 * 
 * Key Observations:
 * 1. A rectangle's height is constrained by the shortest building within its span.
 * 2. We maintain a stack of pairs `[startIndex, height]` in strictly increasing order of height.
 * 3. When encountering a building `h` shorter than the top of the stack (`stack.top.height > h`):
 *    - The taller building at the top cannot extend any further to the right.
 *    - Pop `[index, height]` and compute the max rectangle area it could form:
 *      `area = height * (i - index)`.
 *    - Because the popped building was taller than `h`, the current shorter building `h`
 *      can extend *backwards* to the left all the way to `index`. We update `start = index`.
 * 4. Push `[start, h]` onto the stack.
 * 5. After scanning all buildings, remaining elements in the stack can extend all the
 *    way to the right end of the skyline (`heights.length`).
 * 
 * @param {number[]} heights - Heights of consecutive buildings
 * @return {number} - Maximum rectangular area that can be formed
 */
function largestBillboard(heights) {
	if (!heights || heights.length === 0) return 0;

	let maxArea = 0;
	const stack = []; // Stores [startIndex, height] pairs

	// Step 1: Process each building across the skyline
	for (const [i, h] of heights.entries()) {
		let start = i;

		// Pop taller buildings that cannot extend further right
		while (stack.length > 0 && stack[stack.length - 1][1] > h) {
			const [index, height] = stack.pop();
			maxArea = Math.max(maxArea, height * (i - index));
			start = index; // Extend current building backwards to the popped building's start
		}

		stack.push([start, h]);
	}

	// Step 2: Flush remaining buildings that extend all the way to the end
	for (const [index, height] of stack) {
		maxArea = Math.max(maxArea, height * (heights.length - index));
	}

	return maxArea;
}

// Complexity Analysis:
// Time Complexity: O(N)
//   - Each building is pushed onto and popped from the stack at most once: O(N).
//   - Final flush pass iterates over at most N elements: O(N).
// Space Complexity: O(N)
//   - The stack stores at most N `[startIndex, height]` pairs.

// Example Test Cases:
// console.log(largestBillboard([2, 1, 5, 6, 2, 3])); // Output: 10 (buildings [5, 6] with height 5, width 2)
// console.log(largestBillboard([2, 4]));             // Output: 4 (building with height 4, width 1, or height 2, width 2)
// console.log(largestBillboard([2, 1, 2]));          // Output: 3 (height 1 spanning width 3)