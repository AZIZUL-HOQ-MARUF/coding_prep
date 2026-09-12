/**
 * You're building a water-retention estimator for a city planning tool.
 * Given an array of non-negative integers representing wall heights at
 * each position along a flood barrier, calculate how much water could be
 * trapped between the walls after a heavy rain, assuming water rests on
 * top of and between the walls according to their heights.
 *
 * @param {number[]} heights - array of non-negative wall heights
 * @return {number} - total units of water that can be trapped
 */
function trapWater(heights) {
	/**
	 * non negative ints, no input size given, assume 10^8 for now
	 */

	// left and right wall hold the water in between. 
	// heighest from left and right helps trapping most water.
	// the max distance between left and right walls helps cover the most areas. 

	let leftMax = 0, rightMax = 0, left = 0, right = heights.length - 1, total = 0;

	while (left < right) {
		if (heights[left] < heights[right]) {
			leftMax = Math.max(leftMax, heights[left]);
			total += leftMax - heights[left++];
		} else {
			rightMax = Math.max(rightMax, heights[right]);
			total += rightMax - heights[right--];
		}

	}

	return total;
}

// TC = O(n)
// SC = O(1) 

