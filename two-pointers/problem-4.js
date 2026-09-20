/**
 * LC: 189 - Rotate Array
 * 
 * Scenario:
 * You're building a buffer management module for a streaming service.
 * Given an array of data blocks, rotate the array to the right by `k`
 * steps in-place with O(1) extra memory.
 * 
 * Pattern: In-Place Triple Reversal (Two Pointers)
 * 
 * Key Observations:
 * 1. Rotating right by `k` steps means the last `k % n` elements wrap around
 *    to become the first `k % n` elements of the array.
 * 2. Triple Reversal Algorithm:
 *    - Step 1: Reverse the entire array from index 0 to n - 1.
 *              [1, 2, 3, 4, 5, 6, 7] -> [7, 6, 5, 4, 3, 2, 1]
 *    - Step 2: Reverse the first k elements from index 0 to k - 1.
 *              [7, 6, 5, 4, 3, 2, 1] -> [5, 6, 7, 4, 3, 2, 1] (for k = 3)
 *    - Step 3: Reverse the remaining n - k elements from index k to n - 1.
 *              [5, 6, 7, 4, 3, 2, 1] -> [5, 6, 7, 1, 2, 3, 4]
 * 3. Each reversal is executed in-place using two converging pointers swapping elements.
 * 
 * @param {number[]} nums - Array of elements to rotate in-place
 * @param {number} k - Number of steps to rotate right
 * @return {void} - Modifies nums in-place
 */
var rotate = function(nums, k) {
	if (!nums || nums.length <= 1) return;

	const n = nums.length;
	k = k % n; // Handle k >= n
	if (k === 0) return;

	// Helper function: Reverse array subarray between left and right indices
	function reverse(arr, left, right) {
		while (left < right) {
			const temp = arr[left];
			arr[left] = arr[right];
			arr[right] = temp;
			left++;
			right--;
		}
	}

	// Step 1: Reverse the entire array
	reverse(nums, 0, n - 1);

	// Step 2: Reverse the first k elements
	reverse(nums, 0, k - 1);

	// Step 3: Reverse the remaining n - k elements
	reverse(nums, k, n - 1);
};

// Complexity Analysis:
// Time Complexity: O(N)
//   - Each element is visited and swapped a constant number of times (at most 2 passes over array).
// Space Complexity: O(1)
//   - Modifies the array entirely in-place using two pointer indices without auxiliary structures.

// Example Test Cases:
// const arr1 = [1, 2, 3, 4, 5, 6, 7];
// rotate(arr1, 3);
// console.log(arr1); // Output: [5, 6, 7, 1, 2, 3, 4]
//
// const arr2 = [-1, -100, 3, 99];
// rotate(arr2, 2);
// console.log(arr2); // Output: [3, 99, -1, -100]
