/**
 * Problem: Maximum Sum Subarray of Size K
 * 
 * Scenario:
 * You're building a rate-limiting dashboard for an API gateway team.
 * They want to identify the busiest short stretch of traffic of length `k`
 * in a day so they can decide whether to provision additional server capacity.
 * 
 * Pattern: Fixed-Size Sliding Window
 * 
 * Key Observations:
 * 1. The window size is fixed at `k`.
 * 2. As the `right` pointer expands:
 *    - Add `requestCounts[right]` into the running window sum `windowSum`.
 *    - Once the window exceeds size `k` (i.e. `right >= k`), subtract the element
 *      that falls out of the left of the window (`requestCounts[right - k]`).
 * 3. Once we have accumulated at least `k` elements (`right >= k - 1`), update `maxSum`.
 * 
 * @param {number[]} requestCounts - Array of traffic request counts per time unit
 * @param {number} k - Size of the contiguous time window
 * @return {number} - Maximum sum of requests across any window of size k
 */
function findBusiestWindow(requestCounts, k) {
	if (!requestCounts || requestCounts.length < k || k <= 0) return -1;

	let windowSum = 0;
	let maxSum = 0;
	const n = requestCounts.length;

	for (let right = 0; right < n; right++) {
		// Add incoming element to the window sum
		windowSum += requestCounts[right];

		// When window exceeds size k, remove the leftmost outgoing element
		if (right >= k) {
			windowSum -= requestCounts[right - k];
		}

		// When a full window of size k is formed, track the maximum sum
		if (right >= k - 1) {
			maxSum = Math.max(maxSum, windowSum);
		}
	}

	return maxSum;
}

// Complexity Analysis:
// Time Complexity: O(N)
//   - Each element in requestCounts is added and subtracted from windowSum exactly once.
// Space Complexity: O(1)
//   - Only constant extra space is used for variables (windowSum, maxSum, pointers).

// Example Test Case:
// const traffic = [1, 2, 5, 7, 1, 4, 6, 5, 3];
// console.log(findBusiestWindow(traffic, 3)); // Output: 15 (window: [4, 6, 5])