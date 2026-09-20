/**
 * LC: 167 - Two Sum II - Input Array Is Sorted
 * 
 * Scenario:
 * You're building a duplicate-detection feature for a contact import tool.
 * Given an array of contact IDs that is already sorted in ascending order,
 * and a target sum, determine whether any two distinct contact IDs in the
 * array add up exactly to the target sum. This is used to flag pairs of
 * IDs that might represent a linked or merged record.
 * 
 * Pattern: Converging Two Pointers on Sorted Array
 * 
 * Key Observations:
 * 1. Because the array is sorted, we place `left` at the start (smallest value)
 *    and `right` at the end (largest value).
 * 2. Calculate `currentSum = contactIds[left] + contactIds[right]`:
 *    - `currentSum === target`: Found the pair -> return true.
 *    - `currentSum > target`: Sum is too large; decrement `right--` to decrease total.
 *    - `currentSum < target`: Sum is too small; increment `left++` to increase total.
 * 3. Each step eliminates one value that cannot participate in a valid pair,
 *    achieving a linear O(N) search with O(1) extra space.
 * 
 * @param {number[]} contactIds - Sorted array of contact ID numbers
 * @param {number} target - The target sum to check for
 * @return {boolean} - True if two distinct elements sum to target, false otherwise
 */
function hasPairWithSum(contactIds, target) {
	if (!contactIds || contactIds.length < 2) return false;

	let left = 0;
	let right = contactIds.length - 1;

	while (left < right) {
		const currentSum = contactIds[left] + contactIds[right];

		if (currentSum === target) {
			return true;
		} else if (currentSum > target) {
			right--; // Need a smaller sum -> shift right pointer leftward
		} else {
			left++;  // Need a larger sum -> shift left pointer rightward
		}
	}

	return false;
}

// Complexity Analysis:
// Time Complexity: O(N)
//   - Pointers left and right converge inward, traversing at most N elements total.
// Space Complexity: O(1)
//   - Only two integer pointer variables are stored.

// Example Test Cases:
// const ids = [2, 5, 7, 10];
// console.log(hasPairWithSum(ids, 12)); // Output: true (2 + 10 or 5 + 7)
// console.log(hasPairWithSum(ids, 11)); // Output: false
