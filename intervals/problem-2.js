/**
 * You're building a scheduling assistant for a shared meeting room
 * booking system. The room already has a sorted, non-overlapping list
 * of confirmed bookings for the day. A new booking request comes in,
 * and it may overlap with one or more existing bookings. Produce the
 * updated, cleaned-up list of bookings after inserting the new one.
 *
 * @param {number[][]} bookings - sorted, non-overlapping [start, end] pairs
 * @param {number[]} newBooking - the new [start, end] booking to insert
 * @returns {number[][]}
 */
function insertBooking(bookings, newBooking) {

	let arr = [];
	for (const booking of bookings) {
		if (booking[1] < newBooking[0]) {
			arr.push(booking); // keep adding the existing booking as no overlap
		} else if (booking[0] > newBooking[1]) { // check if we passed all valid bookings
			// needs to push newBooking to arr first
			arr.push(newBooking);
			newBooking = booking; // make the current booking to check with the next ones 
			//or push to arr if this is the last booking
		} else { // found genuine overlapping, need to get the minimum and the maximum of the overlappings
			newBooking[0] = Math.min(booking[0], newBooking[0]);
			newBooking[1] = Math.max(booking[1], newBooking[1]);
		}

	}

	arr.push(newBooking);
	return arr;
}

// Input: bookings = [[1,2],[3,5],[6,7],[8,10],[12,16]], newBooking = [4,8]

// Output: bookings = [[1,2],[3,10],[12,16]]


// TC: O(N)
// SC: O(N); if result arr is considered as extra memory otherwise O(1)