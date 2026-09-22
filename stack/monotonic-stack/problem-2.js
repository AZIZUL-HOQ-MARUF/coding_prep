/**
 * LC: 739 - Daily Temperatures
 * 
 * Scenario:
 * You're building a weather forecasting tool for hikers. Given a list of
 * daily temperatures recorded on a trail, determine for each day how many
 * days a hiker would have to wait until a warmer temperature occurs.
 * If no warmer day exists in the future, return 0 for that day.
 * 
 * Pattern: Monotonic Decreasing Stack (Storing Indices)
 * 
 * Key Observations:
 * 1. We want to find the next strictly greater element to the right for every index.
 * 2. Store indices on a stack such that the temperatures at those indices remain
 *    in monotonic decreasing order: `temperatures[stack[0]] >= temperatures[stack[1]] >= ...`
 * 3. When encountering `temp > temperatures[stack.top]`:
 *    - The current day `i` is the closest warmer day for day `prevIndex = stack.pop()`.
 *    - The days to wait is `i - prevIndex`.
 * 4. Days remaining on the stack at the end have no warmer future day and stay `0`.
 * 
 * @param {number[]} temperatures - Array of daily temperatures
 * @return {number[]} - Array where result[i] is days to wait for a warmer temperature
 */
function daysUntilWarmer(temperatures) {
	if (!temperatures || temperatures.length === 0) return [];

	const res = Array.from({ length: temperatures.length }, () => 0);
	const stack = []; // Stores indices of days

	for (const [i, temp] of temperatures.entries()) {
		// While current temp is warmer than the temperature at the top of stack
		while (stack.length > 0 && temp > temperatures[stack[stack.length - 1]]) {
			const prevIndex = stack.pop();
			res[prevIndex] = i - prevIndex;
		}

		stack.push(i);
	}

	return res;
}

// Complexity Analysis:
// Time Complexity: O(N)
//   - Each day index is pushed onto and popped from the stack at most once across the entire loop.
// Space Complexity: O(N)
//   - Output array holds N values.
//   - Monotonic stack stores at most N indices in the worst case (strictly decreasing temperatures).

// Example Test Cases:
// console.log(daysUntilWarmer([73, 74, 75, 71, 69, 72, 76, 73])); // Output: [1, 1, 4, 2, 1, 1, 0, 0]
// console.log(daysUntilWarmer([30, 40, 50, 60]));                   // Output: [1, 1, 1, 0]
// console.log(daysUntilWarmer([30, 60, 90]));                       // Output: [1, 1, 0]