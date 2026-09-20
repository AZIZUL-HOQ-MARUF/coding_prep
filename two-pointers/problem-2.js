/**
 * LC: 42 - Trapping Rain Water
 * 
 * Scenario:
 * You're building a water-retention estimator for a city planning tool.
 * Given an array of non-negative integers representing wall heights at
 * each position along a flood barrier, calculate how much water could be
 * trapped between the walls after a heavy rain, assuming water rests on
 * top of and between the walls according to their heights.
 * 
 * Pattern: Converging Two Pointers with Running Maxima
 * 
 * Key Observations:
 * 1. The volume of water trapped above index `i` is determined by:
 *    `water = Math.max(0, Math.min(maxLeft, maxRight) - heights[i])`.
 * 2. Instead of precalculating prefix/suffix maximum arrays in O(N) space,
 *    we use two pointers (`left` and `right`) converging from both ends:
 *    - The side with the smaller current height is the limiting bottleneck.
 *    - If `heights[left] < heights[right]`:
 *        - Update `leftMax = Math.max(leftMax, heights[left])`.
 *        - Trapped water at `left` is `leftMax - heights[left]`.
 *        - Increment `left++`.
 *    - Else (`heights[left] >= heights[right]`):
 *        - Update `rightMax = Math.max(rightMax, heights[right])`.
 *        - Trapped water at `right` is `rightMax - heights[right]`.
 *        - Decrement `right--`.
 * 3. This computes the exact trapped water in a single pass with O(1) auxiliary space.
 * 
 * @param {number[]} heights - Array of non-negative wall heights
 * @return {number} - Total units of water that can be trapped
 */
function trapWater(heights) {
	if (!heights || heights.length < 3) return 0;

	let left = 0;
	let right = heights.length - 1;
	let leftMax = 0;
	let rightMax = 0;
	let totalWater = 0;

	while (left < right) {
		if (heights[left] < heights[right]) {
			// Left side is the bottleneck
			leftMax = Math.max(leftMax, heights[left]);
			totalWater += leftMax - heights[left];
			left++;
		} else {
			// Right side is the bottleneck
			rightMax = Math.max(rightMax, heights[right]);
			totalWater += rightMax - heights[right];
			right--;
		}
	}

	return totalWater;
}

// Complexity Analysis:
// Time Complexity: O(N)
//   - Single pass over the array with two converging pointers.
// Space Complexity: O(1)
//   - Uses only constant extra scalar variables (left, right, leftMax, rightMax, totalWater).

// Example Test Cases:
// console.log(trapWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // Output: 6
// console.log(trapWater([4, 2, 0, 3, 2, 5]));                   // Output: 9
