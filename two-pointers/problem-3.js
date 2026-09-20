/**
 * LC: 15 - 3Sum
 * 
 * Scenario:
 * You're building a settlement-matching feature for an expense-splitting
 * app. Given a list of amounts owed or owed-to between group members
 * (positive numbers mean someone is owed money, negative numbers mean
 * they owe money), find every unique group of exactly three people whose
 * combined balances net out to exactly zero, so those three can settle
 * up directly with each other instead of going through the group ledger.
 * Duplicate groupings (the same three values, regardless of order)
 * should not appear more than once in the result.
 * 
 * Pattern: Sorting + Fixed Pivot with Converging Two Pointers (3Sum)
 * 
 * Key Observations:
 * 1. Brute-force checking all triplets takes O(N^3).
 * 2. Sorting the array (O(N log N)) unlocks the two-pointer technique:
 *    - Iterate `start` from 0 to n - 1 to fix the first element `balances[start]`.
 *    - Use `left = start + 1` and `right = n - 1` to find pairs that sum to `-balances[start]`.
 * 3. Direction logic:
 *    - `total < 0`: Sum too small -> increment `left++`.
 *    - `total > 0`: Sum too large -> decrement `right--`.
 *    - `total === 0`: Found valid triplet -> push `[balances[start], balances[left], balances[right]]`.
 * 4. Duplicate elimination:
 *    - Outer loop: Skip duplicate pivot values (`if (start > 0 && balances[start] === balances[start - 1]) continue`).
 *    - Inner loop: After recording a valid triplet, advance `left` past any duplicate values:
 *      `while (left < right && balances[left] === balances[left - 1]) left++`.
 * 
 * @param {number[]} balances - Array of ledger balances (negative = owe, positive = owed)
 * @return {number[][]} - Array of unique triplets summing to 0
 */
function findSettlementGroups(balances) {
	if (!balances || balances.length < 3) return [];

	// Step 1: Sort in ascending order
	balances.sort((a, b) => a - b);
	const n = balances.length;
	const results = [];

	// Step 2: Iterate and fix the first element of the triplet
	for (let start = 0; start < n; start++) {
		// Optimization: if the smallest fixed value is > 0, three positive numbers cannot sum to 0
		if (balances[start] > 0) break;

		// Skip duplicate pivot values
		if (start > 0 && balances[start] === balances[start - 1]) continue;

		let left = start + 1;
		let right = n - 1;

		while (left < right) {
			const total = balances[start] + balances[left] + balances[right];

			if (total < 0) {
				left++;
			} else if (total > 0) {
				right--;
			} else {
				results.push([balances[start], balances[left], balances[right]]);
				left++;
				right--;

				// Skip duplicate values on the left pointer
				while (left < right && balances[left] === balances[left - 1]) {
					left++;
				}
				// Skip duplicate values on the right pointer
				while (left < right && balances[right] === balances[right + 1]) {
					right--;
				}
			}
		}
	}

	return results;
}

// Complexity Analysis:
// Time Complexity: O(N^2)
//   - Sorting takes O(N log N).
//   - Outer loop runs N times, and inner two-pointer search runs in O(N) per fixed element: O(N^2).
// Space Complexity: O(1) auxiliary space (excluding output array), or O(N) depending on sorting implementation.

// Example Test Cases:
// console.log(findSettlementGroups([-1, 0, 1, 2, -1, -4])); // Output: [[-1, -1, 2], [-1, 0, 1]]
// console.log(findSettlementGroups([0, 1, 1]));             // Output: []
// console.log(findSettlementGroups([0, 0, 0]));             // Output: [[0, 0, 0]]