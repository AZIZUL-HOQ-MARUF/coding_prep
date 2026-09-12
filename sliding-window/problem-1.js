/**
 * You're building a rate-limiting dashboard for an API gateway team.
 * They want to identify the busiest short stretch of traffic in a day
 * so they can decide whether to provision additional capacity.
 * @param {number[]} requestCounts
 * @param {number} k
 */
function findBusiestWindow(requestCounts, k) {
	if (requestCounts.length < k) return -1;
	let result = 0, max = 0, right = 0, n = requestCounts.length;

	for(; right < n; right++) {
		result += requestCounts[right];

		if (right + 1 > k) { // need to minus at the left pointer from the result;
			result -= requestCounts[right + 1 - k];
		}

		max = Math.max(max, result);
	}


	return max;
}

// TC - O(N)

// SC O(1)

/**
 * 
 * the idea is to keep adding the values and increase the max until right/ith -
 * value + 1 > K , it means window exceeded..
 * once window exceeded, we keep moving the window forward (add the next value and subtract
 * the just got outside of the  window) 
 * and then compare the max value until we reach to the end.
 *  [1, 2, 5, 7, 1, 4, 6, 5, 3]
 * 
 * output: 15 (4,6,5 are the busiest traffic in a day) 
 * 
 */