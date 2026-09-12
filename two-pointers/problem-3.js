/**
 * You're building a settlement-matching feature for an expense-splitting
 * app. Given a list of amounts owed or owed-to between group members
 * (positive numbers mean someone is owed money, negative numbers mean
 * they owe money), find every unique group of exactly three people whose
 * combined balances net out to exactly zero, so those three can settle
 * up directly with each other instead of going through the group ledger.
 * Duplicate groupings (the same three people, regardless of order)
 * should not appear more than once in the result.
 * 
 * @param {number[]} balances - number of ledgers, neg means owe , pos means owed
 * @return {number[[]]} results - triplets containing the values that sum up to 0, [[-1, 2, -1]]
 */
function findSettlementGroups(balances) {
	balances.sort((a, b) => a - b);
	let n = balances.length, results = [];

	for (let start = 0; start < n; start++) {
		if (start > 0 && balances[start] === balances[start - 1]) continue;

		let left = start + 1, right = n - 1;

		while(left < right) {
			let total = balances[start] + balances[left] + balances[right];

			if(total < 0) {
				left++;
			} else if (total > 0) {
				right--;
			} else {
				results.push([balances[start], balances[left++], balances[right]]);

				while (left < right && balances[left] === balances[left-1]) {
					left++;
				}
			}
		}
	}

	return results;

}

// TC = O(n^2) — sort is O(n log n), dominated by outer*inner O(n)*O(n)
// SC = O(1) auxiliary, excluding output


/**
 * REASONING
 * - Brute-force triplet checking is O(n^3) — too slow. Sort first
 *   (O(n log n)) to unlock two pointers: fix one value (`start`), then
 *   scan the rest with `left`/`right` converging inward — O(n) per
 *   fixed value instead of O(n^2), giving O(n^2) total.
 * - `left` starts at start+1, not 0: anything before `start` was
 *   already tried as a `start` in an earlier iteration — reusing it
 *   just re-derives the same triplets in a different order.
 * - Direction logic: sorted order means increasing `left` only raises
 *   the sum, decreasing `right` only lowers it. Sum too low -> left++.
 *   Sum too high -> right--. Sum == 0 -> match.
 * - Duplicate elimination, two places:
 *     1) Outer loop skips a `start` equal to the previous `start` —
 *        already fully explored.
 *     2) After a match, `left` skips forward past repeats of the value
 *        just used, so the same pairing can't recur. `right` needs no
 *        explicit skip — the sum-too-high branch naturally pulls it
 *        inward on the next pass.
 */