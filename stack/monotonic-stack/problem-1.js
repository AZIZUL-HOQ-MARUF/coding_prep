/**
 * LC: 496 - Next Greater Element I
 * 
 * Scenario:
 * You're building a stock alert system. Given two lists of stock prices
 * where the second list (nums2) is a subset of the first (nums1), for each price
 * in the second list, find the next higher price that appears in the first list
 * after it. If no higher price exists, return -1 for that position.
 * 
 * Pattern: Monotonic Decreasing Stack + Hash Map Lookup
 * 
 * Key Observations:
 * 1. A monotonic decreasing stack maintains elements in strictly decreasing order.
 * 2. As we iterate through `nums1`:
 *    - If the current element `curr` is greater than `stack[top]`, `curr` is the
 *      Next Greater Element for `stack.pop()`.
 *    - Use a Hash Map to map values in `nums2` to their output indices.
 *    - Update the result array for the popped element if it exists in `nums2`.
 * 3. Only push elements into the stack if they are relevant (i.e. present in `nums2`).
 * 
 * @param {number[]} nums1 - Full list of stock prices / numbers
 * @param {number[]} nums2 - Subset list of stock prices / numbers to query
 * @return {number[]} - Next higher price in nums1 for each element in nums2 (-1 if none)
 */
function nextStockAlert(nums1, nums2) {
	if (!nums1 || !nums2 || nums2.length === 0) return [];

	// Map each value in nums2 to its index in the result array
	const map = new Map(nums2.map((val, i) => [val, i]));
	const res = Array.from({ length: nums2.length }, () => -1);
	const stack = [];

	for (const curr of nums1) {
		// Pop elements from stack while current price is higher (found next greater element)
		while (stack.length > 0 && curr > stack[stack.length - 1]) {
			const val = stack.pop();
			const index = map.get(val);
			res[index] = curr;
		}

		// Only push to stack if this element is one of the target queries in nums2
		if (map.has(curr)) {
			stack.push(curr);
		}
	}

	return res;
}

// Complexity Analysis:
// Time Complexity: O(N + M) where N = nums1.length, M = nums2.length
//   - Mapping nums2: O(M)
//   - Iterating nums1: Each element is pushed and popped from the stack at most once: O(N)
// Space Complexity: O(M)
//   - Hash Map and output array store M elements.
//   - Stack stores at most M elements.

// Example Test Cases:
// console.log(nextStockAlert([4, 1, 2], [1, 2])); // Output: [2, -1]
// console.log(nextStockAlert([1, 3, 4, 2], [4, 1, 2])); // Output: [-1, 3, -1]