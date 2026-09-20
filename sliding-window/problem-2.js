/**
 * LC: 3 - Longest Substring Without Repeating Characters
 * 
 * Scenario:
 * You're building a session analytics feature for a live chat platform.
 * Each character in a user's message log represents a distinct action
 * type performed during their session. The team wants to know the
 * longest stretch of the log where the user didn't repeat the same
 * action type before doing something new.
 * 
 * Pattern: Dynamic/Variable-Size Sliding Window with Hash Map (Last Seen Indices)
 * 
 * Key Observations:
 * 1. Maintain a dynamic sliding window `[left, right]` where every element is distinct.
 * 2. Use a Hash Map to record the latest index where each character/action was seen.
 * 3. When encountering `actionLog[right]`:
 *    - If the character was seen previously at `lastSeen` AND `lastSeen >= left`,
 *      it means the duplicate is inside the current window. Shift `left` forward to
 *      `lastSeen + 1` to restore the unique constraint.
 *    - If `lastSeen < left`, the duplicate is outside the active window and can be ignored.
 * 4. Update the map with the current character's index: `map.set(char, right)`.
 * 5. Update maximum window size: `maxLen = Math.max(maxLen, right - left + 1)`.
 * 
 * @param {string} actionLog - String representing user action events
 * @return {number} - Length of the longest contiguous stretch of unique actions
 */
function longestUniqueActionStretch(actionLog) {
	if (!actionLog) return 0;

	let maxLen = 0;
	let left = 0;
	const map = new Map(); // Stores character -> most recent index

	for (let right = 0; right < actionLog.length; right++) {
		const char = actionLog[right];

		if (map.has(char)) {
			const lastSeen = map.get(char);
			// Only shift left forward if the repeated char is within the current window
			if (lastSeen >= left) {
				left = lastSeen + 1;
			}
		}

		map.set(char, right);
		maxLen = Math.max(maxLen, right - left + 1);
	}

	return maxLen;
}

// Complexity Analysis:
// Time Complexity: O(N)
//   - Both left and right pointers traverse the string at most once, and map operations are O(1).
// Space Complexity: O(min(N, Σ))
//   - The Hash Map stores at most Σ unique characters, where Σ is the size of the alphabet/character set (O(1) for fixed ASCII).

// Example Test Cases:
// console.log(longestUniqueActionStretch("abcabcbb")); // Output: 3 ("abc")
// console.log(longestUniqueActionStretch("bbbbb"));    // Output: 1 ("b")
// console.log(longestUniqueActionStretch("pwwkew"));   // Output: 3 ("wke")
// console.log(longestUniqueActionStretch("abccba"));   // Output: 3 ("abc")
