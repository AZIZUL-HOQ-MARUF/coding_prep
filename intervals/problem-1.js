/**
 * You're building a scheduling assistant for a shared meeting room
 * booking system. Given a set of proposed bookings for the day, some
 * of which overlap with each other, the system needs to produce a
 * cleaned-up list showing the actual blocks of time the room is in use,
 * so the facilities team knows when the room is genuinely free.
 * 
 * @param {number[]} bookings
 * @returns {number[]}
 */
function consolidateBookings(bookings) {
	bookings.sort((a, b) => a[0] - b[0]); // to get the starting point at the beginning and the following bookings

	let result = [];
	for (let i = 0; i < bookings.length; i++) {
		if (!result.length || result[result.length - 1][1] <= bookings[i][0]) { // non overlapping booking
			result.push(bookings[i]);
		} else { // overlapping booking, merge the bookings
			result[result.length - 1][1] = Math.max(result[result.length - 1][1], bookings[i][1]);
		}
	}
	return result;
}

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]

// TC: O(N log n) ; because of sorting
// SC: O (N); if result array counts as additional complexity else O(1)