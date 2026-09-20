/**
 * LC: 57 - Insert Interval
 * 
 * Scenario:
 * You're building a scheduling assistant for a shared meeting room
 * booking system. The room already has a sorted, non-overlapping list
 * of confirmed bookings for the day. A new booking request comes in,
 * and it may overlap with one or more existing bookings. Produce the
 * updated, cleaned-up list of bookings after inserting the new one.
 * 
 * Pattern: 3-Phase Linear Scan on Pre-Sorted Disjoint Intervals
 * 
 * Key Observations:
 * 1. The input `bookings` are already sorted by start time and mutually non-overlapping.
 * 2. We can iterate through the list and categorize each existing interval into 3 cases:
 *    - Case 1 (Completely before `newBooking`): `booking[1] < newBooking[0]`
 *      -> Push directly to the result.
 *    - Case 2 (Completely after `newBooking`): `booking[0] > newBooking[1]`
 *      -> Push `newBooking` first (if not already placed), then push `booking`.
 *    - Case 3 (Overlapping with `newBooking`):
 *      -> Merge into `newBooking` by expanding boundaries:
 *         `newBooking[0] = Math.min(newBooking[0], booking[0])`
 *         `newBooking[1] = Math.max(newBooking[1], booking[1])`
 * 3. After the loop, append `newBooking` if it was not already pushed.
 * 
 * @param {number[][]} bookings - Sorted, non-overlapping [start, end] pairs
 * @param {number[]} newBooking - The new [start, end] booking interval to insert
 * @return {number[][]} - Updated sorted, non-overlapping intervals
 */
function insertBooking(bookings, newBooking) {
	const result = [];
	let inserted = false;

	for (const booking of bookings) {
		if (booking[1] < newBooking[0]) {
			// Phase 1: Current booking comes strictly before newBooking
			result.push(booking);
		} else if (booking[0] > newBooking[1]) {
			// Phase 3: Current booking comes strictly after newBooking
			if (!inserted) {
				result.push(newBooking);
				inserted = true;
			}
			result.push(booking);
		} else {
			// Phase 2: Overlap detected — expand newBooking to subsume the overlap
			newBooking[0] = Math.min(booking[0], newBooking[0]);
			newBooking[1] = Math.max(booking[1], newBooking[1]);
		}
	}

	// If newBooking was not inserted yet (e.g. at the end or empty bookings list)
	if (!inserted) {
		result.push(newBooking);
	}

	return result;
}

// Complexity Analysis:
// Time Complexity: O(N)
//   - Single linear scan through the N bookings list without requiring re-sorting.
// Space Complexity: O(N)
//   - O(N) space for constructing the output array.
//   - O(1) auxiliary space beyond the output array.

// Example Test Cases:
// const bookings = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]];
// const newBooking = [4, 8];
// console.log(insertBooking(bookings, newBooking)); // Output: [[1, 2], [3, 10], [12, 16]]