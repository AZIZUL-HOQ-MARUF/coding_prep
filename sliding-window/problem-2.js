/**
 * You're building a session analytics feature for a live chat platform.
 * Each character in a user's message log represents a distinct action
 * type performed during their session. The team wants to know the
 * longest stretch of the log where the user didn't repeat the same
 * action type before doing something new.
 * @param {string} actionLog
 * @return {number}
 */
function longestUniqueActionStretch(actionLog) {
	let result = 0, left = 0, right = 0, map = new Map();

	for (; right < actionLog.length; right++) {
		if (!map.has(actionLog[right])) {
			map.set(actionLog[right], right);
		} else {
			let lastSeen = map.get(actionLog[right]);
			if (lastSeen >= left) left = lastSeen + 1;
			map.set(actionLog[right], right);
		}

		result = Math.max(result, (right - left) + 1);
	}

	return result;
}


// input - abccba

// TC O(N)
// SC O(1)


/**
 * REASONING
 * - Variable-size window: expand `right`, shrink `left` only on repeats -
 *   no full rescans, avoiding O(n^2).
 * - Hash map stores each char's last-seen index for O(1) repeat detection.
 * - On a repeat, jump `left` to lastSeen + 1 only if lastSeen is still
 *   inside the window (lastSeen >= left) - otherwise it's stale and
 *   `left` must not move (moving it would push left backward, e.g. on
 *   "abccba" the second 'b' was last seen behind the current left).
 * - Map always updates to the newest index; max window size checked
 *   every step since the answer can end anywhere.
 */
