/**
 * LC: 56 - Merge Intervals
 * 
 * Scenario:
 * You're building a scheduling assistant for a shared meeting room
 * booking system. Given a set of proposed bookings for the day, some
 * of which overlap with each other, the system needs to produce a
 * cleaned-up list showing the actual blocks of time the room is in use,
 * so the facilities team knows when the room is genuinely free.
 * 
 * Pattern: Sorting + Interval Merging (Greedy Linear Scan)
 * 
 * Key Observations:
 * 1. Sorting intervals by their start times ensures overlapping or adjacent
 *    intervals appear consecutively.
 * 2. Maintain a `result` list of merged intervals:
 *    - If `result` is empty OR the current booking starts after the last merged
 *      booking ends (`result[result.length - 1][1] < booking[0]`), there is no
 *      overlap -> push `booking` as a new interval.
 *    - Otherwise, there is an overlap -> merge with the last interval by updating
 *      its end time: `result[result.length - 1][1] = Math.max(lastEnd, booking[1])`.
 * 
 * @param {number[][]} bookings - Array of [start, end] booking time intervals
 * @return {number[][]} - Cleaned-up array of consolidated, non-overlapping intervals
 */
function consolidateBookings(bookings) {
	if (!bookings || bookings.length === 0) return [];

	// Step 1: Sort bookings in ascending order by start time
	bookings.sort((a, b) => a[0] - b[0]);

	const result = [];

	// Step 2: Single pass to merge overlapping intervals
	for (let i = 0; i < bookings.length; i++) {
		const current = bookings[i];

		// If result is empty or no overlap with previous interval
		if (!result.length || result[result.length - 1][1] < current[0]) {
			result.push(current);
		} else {
			// Overlapping interval: extend the end time of the previous interval
			result[result.length - 1][1] = Math.max(result[result.length - 1][1], current[1]);
		}
	}

	return result;
}

// Complexity Analysis:
// Time Complexity: O(N log N)
//   - Sorting N intervals takes O(N log N).
//   - The single-pass merge loop runs in O(N) time.
// Space Complexity: O(N)
//   - Output array holds up to N merged intervals.
//   - In-place sorting auxiliary space is O(log N) or O(N) depending on the JS engine.

// Example Test Cases:
// const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
// console.log(consolidateBookings(intervals)); // Output: [[1, 6], [8, 10], [15, 18]]